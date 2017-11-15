me = User.create(username: "eliza", password: 'password', email: "elizabrine@gmail.com")

me.markers << Marker.create(name: "Seattle", entry_type: "POI", details: "I had a great time visiting Seattle", lat: 46.6062, lng: -122.321)
me.markers << Marker.create(name: "La Push", entry_type: "POI", details: "It was beautiful to see the ocean!", lat: 47.9081335, lng: -124.6352255)
