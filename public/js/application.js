function initMap() {

  // initialize map, add a few static markers just for testing
  seattle = {lat: 47.6062, lng: -122.321}
  const map = new google.maps.Map($('#map')[0], {
    zoom: 8,
    center: seattle,
    mapTypeId: 'hybrid',
  });
  // const marker = new google.maps.Marker({
  //   position: seattle,
  //   map: map,
  //   label: "Seattle"
  // });
  // const forks = {lat: 47.9504, lng: -124.3855};
  // const marker2 = new google.maps.Marker({
  //   position: forks,
  //   map: map,
  //   title: "other",
  // });

  // when user clicks map, they can add a marker
  // future --> change so user has to select button to enable this
  // because it gets annoying
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

      // For adding different icons depending on the place

      // var icon = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        // icon: icon,
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

    var service = new google.maps.places.PlacesService(map);
    var infowindow = new google.maps.InfoWindow();

    // get details for selected location when clicked
    service.getDetails(places[0], callback)
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        markers.forEach(function(marker) {
        google.maps.event.addListener(marker, 'click', function() {
          console.log(marker)
              infowindow.setContent('<div><strong>' + marker.title + '</strong><br>' +  '<button class="select-marker">Select</button>');
              infowindow.open(map, this);
            });
            $('#map').on('click', ".select-marker", (e) => {
              console.log("HI")
              console.log(e);
              console.log(marker);
              $('#search-output').append(`<div class="result-container">${marker.title}</div>`)
            })
        })
      }
    }
  })


  function clearMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
  }

  $('#clear-search').click((e) => {
    event.preventDefault();
    clearMarkers()
    $("#pac-input").val('')
  })




  function displayMarkers(markers) {
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(function(marker) {
      new google.maps.Marker({
        position: {lat: marker.lat, lng: marker.lng },
        map: map,
        label: marker.name,
      });
      bounds.extend(marker)
    })
    map.fitBounds(bounds);

  }

  $('#load-markers').click((e) => {
    event.preventDefault();
    $.ajax({
      url: '/markers',
    }).done((response) => {
      displayMarkers(response)
    })
  })
}
$(document).ready(() => {

})
