/**
 * Created by yurynistratau on 3.10.22.
 */

@isTest
private class WeatherForecastControllerTest {
    static testMethod void testPostCallout() {
        Test.setMock(HttpCalloutMock.class, new WeatherForecastControllerMock());
        List<Object> resultsList = WeatherForecastController.getWeatherForecast('Minsk');
    }
}