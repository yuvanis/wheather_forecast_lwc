/**
 * Created by yurynistratau on 29.09.22.
 */

public with sharing class WeatherForecastController {

    @AuraEnabled(cacheable=true)
    public static WeatherData getWeatherForecast(String city, Date currentDate) {

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q='+city+'+&lang=en&appid=31751ec93505f194aac4d9ccca3b1fff&units=metric');
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        WeatherData weather = new WeatherData();

        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> resultsMain = (Map<String, Object>)(results.get('main'));
            Map<String, Object> resultsWind = (Map<String, Object>)(results.get('wind'));

            weather.weatherDescription = results.get('weather');
            weather.temperature = String.valueOf(resultsMain.get('temp'));
            weather.wind = Decimal.valueOf((Double)resultsWind.get('speed'));
            weather.humidity = String.valueOf(resultsMain.get('humidity'));
            weather.orgDate = Date.today();

        }
        return weather;
    }

    public class WeatherData {
        @AuraEnabled
        public String temperature;
        @AuraEnabled
        public Object weatherDescription;
        @AuraEnabled
        public Decimal wind;
        @AuraEnabled
        public String humidity;
        @AuraEnabled
        public Date orgDate;
    }
}