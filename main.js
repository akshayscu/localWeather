$(document).ready(function(){

  var long,lat,weatherType,celsius,fahrenheit,area,key,locationAPI,forecastAPI,link,dayTime;

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
          forecastAPI = "https://dataservice.accuweather.com/currentconditions/v1/"+key+"?apikey=7lX0OuSF5hvFQJVSFMjUz49bJt5V6Fdb";
          console.log(forecastAPI);
          $.getJSON(forecastAPI,function(dataForecast){
            console.log(dataForecast);
            weatherType = dataForecast[0].WeatherText;
            console.log(weatherType);
            fahrenheit = dataForecast[0].Temperature.Imperial.Value;
            celsius = dataForecast[0].Temperature.Metric.Value;
            link = dataForecast[0].Link;
            dayTime = dataForecast[0].IsDayTime;
            $('#weatherType').html(weatherType);
            $('#temp').html(fahrenheit);
            $('#tog').on('change',function(){
              if(!$(this).prop('checked')){
                $('#temp').html(celsius);
              }
              else{
                $('#temp').html(fahrenheit);
              }
            });
            $('#weatherType').click(function(){
              window.open(link,'_blank');
            });

            var conditions = weatherType.split(" ");
              var flag = false;
              for(var i=0;i<conditions.length;i++){
                if(/clear|sun/.test(conditions[i])===true && dayTime===true){
                  $('body').css("background-image","url('img/clear.jpg')");
                  console.log("in clear");
                  flag=true;
                }

                else if(/clear/.test(conditions[i])===true && dayTime===false){
                  $('body').css("background-image","url('img/clearNight.jpg')");
                  $('#title').css("color","white");
                  $('#temp').css("color","white");
                  console.log("in clear");
                  flag=true;
                }

                else if(/c|Cloud/.test(conditions[i])===true && dayTime===true){
                  console.log("in cloud");
                  $('body').css("background-image","url('img/cloudy.jpg')");
                  flag=true;
                }

                else if(/c|Cloud/.test(conditions[i])===true && dayTime===false){
                  console.log("in cloud");
                  $('body').css("background-image","url('img/cloudyNight.jpg')");
                  $('#title').css("color","white");
                  $('#temp').css("color","white");
                  flag=true;
                }

                else if(/rain/.test(conditions[i])===true){
                  console.log("in rain");
                  $('body').css("background-image","url('img/rainy.jpg')");
                  flag=true;
                }
                else if(/snow/.test(conditions[i])===true){
                  console.log("in snow");
                  $('body').css("background-image","url('img/snow.jpg')");
                  flag=true;
                }
                else if(/fog/.test(conditions[i])===true){
                  console.log("in fog");
                  $('body').css("background-image","url('img/foggy.jpg')");
                  flag=true;
                }
                else if(/haz(e|y)|mist/.test(conditions[i])===true){
                  console.log("in haze");
                  $('body').css("background-image","url('img/hazy.jpg')");
                  flag=true;
                }
              }

              if(flag===false){
                console.log("in none");
                $('body').css("background-image","url('img/placeholder.jpg')");
              }
          });
      });
    });
  }
});
