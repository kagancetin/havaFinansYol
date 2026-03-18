import axios from "axios"
import translate from "translate"

// Çeviri motorunu Google olarak ayarlıyoruz (varsayılan budur ama garantiye alalım)
translate.engine = "google"

const weatherSettings = data => {
    let weatherType = data.weather[0].icon.substring(0, 2)
    const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ]

    const dateParts = data.dt_txt.split(" ")[0].split("-") // ["2026", "01", "29"]
    const day = dateParts[2]
    const month = months[parseInt(dateParts[1]) - 1]

    return {
        weather: turkishWeathers(parseInt(weatherType)),
        temp: Math.round(data.main.temp),
        gif: `/images/animated/${data.weather[0].icon}.svg`,
        time: `${day} ${month}`,
        background: `/images/${weatherType}.jpg`
    }
}

const turkishWeathers = code => {
    const mapping = {
        1: "Açık",
        2: "Parçalı Bulutlu",
        3: "Çok bulutlu (Kapalı)",
        4: "Bulutlu",
        9: "Sağanak Yağışlı",
        10: "Hafif Yağmurlu",
        11: "Fırtına",
        13: "Karlı",
        50: "Sisli"
    }
    return mapping[code] || "Bilinmiyor"
}

export const havaDataForCity = async city => {
    try {
        let cityQuery = city || "Istanbul"
        let cityTurkish = cityQuery
        const apiKey = process.env.WEATHER_API_KEY

        // YENİ VE TEMİZ ÇEVİRİ İŞLEMİ
        if (city) {
            const cleanCityName = city.replace(/\+/g, " ")
            cityTurkish = await translate(cleanCityName, { from: "en", to: "tr" })
        }

        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=${apiKey}&lang=tr&units=metric`
        const { data } = await axios.get(url)

        const fiveDay = [0, 8, 16, 24, 32].map(index => weatherSettings(data.list[index]))

        return { fiveDay, name: cityTurkish }
    } catch (error) {
        console.error("Hava durumu hatası:", error.message)
        return false
    }
}
