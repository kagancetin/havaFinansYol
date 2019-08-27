var myMap;
var time = 200;
var x1, x2, y1, y2, a, b;
x1 = 40.986459;
y1 = 29.140777;
x2 = 41.038461;
y2 = 29.036236;
var z = 0;
var i = 0;
if (window.location.pathname.split("/").length == 4) {
  var kordinatlar = window.location.pathname.split("/")[3].split("&");
  if ((kordinatlar.length = 4)) {
    x1 = Number(kordinatlar[0]);
    y1 = Number(kordinatlar[1]);
    x2 = Number(kordinatlar[2]);
    y2 = Number(kordinatlar[3]);
  }
  mapLoad();
} else {
  mapLoad();
}
function mapLoad() {
  try {
    ymaps.ready(init);

    var interval2 = window.setInterval(function() {
      i++;
      console.log(i);
    }, 1000);

    function init() {
      myMap = new ymaps.Map("map", {
        center: [x1, y1],
        zoom: 13,
        controls: []
      });
    }

    setTimeout(function() {
      zoom();
    }, 1500);

    function kayma() {
      var myAction;
      var myCallback2 = function(err) {
          var actualProvider = new ymaps.traffic.provider.Actual(
            {},
            { infoLayerShown: true }
          );
          actualProvider.setMap(myMap);
        },
        myAction = new ymaps.map.action.Single({
          center: [x2, y2],
          zoom: 13,
          timingFunction: "linear",
          checkZoomRange: true,
          callback: myCallback2
        });

      myMap.action.execute(myAction);
    }

    function zoom() {
      var myAction;
      var myCallback = function(err) {
          var actualProvider = new ymaps.traffic.provider.Actual(
            {},
            { infoLayerShown: true }
          );
          actualProvider.setMap(myMap);
          setTimeout(function() {
            kayma();
          }, 5000);
        },
        myAction = new ymaps.map.action.Single({
          center: [x1, y1],
          zoom: 13,
          timingFunction: "linear",
          checkZoomRange: true,
          callback: myCallback
        });

      myMap.action.execute(myAction);
    }
  } catch (error) {
    mapLoad();
  }
}
