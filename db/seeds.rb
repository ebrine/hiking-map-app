me = User.create(username: "eliza", password: 'password', email: "elizabrine@gmail.com")

Marker.create!(name: "Seattle", entry_type: "POI", details: "I had a great time visiting Seattle", lat: 47.6062, lng: -122.321)

Marker.create!(name: "La Push", entry_type: "POI", details: "It was beautiful to see the ocean!", lat: 47.9081335, lng: -124.6352255)

me.markers << Marker.find(1)
me.markers << Marker.find(2)
