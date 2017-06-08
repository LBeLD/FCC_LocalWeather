$(document).ready(function() {
  var city,
      region,
      country,
      location,
      locationArray,
      lat,
      long,
      api,
      summary,
      tempC,
      tempF,
      maxTempC,
      minTempC,
      maxTempF,
      minTempF,
      icon,
      icons = {
        'clear-day':'<img src="icons/day.svg"></img>',
        'clear-night':'<img src="icons/night.svg"></img>',
        'rain':'<img src="icons/rainy.svg"></img>',
        'snow':'<img src="icons/snow.svg"></img>',
        'sleet':'<img src="icons/snow.svg"></img>',
        'wind': '<img src="icons/cloudy.svg"></img>',
        'fog':'<img src="icons/cloudy.svg"></img>',
        'cloudy': '<img src="icons/cloudy.svg"></img>',
        'partly-cloudy-day': '<img src="icons/cloudy-day.svg"></img>',
        'partly-cloudy-night': '<img src="icons/cloudy.svg"></img>',
        'thunderstorm': '<img src="icons/thunder.svg"></img>'
      };

//INFO API go get user's location
  $.getJSON('https://ipinfo.io', function(data){
    location = data.loc;
    locationArray = location.split(',');
    lat = locationArray[0];
    long = locationArray[1];
    city = data.city;
    region = data.region;
    country = data.country;

    showLocation(city, region, country);

    api = 'https://api.darksky.net/forecast/b0de68f61353646c3fdccda596d50eba/' + lat + ',' + long + '?si=[si]';

//DARKSY API to get weather information
  $.ajax({
    url: api,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      summary = data.currently.summary;
      tempC = Math.round(data.currently.temperature);
      minTempC = Math.round(data.daily.data[0].temperatureMin);
      maxTempC = Math.round(data.daily.data[0].temperatureMax);
      icon = data.currently.icon;
      //populate DOM with weather info
      $('#iconImage').html(icons[icon]);
      $('#summary').html(summary);
      $('#minTemp').html(minTempC + '&deg;C');
      $('#maxTemp').html(maxTempC + '&deg;C');
      $('#temp').html(tempC + '&deg;C' );
    }

  });
});

//On click change units C to F
$('#fahrenheit').click(function(){
  //toggle button
  $('#fahrenheit').css('cursor', 'auto');
  $('#celsius').css('cursor', 'pointer');
  $('#celsius').removeClass('selected');
  $('#fahrenheit').addClass('selected');
  //convert from Celsius to Fahrenheit
  tempF = Math.round(tempC * (9/5) + 32);
  maxTempF = Math.round(maxTempC * (9/5) + 32);
  minTempF = Math.round(minTempC * (9/5) + 32);
  $('#temp').html(tempF + '&deg;F');
  $('#minTemp').html(minTempF + '&deg;F');
  $('#maxTemp').html(maxTempF + '&deg;F');

});

//On click change units from F to C
$('#celsius').click(function(){
  $('#celsius').css('cursor', 'auto');
  $('#fahrenheit').css('cursor', 'pointer');
  $('#fahrenheit').removeClass('selected');
  $('#celsius').addClass('selected');
  $('#temp').html(tempC + '&deg;C');
  $('#minTemp').html(minTempC + '&deg;C');
  $('#maxTemp').html(maxTempC + '&deg;C');
})

// FUNCTIONS
function showLocation(city, region, country){
  $('#city').html(city + ', ');
  $('#region').html(region + ' - ');
  $('#country').html(country);

}



});
