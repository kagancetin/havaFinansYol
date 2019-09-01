var myMap;
var x1, y1;
x1 = 40.998841;
y1 = 29.097559;
ymaps.ready(init);

function init() {
  myMap = new ymaps.Map("map", {
    center: [x1, y1],
    zoom: 14,
    controls: []
  });
  var actualProvider = new ymaps.traffic.provider.Actual(
    {},
    { infoLayerShown: true }
  );
  actualProvider.setMap(myMap);
  myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
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
      iconImageSize: [85, 116],
      /**
       * The offset of the upper left corner of the icon relative
       * to its "tail" (the anchor point).
       */

      iconImageOffset: [-50, -100]
    }
  );
  myMap.geoObjects.add(myPlacemark);
}
