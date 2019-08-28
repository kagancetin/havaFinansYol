const Request = require("request");

var getFinansData = async function (callback) {

    let finance;
    let allCurrencies;
    let allGolds;
    let allCoins;
    await Request.get("https://www.doviz.com", (error, response, body) => {
        if (error) {
            return console.log(error);
        } else {

            try {
                all = body.match(/{.+}}/g);
                allCurrencies = JSON.parse(all[0]);
                allGolds = JSON.parse(all[1]);
                allCoins = JSON.parse(all[2]);
                var selling = [];
                var buying = [];

                selling[0] = allCurrencies["1"]; //dolar
                selling[1] = allCurrencies["2"]; //euro
                selling[2] = allCurrencies["3"]; //sterlin
                selling[3] = allGolds["2"] //altın

                callback(selling);
            } catch (error) {
                //log.save("doviz.com veri gelmedi (" + error + ")", "errGetFinans");
                callback(false);
            }
        }
    });

}



module.exports = {
    getFinansData: getFinansData
}