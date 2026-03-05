import { Resend } from "resend"
import { z } from "zod"
import { NextResponse } from "next/server"

const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 3
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7).max(20).optional(),
  propertyType: z.enum(["residential", "commercial"]).default("residential"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  frequency: z.enum(["one-time", "weekly", "bi-weekly", "monthly"]).optional(),
  address: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  hasPets: z.boolean().optional().default(false),
  message: z.string().max(2000).optional(),
  company: z.string().optional(),
})

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

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY missing")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const forwarded = req.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0] || "unknown"
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 })
    }

    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs.", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, propertyType, services, frequency, address, preferredDate, preferredTime, hasPets, message, company } = parsed.data

    // Honeypot
    if (company && company.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Construir HTML del correo
    const servicesList = services.map(s => `• ${s}`).join('<br>')
    const petText = hasPets ? "Yes" : "No"
    const frequencyText = frequency ? frequency.replace('-', ' ') : "Not specified"
    const dateText = preferredDate ? new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Not specified"
    const timeText = preferredTime || "Not specified"

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">New Estimate Request</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ? sanitize(phone) : "Not provided"}</p>
        <p><strong>Property Type:</strong> ${propertyType === "residential" ? "Residential" : "Commercial"}</p>
        <p><strong>Services Requested:</strong></p>
        <div style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${servicesList}</div>
        <p><strong>Frequency:</strong> ${frequencyText}</p>
        <p><strong>Address:</strong> ${address ? sanitize(address) : "Not provided"}</p>
        <p><strong>Preferred Date:</strong> ${dateText}</p>
        <p><strong>Preferred Time:</strong> ${timeText}</p>
        <p><strong>Has Pets:</strong> ${petText}</p>
        ${message ? `<p><strong>Additional Notes:</strong><br>${sanitize(message)}</p>` : ""}
        <hr style="margin: 20px 0;" />
        <p style="color: #666; font-size: 0.9em;">This request was sent from the website contact form.</p>
      </div>
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM || "Sunny's Cleaning <onboarding@resend.dev>", // Cambiar cuando tengas dominio
      to: ["sunnyscleaningservices6@gmail.com"],
      subject: `New Estimate Request from ${sanitize(name)}`,
      replyTo: email,
      html,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("❌ Contact API error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}