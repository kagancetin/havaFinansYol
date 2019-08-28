const havaService = require("../helper/hava.js");

module.exports = {
    index: async (req, res, next) => {
        res.render("index", {

        });

    },
    hava: async (req, res, next) => {
        res.render("hava", {
            daysWeather: global.havaData,
        });
    },
    havaCity: async (req, res, next) => {
        await havaService.havaDataForCity(req.params.city, g => {
            if (g == false) {
                res.send("Şehir ismini yanlış girdiniz!");
            } else {
                res.render("hava", {
                    daysWeather: g,
                });
            }

        });

    },
    finans: async (req, res, next) => {

        res.render("finans", {
            finans: global.finansData,
        });

    },
    finansBlack: async (req, res, next) => {

        res.render("finansBlack", {
            finans: global.finansData,
        });

    },
    havafinans: async (req, res, next) => {
        res.render("havaFinans", {
            daysWeather: global.havaData,
            finans: global.finansData
        });
    },
    havafinansCity: async (req, res, next) => {
        await havaService.havaDataForCity(req.params.city, g => {
            if (g == false) {
                res.send("Şehir ismini yanlış girdiniz!");
            } else {
                console.log(g)
                res.render("havaFinans", {
                    daysWeather: g,
                    finans: global.finansData
                });
            }
        });

    },
    harita1: async (req, res, next) => {
        res.render("harita1");
    },
    harita2: async (req, res, next) => {
        res.render("harita2");
    },
    harita3: async (req, res, next) => {
        res.render("harita3");
    }
}