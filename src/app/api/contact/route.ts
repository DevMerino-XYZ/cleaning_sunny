import { Resend } from "resend"
import { z } from "zod"
import { NextResponse } from "next/server"

/* =========================
   CONFIG
========================= */

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minuto
const RATE_LIMIT_MAX = 3 // máximo 3 envíos por minuto por IP

const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

/* =========================
   VALIDATION SCHEMA
========================= */

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().optional(), // honeypot (no debe llenarse)
})

/* =========================
   UTILITIES
========================= */

function sanitize(input: string) {
  return input.replace(/[<>]/g, "")
}

function rateLimit(ip: string) {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

/* =========================
   HANDLER
========================= */

export async function POST(req: Request) {
  try {
    // 1️⃣ API KEY check (safe for build)
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY missing")
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    // 2️⃣ Get IP
    const forwarded = req.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0] || "unknown"

    // 3️⃣ Rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      )
    }

    // 4️⃣ Parse body
    const body = await req.json()

    // 5️⃣ Validate
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 }
      )
    }

    const { name, email, phone, message, company } = parsed.data

    // 6️⃣ Honeypot check
    if (company && company.length > 0) {
      return NextResponse.json(
        { success: true }, // fake success to bots
        { status: 200 }
      )
    }

    // 7️⃣ Sanitize
    const cleanName = sanitize(name)
    const cleanMessage = sanitize(message)
    const cleanPhone = phone ? sanitize(phone) : "Not provided"

    // 8️⃣ Send Email
    await resend.emails.send({
      from: "Sunny's Website <onboarding@resend.dev>",
      to: "sunnyscleaningservices6@gmail.com",
      subject: `New Estimate Request from ${cleanName}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${cleanPhone}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${cleanMessage}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("❌ Contact API error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}