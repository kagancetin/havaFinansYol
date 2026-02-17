import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import morgan from "morgan"
import helmet from "helmet"
import cron from "node-cron"

import indexRouter from "./router/index.js"
import { havaDataForCity } from "./helper/hava.js"
import { getFinansData } from "./helper/finans.js"

// ES Modules için __dirname alternatifi
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// --- Veri Yönetimi (Cache) ---
app.locals.havaData = null
app.locals.finansData = null

const refreshData = async () => {
    try {
        const [hava, finans] = await Promise.all([havaDataForCity("Istanbul"), getFinansData()])

        if (hava) app.locals.havaData = hava
        if (finans) app.locals.finansData = finans
        console.log(`✅ [CRON] Veriler güncellendi: ${new Date().toLocaleTimeString()}`)
    } catch (err) {
        console.error("❌ [CRON] Hata:", err.message)
    }
}

// 1. Finans Verisi: Her 5 dakikada bir çalıştır
cron.schedule("*/5 * * * *", () => {
    console.log("--- Finans güncelleniyor ---")
    getFinansData().then(data => {
        if (data) app.locals.finansData = data
    })
})

// 2. Hava Durumu: Her 30 dakikada bir çalıştır
cron.schedule("*/30 * * * *", () => {
    console.log("--- Hava durumu güncelleniyor ---")
    havaDataForCity("Istanbul").then(data => {
        if (data) app.locals.havaData = data
    })
})

refreshData()

app.use(
    helmet({
        contentSecurityPolicy: false
    })
)
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "view"))
app.set("view engine", "ejs")
app.disable("etag")

app.use("/", indexRouter)

app.use((req, res, next) => {
    const err = new Error("Sayfa Bulunamadı")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const isDev = app.get("env") === "development"
    const status = err.status || 500

    res.status(status).json({
        error: {
            message: isDev ? err.message : "Sistem hatası oluştu"
        }
    })
    console.error(err)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda hazır! (Mod: ${app.get("env")})`)
})
