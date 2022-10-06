/**
 * Created by yurynistratau on 29.09.22.
 */

import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWeatherForecast from '@salesforce/apex/WeatherForecastController.getWeatherForecast';


export default class WeatherForecast extends LightningElement {

    city;
    isValidData;
    isLoaded;
    sendData;

    connectedCallback() {
        this.isValidData = true;
        this.isLoaded = true;
        this.city = 'Minsk';
        this.getCallback();
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.isLoaded = true;
            this.city = evt.target.value;
            this.getCallback();
        }
    }

    getCallback() {
        getWeatherForecast({city: this.city})
            .then(data => {
                if (!data.length) {
                    this.isValidData = false;
                    this.isLoaded = false;
                    this.template.querySelector('.slds-form-element').classList.add('slds-has-error');
                } else {
                    const newData = [];
                    newData.push(data[0]);
                    for (let item of data) {
                        if ((item.dt_txt.substr(0, 10) !== newData[0].dt_txt.substr(0, 10)) && (item.dt_txt.substr(11, 8) === '15:00:00')) {
                            newData.push(item);
                        }
                    }

                    this.sendData = newData.map((item, index) => {
                        return {
                            key: index,
                            date: item.dt_txt.substr(0, 10),
                            weatherIcon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                            weatherDescription: item.weather[0].description,
                            temperature: `${Math.round(item.main.temp)}°C `,
                            wind: `Wind speed: ${Math.round(item.wind.speed)} m/s`,
                            humidity: `Humidity: ${Math.round(item.main.humidity)}%`,
                        };
                    })

                    this.isValidData = true;
                    this.isLoaded = false;
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