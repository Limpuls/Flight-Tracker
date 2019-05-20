<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="../public/css/app.css">

        <title>Laravel</title>

    </head>
    <body>
    <div id="map">
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1ZfqESpQ4IL3XjW3MTmLepr-dONFf0A&libraries=geometry&callback=initMap"
            async defer></script>







    </body>
</html>
