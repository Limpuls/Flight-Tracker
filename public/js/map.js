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
        position: {lat: 54.9065, lng: 25.3189},
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
var map, marker1, marker2, myLatlng, icon;
var boo = true;
var planeIcon;
function initMap() {

    var infoWindow = new google.maps.InfoWindow();
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
    [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ],
        {name: 'Styled Map'});
    var div = document.createElement("div");
    div.className += "obj";
    div.innerHTML += "<h4>" + "data" + "</h4>";
    //$("div").html("<h2>" + res + "</p>");
    var bod = document.getElementsByTagName("body")[0];
    bod.appendChild(div);

setInterval(
function () {
    axios.get('http://localhost:8888/lsapp/public/planes/')

        .then(function (response) {
            var infowindow = new google.maps.InfoWindow();
            var north = new google.maps.LatLng(90.0000, 0.0000);
            var northPole = new google.maps.Marker({
                position: {lat: 90.0000, lng: 0.0000},
                map: map
            });
            northPole.setIcon({
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scaledSize: new google.maps.Size(10, 10),
                scale: 6
            });

            for (var i = 0; i < 50; i++) {
                //console.log(response.data["states"][i]);
                console.log(response.data["states"][i]);

                var direction = new google.maps.LatLng(response.data["states"][i][6], response.data["states"][i][5]);
                var heading = google.maps.geometry.spherical.computeHeading(direction, north);

                myLatlng = new google.maps.LatLng(response.data["states"][i][6],response.data["states"][i][5]);
                    icon = {
                        path: "M 356.26958,135.02702 L 356.26958,249.31026 L 296.72689,289.12758 C 298.37366,285.78981 297.94877,282.22185 297.97085,278.70356 L 297.7704,238.6142 L 268.80878,238.44964 L 269.05561,285.18318 C 269.06227,292.68821 270.04683,297.17053 276.7074,301.30953 L 204.8529,348.4504 C 207.01499,345.12276 206.84863,341.2911 206.84863,337.51874 L 206.77165,295.05645 L 178.71508,294.89191 L 178.6328,342.1191 C 178.84508,349.00225 179.88792,356.28465 186.12004,360.54922 L 30.615857,462.16174 C 3.2664942,481.49054 8.4728732,501.69026 10.293349,521.73054 L 356.26958,404.23849 L 356.26958,582.78033 L 365.64921,648.51992 L 252.92924,731.45549 C 236.829,745.21163 238.89783,759.656 241.98635,773.74604 L 388.44003,735.48708 C 390.1301,775.95885 408.69374,776.66877 411.55996,735.56935 L 558.01364,773.82832 C 561.10216,759.73826 563.17099,745.29391 547.07076,731.53776 L 434.3508,648.6022 L 443.73041,582.86261 L 443.73041,404.32077 L 789.70665,521.73054 C 791.52713,501.6903 796.7335,481.57282 769.38414,462.24402 L 613.87995,360.6315 C 620.11205,356.3669 621.07263,349.08453 621.28491,342.20138 L 621.28491,294.97418 L 593.22834,295.13873 L 593.15851,338.35476 C 593.1282,342.1754 593.2504,345.43211 595.47226,348.97078 L 523.21031,301.39181 C 529.87094,297.25281 530.93773,292.77049 530.94439,285.26546 L 531.19122,238.53192 L 502.22959,238.69647 L 502.02452,278.95408 C 502.0435,282.62018 501.76549,285.90838 503.64551,289.27217 L 443.73041,249.39253 L 443.73041,135.10929 C 429.29576,-9.7066548 372.45267,-10.54689 356.26958,135.02702 z ",
                        fillColor: '#111111',
                        fillOpacity: 1,
                        scaledSize: new google.maps.Size(0.01, 0.01),
                        rotation: heading + response.data["states"][i][10],
                        scale: 0.02
                    }

                   /*for (var j = 0; j < planeIcon.length; j++) {
                       planeIcon[j].setMap(null);
                   }*/



           planeIcon = new google.maps.Marker({
               position: {lat: response.data["states"][i][6], lng: response.data["states"][i][5]},
               map: map,
               title: response.data["states"][i][1],
               icon: icon
           });

               /*if(planeIcon.length > 0) {
                   for (var j = 0; j < planeIcon.length; j++)
                   planeIcon[j].setPosition(myLatlng);
               } else {
                   planeIcon.push(new google.maps.Marker({
                       position: {lat: response.data["states"][i][6], lng: response.data["states"][i][5]},
                       map: map,
                       title: response.data["states"][i][1],
                       icon: icon
                   }));
               }
               console.log(planeIcon);*/


                google.maps.event.addListener(planeIcon, 'click', (function (planeIcon, i) {
                    return function () {
                        axios.get('http://localhost:8888/lsapp/public/planes/' + response.data["states"][i][0].toLowerCase())
                            .then(function (res) {
                                       /* var div = document.createElement("div");
                                        div.className += "obj";
                                        div.innerHTML += "<h4>" + res.data + "</h4>";
                                        //$("div").html("<h2>" + res + "</p>");
                                        var bod = document.getElementsByTagName("body")[0];
                                        bod.appendChild(div);*/
                                /*if (div) {
                                    // Get its parent
                                    parent = document.getElementsByTagName("body")[0];
                                    console.log(parent);
                                    // Create the new element
                                    newElement = document.createElement('div');

                                    // Set its ID and content
                                    newElement.id = "logo";
                                    newElement.innerHTML = res.data;

                                    // Insert the new one in front of the old one (this temporarily
                                    // creates an invalid DOM tree [two elements with the same ID],
                                    // but that's harmless because we're about to fix that).
                                    parent.insertBefore(newElement, div);

                                    // Remove the original
                                    parent.removeChild(div);
                                }*/
                                div.innerHTML = '';
                                div.innerHTML += "<h5>" + res.data + "</h5>";

                                //console.log(response.data["states"][i][0]);
                                //console.log(res);
                                /*var div = document.createElement("div");
                                div.innerHTML += "<p>" + res.data + "</p>";
                                var bod = document.getElementsByTagName("body")[0];
                                bod.appendChild(div);*/
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

}, 10000);
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




