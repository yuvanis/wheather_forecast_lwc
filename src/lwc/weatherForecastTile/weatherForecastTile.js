/**
 * Created by yurynistratau on 30.09.22.
 */

import { LightningElement, api } from 'lwc';

export default class WeatherForecastTile extends LightningElement {

    @api city;
    @api currentDate;
    @api isValidData;
    @api temperature;
    @api wind;
    @api humidity;
    @api weatherDescription;
    @api weatherIcon;
    @api orgDate;
    @api order;
    @api newData;

    @api
    renderTiles(newData, i) {
        this.currentDate = newData[i].dt_txt.substr(0, 10);
        this.weatherIcon = `https://openweathermap.org/img/w/${newData[i].weather[0].icon}.png`;
        this.weatherDescription = newData[i].weather[0].description;
        this.temperature = `${Math.round(newData[i].main.temp)}°C `;
        this.wind = `Wind speed: ${Math.round(newData[i].wind.speed)} m/s`;
        this.humidity = `Humidity: ${Math.round(newData[i].main.humidity)}%`;
    }

}