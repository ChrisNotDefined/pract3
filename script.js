var mymap = L.map("mapid").setView([21.15223412617155, -101.7113883047542], 15);
let markerArray = [];
let path = null;

L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 20,
    ext: "png",
  }
).addTo(mymap);

function onMapClick(e) {
  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

  markerArray.push(marker);

  marker
    .bindPopup("Coordenadas: " + e.latlng.lat + "," + e.latlng.lng)
    .openPopup();
}

mymap.on("click", onMapClick);

mymap.on("dblclick", (e) => {
  if (path != null) {
    path.remove();
    path = null;
  }
  path = L.polyline(
    [
      markerArray[markerArray.length - 2].getLatLng(),
      markerArray[markerArray.length - 1].getLatLng(),
    ],
    {
      color: "red",
    }
  ).addTo(mymap);
});
