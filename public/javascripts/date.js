getDate();
getDay();
getClock();
var refrClock = setInterval(getClock, 1000);

function getDate() {
    var d = new Date();
    var day = d.getDay();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var months = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    document.getElementById("date").innerHTML = date + " " + months[month] + " " + year;
}

function getDay() {
    var d = new Date();
    var day = d.getDay();
    var days = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
    document.getElementById("day").innerHTML = days[day];
}


function getClock() {
    console.log();
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    if (h < 10) {
        h = "0" + h
    }
    if (s < 10) {
        s = "0" + s
    }
    if (m < 10) {
        m = "0" + m
    }
    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s + " "
}