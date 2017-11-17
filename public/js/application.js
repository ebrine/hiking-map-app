


function initMap() {

  // initialize map
  seattle = {lat: 47.6062, lng: -122.321}
  const map = new google.maps.Map($('#map')[0], {
    zoom: 8,
    center: seattle,
    mapTypeId: 'hybrid',
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  function clearMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
      marker = null;
    });
    markers = [];
  }

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    clearMarkers();

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      console.log(place)
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
        let i = 0;
        markers.forEach(function(marker,index) {

        marker.addListener('click', function(e) {
          console.log(marker)
          console.log(e)
          // debugger;
              infowindow.setContent('<div><strong>' + marker.title + '</strong><br>' +  `<button class="select-marker" id='marker-${index}'>Select</button>`);
              infowindow.open(map, this);
            });

            $('#map').on('click', `#marker-${index}`, (e) => {
              $('#search-output').append('<h2>2. Add Details & Save</h2>')
              $('#search-output').append(`<div class="result-container">${marker.title}</div>`)
            })
        })
      }
    }
  })



  function placeMarker(position, map) {
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          draggable: true,
      });
      map.panTo(position);
  }

  // when user clicks map, they can add a marker
  $('#select').click((e) => {
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
  })



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

  return map;
}
$(document).ready(() => {
  const map = initMap()
})
