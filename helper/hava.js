const Request = require("request");
//const log = require('./log');
const translate = require('node-google-translate-skidz');




var havaForeCastForCity = async (city, callback) => {

    var weatherForecast = {};
    var cityTurkish = "İstanbul";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=Istanbul&appid=44d1f235f990fb189e73bd70792a2e79&lang=tr&units=metric"

    /*
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
    */
    Request.get(url, async (error, response, body) => {
        if (error) {
            // return console.log(error);
        } else {
            if (JSON.parse(body).cod == "404") {
                weatherForecast.name = "Şehri yanlış girdiniz!";
                weatherForecast.weather = "";
                weatherForecast.temp = "";
                weatherForecast.gif = "/images/animated/01d.svg";
                log.save("Şehir yanlış girildi (" + error + ")", "errGetHava");
                callback(weatherForecast);
            } else {

                try {
                    //var weatherType = JSON.parse(body).weather[0].icon.substring(0, 2);


                    var fiveDay = [];

                    var parsed_body = JSON.parse(body)

                    for (let i = 0; i < 5; i++) {
                        if (i < 4) {
                            fiveDay[i] = weatherSettings(parsed_body.list[i * 8]);
                        }
                        if (i == 4) {
                            fiveDay[i] = weatherSettings(parsed_body.list[parsed_body.list.length - 1]);
                        }
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
    return {
        weather: turkishWeathers(parseInt(weatherType)),
        temp: parseInt(data.main.temp),
        gif: "/images/animated/" + data.weather[0].icon + ".gif",
        time: data.dt_txt
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

module.exports = {
    havaDataForCity: havaForeCastForCity
}