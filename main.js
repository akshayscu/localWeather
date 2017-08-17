$(document).ready(function(){

  var long,lat,weatherType,temp,kelvin,celsius,fahrenheit,area,windSpeed,mph,key,locationAPI,forecastAPI;



  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      long = position.coords.longitude;
      lat = position.coords.latitude;

      locationAPI = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=7lX0OuSF5hvFQJVSFMjUz49bJt5V6Fdb&q="+lat+"%2C"+long;
      console.log(locationAPI);

      $.getJSON(locationAPI,function(dataLoc){
          key = dataLoc.Key;
          area = dataLoc.EnglishName;
          $('#city').html(area);
          forecastAPI = "https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/"+key+"?apikey=7lX0OuSF5hvFQJVSFMjUz49bJt5V6Fdb";
          console.log(forecastAPI);
          $.getJSON(forecastAPI,function(dataForecast){
            weatherType = dataForecast.IconPhrase;
            fahrenheit = dataForecast.Temperature.Value;
            celsius = ((fahrenheit-32)*5)/9;
            $('#weatherType').html(weatherType);
            $('#temp').html(fahrenheit);
          });
      });

    });
  }
});

// $.getJSON(api,function(data){
      //
      //   weatherType = data.weather[0].description;
      //   kelvin = data.main.temp;
      //   fahrenheit = (kelvin)*(9/5)-459.67;
      //   celsius = kelvin-273;
      //   city = data.name;
      //   windSpeed = data.wind.speed;
      //   mph = windSpeed*2.2369;
      //
      //   $('#city').html(city);
      //   $('#weatherType').html(weatherType);
      //   //$('#temp').html(fahrenheit.toFixed(1)+' &#8457;');
      //   $('#temp').html(fahrenheit.toFixed(1));
      //   $('#windSpeed').html(mph.toFixed(1)+" mph");
      //
      //   $('#tog').on('change',function(){
      //     if(!$(this).prop('checked')){
      //       $('#temp').html(celsius.toFixed(1));
      //     }
      //     else{
      //       $('#temp').html(fahrenheit.toFixed(1));
      //     }
      //   });
      //
      //   var conditions = weatherType.split(" ");
      //   var flag = false;
      //   for(var i=0;i<conditions.length;i++){
      //     if(/clear/.test(conditions[i])===true){
      //       $('body').css("background-image","url('img/clear.jpg')");
      //       console.log("in clear");
      //       flag=true;
      //     }
      //     else if(/cloud/.test(conditions[i])===true){
      //       console.log("in cloud");
      //       $('body').css("background-image","url('img/cloudy.jpg')");
      //       flag=true;
      //     }
      //     else if(/rain/.test(conditions[i])===true){
      //       console.log("in rain");
      //       $('body').css("background-image","url('img/rainy.jpg')");
      //       flag=true;
      //     }
      //     else if(/snow/.test(conditions[i])===true){
      //       console.log("in snow");
      //       $('body').css("background-image","url('img/snow.jpg')");
      //       flag=true;
      //     }
      //     else if(/fog/.test(conditions[i])===true){
      //       console.log("in fog");
      //       $('body').css("background-image","url('img/foggy.jpg')");
      //       flag=true;
      //     }
      //     else if(/haz(e|y)|mist/.test(conditions[i])===true){
      //       console.log("in haze");
      //       $('body').css("background-image","url('img/hazy.jpg')");
      //       flag=true;
      //     }
      //   }
      //
      //   if(flag===false){
      //     console.log("in none");
      //     $('body').css("background-image","url('img/placeholder.jpg')");
      //   }
      //
      //   });
