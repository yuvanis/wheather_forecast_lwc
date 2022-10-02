/**
 * Created by yurynistratau on 29.09.22.
 */

import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';


export default class WeatherForecast extends LightningElement {

    @api currentDate;
    @api city;
    @api isValidData;
    @api temperature;
    @api wind;
    @api humidity;
    @api weatherDescription;
    @api weatherIcon;

    connectedCallback() {
        this.isValidData = true;
        this.city = 'Minsk';
        this.getCallback();
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.city = evt.target.value;
            this.getCallback();
        }
    }

    getCallback() {
        getWeatherForecast({city: this.city})
            .then(data => {
                if (data.length === 0) {
                    this.isValidData = false;
                    this.template.querySelector('.slds-form-element').classList.add('slds-has-error');
                } else {
                    const newData = [];
                    newData.push(data[0]);
                    for (let item of data) {
                        if ((item.dt_txt.substr(0, 10) !== newData[0].dt_txt.substr(0, 10)) && (item.dt_txt.substr(11, 8) === '15:00:00')) {
                            newData.push(item);
                        }
                    }
                    const childComponents = this.template.querySelectorAll('c-weather-forecast-tile');
                    for (let i = 0; i < childComponents.length; i++) {
                        childComponents[i].renderTiles(newData, i);
                    }
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