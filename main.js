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
        city = data.name;
        windSpeed = data.wind.speed;
        mph = windSpeed*2.2369;

        $('#city').html(city);
        $('#weatherType').html(mph.toFixed(1)+" mph");
        //$('#temp').html(fahrenheit.toFixed(1)+' &#8457;');
        $('#temp').html(fahrenheit.toFixed(1));
        $('#windSpeed').html(windSpeed);
        //console.log("out");

        $('#tog').on('change',function(){
          if(!$(this).prop('checked')){
            $('#temp').html(celsius.toFixed(1));
          }
          else{
            $('#temp').html(fahrenheit.toFixed(1));
          }
        });

        });

      });

    }
  });


// 30c9b976c915ba695fcf255d8a91fd88
