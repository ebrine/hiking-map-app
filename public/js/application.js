
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
    var geocoder = new google.maps.Geocoder();
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
        animation: google.maps.Animation.DROP, //just for fun
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

    // var service = new google.maps.places.PlacesService(map);
    var infowindow = new google.maps.InfoWindow();

    // get details for selected location when clicked
    // service.getDetails(places[0], callback)

    addInfoWindows()

    function addInfoWindows() {
        markers.forEach(function(marker,index) {
        marker.addListener('click', function(e) {
              infowindow.setContent('<div><strong>' + marker.title + '</strong><br>' +  `<button class="select-marker" id='marker-${index}'>Select</button>`);
              infowindow.open(map, this);
            });

            $('#map').on('click', `#marker-${index}`, (e) => {
              $('.result-container').remove()
              $('#add-details').remove()
              $('#search-output').prepend('<h2 id="add-details">2. Add Details & Save</h2>')
              $('#name-input').val(marker.title)
              $('#lat-input').val(marker.position.lat)
              $('#lng-input').val(marker.position.lng)
              $('#save-form').show()
            })
        })
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
      clearMarkers()
      displayMarkers(response)
    })
  })

  $('#save-form').submit((e) => {
    event.preventDefault()
    $.post('/markers', $('#save-form').serialize())
    .done((response) => {
      console.log(response);
    })
  })

}

$(document).ready(() => {

})
