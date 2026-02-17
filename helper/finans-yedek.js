const Request = require("request");
const cheerio = require("cheerio");
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
        $ = cheerio.load(body);
        let el = $(".item .value");
        let rate = $(".item .value").next();
        let finans = [];

        for (let i = 0; i < 4; i++) {
          let fncData = {};
          fncData.selling = parseFloat(
            el.eq(i).text().replace(",", ".")
          ).toFixed(2);
          fncData.change_rate_str = rate.eq(i).text();

          if (
            parseFloat(rate.eq(i).text().replace(",", ".").split("%")[1]) > 0
          ) {
            fncData.status_symbol = "&#9650";
            fncData.status_bg_color = "green";
          } else {
            fncData.status_symbol = "&#9660";
            fncData.status_bg_color = "red";
          }
          finans.push(fncData);
        }
        callback(finans);
      } catch (error) {
        console.log("doviz.com veri gelmedi (" + error + ")", "errGetFinans");
        callback(false);
      }
    }
  });
};

module.exports = {
  getFinansData: getFinansData,
};
