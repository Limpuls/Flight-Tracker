var map;
function initMap() {
    var options = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    }

    map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        position: {lat: 42.4668, lng: 70.9495},
        map: map
    })
}
