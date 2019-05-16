var map;
function initMap() {
    var options = {
        center: {lat: 54.9065, lng: 25.3189},
        zoom: 4.8
    }

    map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        position: {lat: 54.9065, lng: 25.3189},
        map: map
    })
}
