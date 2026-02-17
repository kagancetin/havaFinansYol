import axios from "axios"
import * as cheerio from "cheerio"
import "dotenv/config"

const formatObject = (name, priceStr, changeStr, symbol) => {
    // Çift gelme sorununa karşı sadece ilk parçayı al
    const cleanChange = changeStr ? changeStr.trim().split(/\s+/)[0] : "%0,00"
    // Sayı formatını bozma, sadece sembolleri temizle
    const cleanPrice = priceStr ? priceStr.replace(/[^\d.,]/g, "").trim() : "0,00"

    return {
        name: name,
        selling: `${cleanPrice} ${symbol}`,
        change: cleanChange,
        status_bg_color: cleanChange.includes("-") ? "red" : "green",
        status_symbol: cleanChange.includes("-") ? "&#9660;" : "&#9650;"
    }
}

export const getFinansData = async () => {
    try {
        // Cache engellemek için timestamp ekliyoruz
        const freshUrl = `https://altin.doviz.com/?_t=${Date.now()}`
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Cache-Control": "no-cache"
        }

        const { data: html } = await axios.get(freshUrl, { headers })
        const $ = cheerio.load(html)

        // --- 1. NAVBARDAN (Header) DÖVİZ, ENDEKS VE BITCOIN ---
        const marketDataList = []
        const marketHedefleri = [
            { code: "USD", customName: "Dolar", sym: "TL" },
            { code: "EUR", customName: "Euro", sym: "TL" },
            { code: "GBP", customName: "Sterlin", sym: "TL" },
            { code: "XU100", customName: "BIST 100", sym: "" },
            { code: "d-bitcoin", customName: "Bitcoin", sym: "$" },
            { code: "gumus", customName: "Gümüş", sym: "TL" }
        ]

        marketHedefleri.forEach(item => {
            // Sadece .market-data (Navbar) içindeki item'ı bul
            const container = $(`.market-data .item:has([data-socket-key="${item.code}"])`)
            if (container.length) {
                const price = container.find(`[data-socket-attr="s"]`).first().text().trim()
                const change = container.find(`[data-socket-attr="c"]`).first().text().trim()
                marketDataList.push(formatObject(item.customName, price, change, item.sym))
            }
        })

        // --- 2. TABLODAN (#golds) ALTINLARI ÇEK (KESİN VERİ) ---
        const altinListesi = []
        const altinHedefleri = [
            { id: "ons", customName: "Ons Altın", sym: "$" },
            { id: "gram-altin", customName: "Gram Altın", sym: "TL" }
        ]

        altinHedefleri.forEach(gold => {
            const priceCell = $(
                `table#golds td[data-socket-key="${gold.id}"][data-socket-attr="ask"]`
            )
            const changeCell = $(
                `table#golds td[data-socket-key="${gold.id}"][data-socket-attr="c"]`
            )

            if (priceCell.length) {
                const price = priceCell.text().trim()
                const change = changeCell.text().trim()
                altinListesi.push(formatObject(gold.customName, price, change, gold.sym))
            }
        })

        const finans = [...marketDataList, ...altinListesi]
        const orderList = [
            "Dolar",
            "Euro",
            "Sterlin",
            "Ons Altın",
            "Gram Altın",
            "Gümüş",
            "BIST 100",
            "Bitcoin"
        ]
        finans.sort((a, b) => orderList.indexOf(a.name) - orderList.indexOf(b.name))
        return finans
    } catch (error) {
        console.error("Hata:", error.message)
        return []
    }
}
