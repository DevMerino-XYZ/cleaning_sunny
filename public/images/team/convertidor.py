import os
from PIL import Image

def convertir():
    # El punto '.' significa "esta misma carpeta"
    ruta = os.path.dirname(__file__) if __file__ else "."
    archivos = [f for f in os.listdir(ruta) if f.lower().endswith(('.jpg', '.jpeg'))]
    
    if not archivos:
        print("🔎 No encontré archivos JPG en esta carpeta.")
        print(f"Carpeta actual: {os.path.abspath(ruta)}")
        return

    print(f"🚀 Encontrados {len(archivos)} archivos. Iniciando...")

    for archivo in archivos:
        ruta_entrada = os.path.join(ruta, archivo)
        nombre_base = os.path.splitext(archivo)[0]
        ruta_salida = os.path.join(ruta, f"{nombre_base}.webp")

        try:
            with Image.open(ruta_entrada) as img:
                img.save(ruta_salida, "webp", quality=75)
                print(f"✅ Convertido: {archivo}")
        except Exception as e:
            print(f"❌ Error en {archivo}: {e}")

if __name__ == "__main__":
    convertir()