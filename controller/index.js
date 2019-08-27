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
    finans: async (req, res, next) => {

        res.render("finans", {
            finans: global.finansDataSelling
        });

    },
    havafinans: async (req, res, next) => {
        res.render("havaFinans", {
            daysWeather: global.havaData,
            finans: global.finansDataSelling
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