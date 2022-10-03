/**
 * Created by yurynistratau on 3.10.22.
 */

@isTest
global class WeatherForecastControllerMock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"weather": {"id":2, "name":"Test"}}');
        response.setStatusCode(200);
        return response;
    }
}