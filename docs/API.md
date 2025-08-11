# API SINTAXIA (MVP)

Base URL: http://localhost:8080

## POST /api/identify
Body: { imageBase64: string }
Res: { ok, model, detections: [...], bestObject, bestBox }

## POST /api/ai
Body: { objectName: string, context?: any }
Res: { ok, text }

## GET /api/model3d?q=QUERY
Res: { ok, model: { name, uid, thumbnails[], viewerUrl } }
