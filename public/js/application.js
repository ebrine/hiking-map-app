function initMap() {
  const uluru = {lat: -25.363, lng: 131.044};
  seattle = {lat: 47.6062, lng: -122.321}
  const map = new google.maps.Map($('#map')[0], {
    zoom: 8,
    center: seattle,
    mapTypeId: 'hybrid',
  });
  const marker = new google.maps.Marker({
    position: seattle,
    map: map,
    label: "Seattle"
  });
  const other = {lat: -25.363, lng: 140.044};
  const forks = {lat: 47.9504, lng: -124.3855};
  const marker2 = new google.maps.Marker({
    position: forks,
    map: map,
    title: "other",
  });

  map.addListener('click', function(e) {
      placeMarker(e.latLng, map);
  });

  function placeMarker(position, map) {
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          draggable: true,
      });
      map.panTo(position);
  }

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  function clearMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
  }

  $('#clear-search').click((e) => {
    event.preventDefault();
    console.log(map)
    clearMarkers()
  })

}

$(document).ready(() => {

})
