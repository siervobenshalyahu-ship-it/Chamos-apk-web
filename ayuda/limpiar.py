"""Retira de ayuda/casos.json los casos cuyo periodo ya terminó y borra sus imágenes y videos."""
import json, os, datetime

AQUI = os.path.dirname(os.path.abspath(__file__))
RUTA = os.path.join(AQUI, "casos.json")
hoy = (datetime.datetime.utcnow() - datetime.timedelta(hours=4)).strftime("%Y-%m-%d")  # hora de Venezuela

with open(RUTA, encoding="utf-8") as f:
    datos = json.load(f)

def archivos(caso):
    m = caso.get("media") or []
    if isinstance(m, str):
        m = [m]
    return [x for x in m if isinstance(x, str) and x.startswith("ayuda/media/") and ".." not in x]

vigentes, vencidos = [], []
for c in datos.get("casos", []):
    (vencidos if c.get("hasta") and c["hasta"] < hoy else vigentes).append(c)

en_uso = {a for c in vigentes for a in archivos(c)}
for c in vencidos:
    for a in archivos(c):
        if a not in en_uso:
            ruta = os.path.join(os.path.dirname(AQUI), a)
            if os.path.isfile(ruta):
                os.remove(ruta)
                print("Borrado:", a)

if vencidos:
    datos["casos"] = vigentes
    with open(RUTA, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
        f.write("\n")
print("Casos vigentes:", len(vigentes), "· retirados:", len(vencidos))
