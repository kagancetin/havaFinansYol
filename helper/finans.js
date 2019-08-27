const Request = require("request");

var getFinansData = async function (callbackSell) {

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

                selling[0] = allCurrencies["1"]; //dolar
                selling[1] = allCurrencies["2"]; //euro
                selling[2] = allCurrencies["3"]; //sterlin
                selling[3] = allGolds["2"] //altın
                //selling[1] = allCurrencies["2"]["selling_str"].substring(0, allCurrencies["2"]["selling_str"].length - 2) + " ₺"; //euro
                //selling[2] = allCurrencies["3"]["selling_str"].substring(0, allCurrencies["3"]["selling_str"].length - 2) + " ₺"; //sterlin
                //selling[3] = allGolds["2"]["selling_str"].substring(0, allGolds["2"]["selling_str"].length - 2) + " ₺"; //altın
                callbackSell(selling);
                console.log("finans geldi");
            } catch (error) {
                //log.save("doviz.com veri gelmedi (" + error + ")", "errGetFinans");
                callbackSell(false);
            }
        }
    });

}


var finansDataBuying = function () {
    var buying = [];


    buying[0] = allCurrencies["1"]["buying_str"];
    buying[1] = allCurrencies["2"]["buying_str"];
    buying[2] = allCurrencies["3"]["buying_str"];
    buying[3] = allGolds["2"]["buying_str"];

    return buying;
}



module.exports = {
    getFinansData: getFinansData
}