$(function(){

    getJSON();

    function getJSON(){

        $.getJSON("https://api.myjson.com/bins/i8run", function (data){

            crearTabla(data);

        });
    }

    function crearTabla(data){

        var ciudades = data.list;
        console.log(ciudades);
        var tabla = $('#tabla');
        var tHead = $('<thead/>');
        var cells = ['City', 'Temperature', 'Wind', 'Description', ''];
        var row = $('<tr/>');
        var tbody = $('<tbody>');

        tabla.append(tHead);
        tabla.append(tbody);
        tHead.append(row);


        $.each(cells, function(i, value){
            var cell = $('<th/>').text(value);
            row.append(cell);
        });

        $.each(ciudades, function(key, value){

            var row = getRow(value);
            tabla.append(row);
        })
    }

    function getRow(value) {
        var row = $('<tr/>');
        var windCell = $('<td>' + roundUp(value.wind.speed) + 'm/h<br/></td>');
        var link = ""
        var compassImage = $("<img src='images/North.png'>");
        compassImage.css('transform', 'rotate(' + value.wind.deg + 'deg)');
        windCell.append(compassImage);

        row.append('<td><a href="http://maps.google.com/?q=' + value.coord.lat + ',' +value.coord.lon + '"</a>' + value.name + '</td>');
        row.append('<td>' + roundUp(value.main.temp) + "ºC" + '<img src="images/thermometer.png"></td>');
        row.append(windCell);
        row.append('<td>' + value.weather["0"].description + '</td>');
        row.append('<td><img src="images/' +  value.weather["0"].icon + '.png"></td>');
        return row;
    }

    function roundUp(num, precision) {
        var precision = 10;
        return Math.ceil(num * precision) / precision;
    }

});




//"http://maps.google.com/?q=[lat],[long]"

//"http://www.google.com/maps/place/49.46800006494457,17.11514008755796/@49.46800006494457,17.11514008755796,17z"

//'http://www.google.com/maps/place/' + value.coord.lat + ',' + value.coord.lon + '/@' + value.coord.lat + ',' + value.coord.lon + "z'"

