var myMap;
var x2, y2;
x2 = 41.038461;
y2 = 29.036236;
x1 = 40.998841;
y1 = 29.097559;
ymaps.ready(init);

function init() {
  myMap = new ymaps.Map("map", {
    center: [x2, y2],
    zoom: 13,
    controls: []
  });
  var actualProvider = new ymaps.traffic.provider.Actual(
    {},
    { infoLayerShown: true }
  );
  actualProvider.setMap(myMap);
  myPlacemark = new ymaps.Placemark(
    [x1, y1],
    {
      hintContent: "A custom placemark icon",
      balloonContent: "This is a pretty placemark"
    },
    {
      /**
       * Options.
       * You must specify this type of layout.
       */
      iconLayout: "default#image",
      // Custom image for the placemark icon.
      iconImageHref: "/images/konum.png",
      // The size of the placemark.
      iconImageSize: [44, 108],
      /**
       * The offset of the upper left corner of the icon relative
       * to its "tail" (the anchor point).
       */
      iconImageOffset: [-50, -80]
    }
  );
  myMap.geoObjects.add(myPlacemark);
}
