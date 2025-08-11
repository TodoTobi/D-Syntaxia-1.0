# SINTAXIA

Sistema web gratuito para:
1) Detectar objetos en imágenes (HF Inference API, DETR/YOLO)
2) Explicar con IA (Groq/HF)
3) Visualizar 3D interactivo (Three.js)

## Requisitos
- Node 18+
- Llaves opcionales: HF (detección), Groq (texto), Sketchfab (modelos)

## Desarrollo local
```bash
# 1) Backend
cd backend
cp ../.env.example .env  # o crea tus variables
npm i
npm run dev

# 2) Frontend
cd ../frontend
npm i
# configura VITE_API_URL si backend no está en localhost:8080
npm run dev
```

## Despliegue gratuito
- **Frontend**: Vercel (importar carpeta `frontend/`).
- **Backend**: Render.com o Railway.app (importar carpeta `backend/`).
- Configura variables de entorno en cada plataforma.

## Raspberry Pi (etapa final)
- Toma una foto con la cámara y envía por HTTP al backend (`/api/identify`) como base64 o multipart.

## Seguridad
- Límite 5MB por imagen, sanitizar inputs, CORS habilitado por dominio.

## Roadmap
- Carga real de .glb/.gltf (GLTFLoader)
- Simulaciones interactivas por tipo de objeto
- Historial de consultas (SQLite/Supabase)

---

## Despliegue paso a paso

### 1) Subir a GitHub
```bash
cd SINTAXIA
./bootstrap_repo.sh SINTAXIA your-github-user main
# Si no tenés gh CLI, seguí lo que imprime para hacer 'git remote add' y 'git push'
```

### 2) Frontend en Vercel
1. Importá el repo en Vercel.
2. En **Root Directory** seleccioná `frontend/`.
3. Variables de entorno (Project Settings → Environment Variables):
   - `VITE_API_URL` = URL pública del backend (ej: `https://sintaxia-backend.onrender.com`).
4. Deploy.

### 3) Backend en Render (alternativa Railway)
**Render:**
- Conectar el repo, seleccionar **rootDir** `backend/` (si usás `render.yaml`, Render lo detecta).
- Runtime: Node 18/20.
- Build Command: `npm install`
- Start Command: `node server.js`
- Vars: `PORT`=10000, `CORS_ORIGIN`=`https://<tu-app>.vercel.app`, `HF_API_TOKEN`, `GROQ_API_KEY`, `SKETCHFAB_TOKEN`.

**Railway:**
- Crear proyecto → Deploy from GitHub → seleccionar repo.
- Service root: `backend/`. Nixpacks detecta Node y usará `Procfile`.
- Vars de entorno iguales a Render.

### 4) Probar
- Frontend: visita la URL de Vercel.
- Sube una imagen → debería mostrar bounding box, explicación IA y link a modelo 3D.

> Nota: para modelos 3D reales, integrá `GLTFLoader` y descarga segura desde Sketchfab.
