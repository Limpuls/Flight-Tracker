//const axios = require('axios');


/*function initMap() {
    var map;
    var infoWindow;
    var options = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3
    }

    map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        position: {lat: 42.4668, lng: 70.9495},
        map: map
    })


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}*/

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, marker1, marker2;
function initMap() {
    var infoWindow = new google.maps.InfoWindow();
    var image = "https://en.spitogatos.gr/visualCaptcha/images/airplane.png?fbclid=IwAR2BvfuK8c0yyg82YKsIxvYUhoEeCIznsF7WrS603Ut7Ti_5x1lGKmxIwTI";


    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
    [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ],
        {name: 'Styled Map'});

    axios.get('http://localhost:8888/lsapp/public/planes/')
        .then(function (response) {
            // handle success
            /*while (response) {
            var cord1 = response.data["states"][0][5];
            var cord2 = response.data["states"][0][6];
            var marker = new google.maps.Marker({
                position: {lat: cord2, lng: cord1},
                map: map,
                icon: image
            })
            }*/
            //console.log(response.data["states"].length);
            var infowindow = new google.maps.InfoWindow();
            var north = new google.maps.LatLng(90.0000, 0.0000);
            var northPole = new google.maps.Marker({
                position: {lat: 90.0000, lng: 0.0000},
                map: map
            });
            /*var plane {
                url: "storage/app/public/airplane.svg", // url
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
            }*/
            northPole.setIcon({
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scaledSize: new google.maps.Size(10, 10),
                scale: 6
            });
            for (var i = 0; i < response.data["states"][i].length; i++) {
                console.log(response.data["states"][i]);


                var direction = new google.maps.LatLng(response.data["states"][i][6], response.data["states"][i][5]);
                var heading = google.maps.geometry.spherical.computeHeading(direction,north);

                var planeIcon = new google.maps.Marker({
                    position: {lat: response.data["states"][i][6], lng: response.data["states"][i][5]},
                    map: map,
                    title: response.data["states"][i][1],
                });

                planeIcon.setIcon({
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    scale: 1.5,
                    rotation: heading + response.data["states"][i][10]
                });

                google.maps.event.addListener(planeIcon, 'click', (function (planeIcon, i) {
                    return function () {
                        axios.get('http://localhost:8888/lsapp/public/planes/'+ response.data["states"][i][0].toLowerCase())
                            .then(function (res) {
                                console.log(response.data["states"][i][0]);
                                console.log(res);
                                console.log(response.data["states"][i][0]);
                            }).catch(function (error) {
                            // handle error
                            console.log(error);
                        });
                        infowindow.setContent(response.data["states"][i][0].toLowerCase());
                        infowindow.open(map, planeIcon);
                        console.log(response.data["states"][i][0].toLowerCase());
                    }
                })(planeIcon, i));

            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(54.9065), lng: parseFloat(25.3189)},
        zoom: 6
    });
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}



  /*  // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

*/




