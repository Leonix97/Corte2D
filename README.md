# Corte PAD · Recorrido GPS

App web para recorrer en campo el área de **CORTE PAD 2D F2 (Retiro de Mineral)**.
Muestra tu posición GPS sobre el mapa con la **profundidad de corte** en ese punto, y permite tocar cualquier punto del mapa para ver su cota de proyecto, cota de terreno y altura de corte.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (ej. `corte-pad`) y sube **todo el contenido de esta carpeta** (o haz `git push` de este repo).
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`** → Save.
3. Abre `https://TU-USUARIO.github.io/corte-pad/` en el celular.
4. En Chrome Android: menú ⋮ → **Agregar a pantalla principal** para usarla como app.

> El GPS del navegador solo funciona con **https**, por eso hay que abrirla desde GitHub Pages (no como archivo local).

## Uso en campo
- **◎ GPS**: activa la ubicación. El panel inferior muestra Este/Norte (UTM WGS84 17S), profundidad de corte, cota de proyecto, cota de terreno y si estás dentro o fuera del área (con la distancia al borde).
  - Si mueves el mapa se pausa el seguimiento; toca ◎ otra vez para volver a tu posición, y una vez más para apagar el GPS.
- **Tocar el mapa**: muestra la lectura de ese punto y permite **Guardar punto**.
- **Guardar** (panel): guarda la posición GPS actual.
- **⚙ Ajustes**: lista de puntos y exportar a **CSV** (Excel), ir a una coordenada E/N, zona UTM, corrección de la cota GPS, opacidad, y cargar otro DXF.
- Mientras el GPS está activo la pantalla no se apaga.
- **Sin señal**: después de abrirla una vez con internet, la app y el DXF quedan guardados en el teléfono. El fondo satelital solo está disponible en las zonas que ya se vieron con internet.

## Cómo se calcula
- **Superficie de proyecto**: triangulación (TIN) de todas las polilíneas 3D del DXF —borde exterior cerrado + pies de talud—, recortada al borde cerrado.
- **Terreno**: si no se carga una topografía, se estima interpolando las cotas del borde exterior (línea donde el corte toca el terreno) a través del área. Es confiable cerca del borde y aproximada al centro.
  Para un valor exacto, carga en ⚙ un **DXF de terreno** (polilíneas 3D, curvas de nivel con elevación, puntos o 3DFACE).
- **Profundidad de corte** = cota terreno − cota proyecto.
- **Cota GPS (Δ)** = altura del celular + corrección − cota de proyecto. Es solo referencial: el GPS de un celular tiene un error vertical típico de ±3 a ±10 m.

## Actualizar la superficie
- **Para todos**: reemplaza `corte.dxf` en el repo por el nuevo DXF (mismo nombre) y sube el cambio.
- **Solo en tu celular**: ⚙ → *Cargar DXF de proyecto*.

El DXF debe tener al menos una **polilínea cerrada** (el borde del área) y estar en coordenadas UTM.

## Archivos (todos en la raíz, sin subcarpetas)
```
index.html                 app completa
corte.dxf                  superficie de corte (DXF original)
leaflet.js, leaflet.css    Leaflet 1.9.4 (BSD-2)
delaunator.min.js          Delaunator 5 (ISC)
sw.js, manifest.json, icon-192.png, icon-512.png   uso sin señal e instalación
```
