


import { myChartFunction } from '/myChart.js';
import '/styles.css'
import { countries } from '/select.js'
import { loadDataInf, loadDataVacc, loadAllCountriesData } from '/load.js'
import { addCardInf, addCardVacc } from './card';
import { makeChartDatas } from '/data.js'
import {myChartFunction2} from '/myChart.js'
//const list = countries;
export const initForm = () => {
    const radioButton = document.querySelectorAll('.form-item-radio');
    radioButton.forEach((value) => {
        value.addEventListener('input', radioEvent);
    })

    const selectContainer = document.querySelector(".select-container");
    selectContainer.insertAdjacentHTML('afterbegin', countries);

    const datePicker = document.querySelector("#date-input");
    const dateString = setTime();
    datePicker.value = `${dateString}`
    datePicker.max = `${dateString}`;
    datePicker.min = '2020-01-22';

    const form = document.querySelector("#form");
    const cardContainer = document.querySelector("#card-container");
    const errorMessage = document.querySelector('#error-message');
    const loadButton = document.querySelector('#load-button');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loadButton.disabled = true;
        const date = document.querySelector("#date-input").value;
        const country = document.querySelector(".select-container .country-select").value;
        cardContainer.insertAdjacentHTML('afterbegin',
            `<div class='loader' id='loader'></div>`);
        if (document.querySelector("#inf").checked == true) {
            try {
                const covidArray = await loadDataInf();
                console.log("!!", covidArray);
                addCardInf(country, date, covidArray)
            } catch (e) {
                console.log(e);
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none'
                }, 4000)
            }
        }
        if (document.querySelector("#vacc").checked == true) {
            try {
                const vaccineInfo = await loadDataVacc();
                console.log(vaccineInfo)
                addCardVacc(country, vaccineInfo);
            } catch (e) {
                console.log(e);
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none'
                }, 4000)
            }
        }
        cardContainer.removeChild(document.querySelector("#loader"));
        loadButton.disabled = false;
        myChartFunction();
        document.querySelector('#myChartTitle').innerHTML = `${country}`;
    })
}

let confirmedData = Object();
let deathsData = Object();
let recoveredData = Object();
let vaccinationData = Object();

export const initFormSecond = () => {
    const datePicker = document.querySelector("#date-input-second");
    const dateString = setTime();
    datePicker.value = `${dateString}`
    datePicker.max = `${dateString}`;
    datePicker.min = '2020-01-22';

    const form = document.querySelector('#form-second');
    const loadButton = document.querySelector('#load-button-second');
    const forSpinner = document.querySelector('#divForCanvasSecond');
    const errorMessage = document.querySelector('#error-message-second');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const date = document.querySelector('#date-input-second').value;
        loadButton.disabled = true;
        forSpinner.insertAdjacentHTML('afterbegin',
            `<div class='loader' id='loader'></div>`);
        try {
            if (document.querySelector('#infectionSecond').checked == true) {
                if (confirmedData.Afghanistan == undefined) {
                    confirmedData = await loadAllCountriesData('confirmed');
                    //await console.log(confirmedData);
                    const myArray = await makeChartDatas(confirmedData,date);
                    myChartFunction2(myArray[0],myArray[1]);
                }
            }
            if (document.querySelector('#deathsSecond').checked == true) {
                if (deathsData.Afghanistan == undefined) {
                    deathsData = await loadAllCountriesData('deaths');
                    //await console.log(deathsData);
                    const myArray = await makeChartDatas(deathsData,date);
                    myChartFunction2(myArray[0],myArray[1]);
                }
            }
            if (document.querySelector('#recoveredSecond').checked == true) {
                if (recoveredData.Afghanistan == undefined) {
                    recoveredData = await loadAllCountriesData('recovered');
                    await console.log(recoveredData);
                }
            }
            if (document.querySelector('#vaccinatedSecond').checked == true) {
                if (vaccinationData.Afghanistan == undefined) {
                    vaccinationData = await loadAllCountriesData('confirmed');
                    await console.log(vaccinationData);
                }
            }
        } catch (e) {
            console.log(e);
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none'
            }, 4000)
        }

        forSpinner.removeChild(document.querySelector("#loader"));
        loadButton.disabled = false;
    })
}

const setTime = () => {
    let now = new Date();
    console.log("now", now)
    const since1970 = now.getTime();
    //két nappal visszaállítom a naptárat
    const lastTwoDays = 2 * 24 * 60 * 60 * 1000;
    now.setTime(since1970 - lastTwoDays);

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    console.log("day", day)
    const dateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
    console.log(dateString);
    return dateString;
}

const radioEvent = () => {
    if (document.querySelector('#inf').checked == true) {
        document.querySelector('#date-input').disabled = false;
    }
    if (document.querySelector('#vacc').checked == true) {
        document.querySelector('#date-input').disabled = true;
    }
}
