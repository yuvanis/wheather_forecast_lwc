/**
 * Created by yurynistratau on 29.09.22.
 */

public with sharing class WeatherForecastController {

    @AuraEnabled(cacheable=true)
    public static List<Object> getWeatherForecast(String city) {

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openweathermap.org/data/2.5/forecast?appid=31751ec93505f194aac4d9ccca3b1fff&q='+city+'+&cnt=32&units=metric');
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        List<Object> resultsList = new List<Object>();

        if (response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            resultsList = (List<Object>)(results.get('list'));
        }
        return resultsList;
    }

}