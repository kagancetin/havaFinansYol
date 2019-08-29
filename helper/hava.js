const Request = require("request");
//const log = require('./log');
const translate = require('node-google-translate-skidz');




var havaForeCastForCity = async (city, callback) => {
    var weatherForecast = {};
    var cityTurkish = "İstanbul";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=Istanbul&appid=44d1f235f990fb189e73bd70792a2e79&lang=tr&units=metric"

    if (city) {
        var e = "";
        url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=44d1f235f990fb189e73bd70792a2e79&lang=tr&units=metric";
        if (city.indexOf("+") > 0) {
            e = city.replace(/\+/g, " ")
        } else {
            e = city;
        }
        await translate({
            text: e,
            source: 'en',
            target: 'tr'
        }, function (result) {
            cityTurkish = result.translation;
        });
    }

    Request.get(url, async (error, response, body) => {
        if (error) {
            // return console.log(error);
        } else {
            if (JSON.parse(body).cod == "404") {
                callback(false)
                //log.save("Şehir yanlış girildi (" + error + ")", "errGetHava");
                callback(weatherForecast);
            } else {

                try {
                    //var weatherType = JSON.parse(body).weather[0].icon.substring(0, 2);
                    var fiveDay = [];

                    var parsed_body = JSON.parse(body)

                    for (let i = 0; i < 5; i++) {
                        fiveDay[i] = weatherSettings(parsed_body.list[i * 8]);
                    }
                    callback({
                        fiveDay: fiveDay,
                        name: cityTurkish
                    });

                } catch (error) {
                    //log.save("Veri gelmedi (" + error + ")", "errGetHava");
                    callback(weatherForecast);
                }
            }
        }
    });
}


var weatherSettings = (data) => {

    var weatherType = data.weather[0].icon.substring(0, 2);

    let day = parseInt(data.dt_txt.split('-')[2].substring(0, 2));

    let newDate = day.toString() + " " + monthFormat(data.dt_txt.split('-')[1]);
    return {
        weather: turkishWeathers(parseInt(weatherType)),
        temp: parseInt(data.main.temp),
        gif: "/images/animated/" + data.weather[0].icon + ".svg",
        time: newDate
    }
}



var turkishWeathers = function (code) {
    switch (code) {
        case 01:
            return "Açık"
            break;
        case 02:
            return "Parçalı Bulutlu"
            break;
        case 03:
            return "Bulutlu"
            break;
        case 04:
            return "Bulutlu"
            break;
        case 09:
            return "Sağanak Yağışlı"
            break;
        case 10:
            return "Hafif Yağmurlu"
            break;
        case 11:
            return "Fırtına"
            break;
        case 13:
            return "Karlı"
            break;
        case 50:
            return "Sisli"
            break;
        default:
            return "error"

    }
}

var monthFormat = (date) => {
    switch (date) {
        case "01":
            return "Ocak"
            break;
        case "02":
            return "Şubat"
            break;
        case "03":
            return "Mart"
            break;
        case "04":
            return "Nisan"
            break;
        case "05":
            return "Mayıs"
            break;
        case "06":
            return "Haziran"
            break;
        case "07":
            return "Temmuz"
            break;
        case "08":
            return "Ağustos"
            break;
        case "09":
            return "Eylül"
            break;
        case "10":
            return "Ekim"
            break;
        case "11":
            return "Kasım"
            break;
        case "12":
            return "Aralık"
            break;
        default:
            return "error"
    }
}

module.exports = {
    havaDataForCity: havaForeCastForCity
}