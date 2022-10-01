/**
 * Created by yurynistratau on 30.09.22.
 */

import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';

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

    connectedCallback() {
        this.isValidData = true;
        // this.city = city;
        // this.getCallback();
        console.log(this.city)
        console.log(this.weatherIcon)
    }

}