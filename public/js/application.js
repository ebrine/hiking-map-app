function initMap() {
  const uluru = {lat: -25.363, lng: 131.044};
  const map = new google.maps.Map($('#map')[0], {
    zoom: 4,
    center: uluru
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  const other = {lat: -25.363, lng: 140.044};
  const marker2 = new google.maps.Marker({
    position: other,
    map: map,
    title: "other",
  });
}
