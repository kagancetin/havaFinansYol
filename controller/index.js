// 1. HATANIN SEBEBİ BURASI: require yerine import kullanıyoruz
import * as havaService from "../helper/hava.js"
import { getDayHour } from "../helper/dateHelper.js" // Daha önce ayırdığımız yardımcı fonksiyon

export const index = async (req, res, next) => {
    res.render("index", {})
}

export const hava = async (req, res, next) => {
    res.render("hava", {
        // app.js'te app.locals'a bağladığımız veriyi req.app.locals üzerinden çekiyoruz
        daysWeather: req.app.locals.havaData,
        time: getDayHour()
    })
}

export const havaCity = async (req, res, next) => {
    // Modernize ettiğimiz havaService artık callback değil Promise (await) döndürüyor
    const data = await havaService.havaDataForCity(req.params.city)

    if (data === false) {
        res.send("Şehir ismini yanlış girdiniz!")
    } else {
        res.render("hava", {
            daysWeather: data,
            time: getDayHour()
        })
    }
}

export const finans = async (req, res, next) => {
    res.render("finans", {
        finans: req.app.locals.finansData,
        time: getDayHour()
    })
}

export const finans2 = async (req, res, next) => {
    res.render("finans2", {
        finans: req.app.locals.finansData,
        time: getDayHour()
    })
}

export const finans3 = async (req, res, next) => {
    res.render("finans3", {
        finans: req.app.locals.finansData,
        time: getDayHour()
    })
}

export const finansBlack = async (req, res, next) => {
    res.render("finansBlack", {
        finans: req.app.locals.finansData
    })
}

export const havafinans = async (req, res, next) => {
    res.render("havaFinans", {
        daysWeather: req.app.locals.havaData,
        finans: req.app.locals.finansData
    })
}

export const havafinansCity = async (req, res, next) => {
    const data = await havaService.havaDataForCity(req.params.city)

    if (data === false) {
        res.send("Şehir ismini yanlış girdiniz!")
    } else {
        res.render("havaFinans", {
            daysWeather: data,
            finans: req.app.locals.finansData
        })
    }
}

export const harita1 = async (req, res, next) => res.render("harita1")
export const harita2 = async (req, res, next) => res.render("harita2")
export const harita3 = async (req, res, next) => res.render("harita3")
