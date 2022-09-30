/**
 * Created by yurynistratau on 29.09.22.
 */

import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';


export default class WeatherForecast extends LightningElement {

    @api temperature;
    @api wind;
    @api humidity;
    @api weatherDescription;
    @api weatherIcon;
    @api orgDate;
    @api isValidData;
    @track city;

    connectedCallback() {
        this.city = 'Minsk';
        this.isValidData = true;
        this.getCallback();
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.city = evt.target.value;
            this.getCallback();
        }
    }

    getCallback(){
        getWeatherForecast({city: this.city})
            .then(data => {
                if (data.temperature === undefined) {
                    this.isValidData = false;
                    this.template.querySelector('.slds-form-element').classList.add('slds-has-error');
                } else {
                    console.log(data.orgDate);
                    this.weatherIcon = `https://openweathermap.org/img/w/${data.weatherDescription[0].icon}.png`;
                    this.weatherDescription = data.weatherDescription[0].description;
                    this.temperature = `${Math.round(data.temperature)}°C `;
                    this.wind = `Wind speed: ${Math.round(data.wind)} m/s`;
                    this.humidity = `Humidity: ${Math.round(data.humidity)}%`;
                    this.orgDate = data.orgDate;
                    this.isValidData = true;
                    this.template.querySelector('.slds-form-element').classList.remove('slds-has-error');
                }

            })
            .catch(error => {
                    new ShowToastEvent({
                        title: "Error",
                        message: 'Invalid data',
                        variant: "error",
                    });
                }
            )
    }

}