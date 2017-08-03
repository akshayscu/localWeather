$(document).ready(function(){

  var long,lat,weatherType,temp,kelvin,celsius,fahrenheit,city,windSpeed;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      long = position.coords.longitude;
      lat = position.coords.latitude;

      var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=30c9b976c915ba695fcf255d8a91fd88";

      $.getJSON(api,function(data){

        weatherType = data.weather[0].description;
        kelvin = data.main.temp;
        fahrenheit = (kelvin)*(9/5)-459.67;
        celsius = kelvin-273;
        city = data.city;
        windSpeed = data.wind.speed;

        $('#city').html(city);
        $('#weatherType').html(weatherType);
        $('#temp').html(kelvin);
        $('#windSpeed').html(windSpeed);
        console.log("out");

        if($('#tog').prop('checked')){
            console.log("in If");
            $('#temp').html('hi '+celsius);
          }
        else{
            console.log("in Else");
            $('#temp').html(fahrenheit);
          }

        });

      });

    }
  });


// 30c9b976c915ba695fcf255d8a91fd88
