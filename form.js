


import { myChartFunction } from '/myChart.js';
import '/styles.scss'
import { countries } from '/select.js'
import { loadDataInf, loadDataVacc, loadAllCountriesData, loadAllVaccinesData } from '/load.js'
import { addCardInf, addCardVacc } from './card';
import { makeChartDatas } from '/data.js'
import { myChartFunction2, clearCanvas2 } from '/myChart.js'
//const list = countries;
export const initForm = () => {
    const radioButton = document.querySelectorAll('.form-item-radio');
    radioButton.forEach((value) => {
        value.addEventListener('input', radioEvent);
    })

    const sizeRadioButton = document.querySelectorAll("input[name='size-radio']");
    sizeRadioButton.forEach((value) => {
        value.addEventListener('input', sizeRadioEvent);
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
        if (country == "Dél-Karantén") {
            document.querySelector("#egg-container").style.display = "block";
            document.querySelector("#content-container").style.display = "none";
            loadButton.disabled = false;
        } else {
            document.querySelector("#egg-container").style.display = "none";
            document.querySelector("#content-container").style.display = "block";
            cardContainer.insertAdjacentHTML('afterbegin',
                `<div class='loader' id='loader'></div>`);
            if (document.querySelector("#inf").checked == true) {
                try {
                    const covidArray = await loadDataInf();
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
        }

    })

    const place = document.querySelectorAll("input[name='radio-second']");
    place.forEach((value) => {
        value.addEventListener('input', () => { radioSecondOninput() })
    })
}

const radioSecondOninput = () => {
    if (document.querySelector('#infectionSecond').checked == true ||
        document.querySelector('#deathsSecond').checked == true ||
        document.querySelector('#recoveredSecond').checked == true) {
        document.querySelector('#date-input-second').disabled = false;
    }
    if (document.querySelector('#partiallyVaccinatedSecond').checked == true ||
        document.querySelector('#vaccinatedSecond').checked == true) {
        document.querySelector('#date-input-second').disabled = true;
    }
}

let confirmedData = Object();
let deathsData = Object();
let recoveredData = Object();
let vaccinationData = Object();
let myArrayForCanvas1 = Object();
let myArrayForCanvas2 = Object();
let myArrayForCanvas3 = Object();
let myArray = Array();

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
        if (document.querySelector('#big-size').checked == true) {
            document.querySelector("#containerForCanvasSecond").style.width = "5000px";
            document.querySelector("#containerForCanvasSecond").style['max-height'] = "400px";
            clearCanvas2("400", "5000");
        }
        if (document.querySelector('#small-size').checked == true) {
            const myWidth = window.innerWidth;
            document.querySelector("#containerForCanvasSecond").style.width = `${myWidth}px`;
            document.querySelector("#containerForCanvasSecond").style['max-height'] = "400px";
            clearCanvas2("400", `${myWidth}`);
        }
        forSpinner.insertAdjacentHTML('afterbegin',
            `<div class='loader2' id='loader'></div>`);
        try {
            if (document.querySelector('#infectionSecond').checked == true) {
                if (confirmedData.Afghanistan == undefined) {
                    confirmedData = await loadAllCountriesData('confirmed');
                }
                myArray = await makeChartDatas(confirmedData, date);
                myArrayForCanvas1 = myArray[0];
                myArrayForCanvas2 = myArray[1];
                myArrayForCanvas3 = myArray[2];
            }
            if (document.querySelector('#deathsSecond').checked == true) {
                if (deathsData.Afghanistan == undefined) {
                    deathsData = await loadAllCountriesData('deaths');
                }
                myArray = await makeChartDatas(deathsData, date);
                myArrayForCanvas1 = myArray[0];
                myArrayForCanvas2 = myArray[1];
                myArrayForCanvas3 = myArray[2];
            }
            if (document.querySelector('#recoveredSecond').checked == true) {
                if (recoveredData.Afghanistan == undefined) {
                    recoveredData = await loadAllCountriesData('recovered');
                }
                myArray = await makeChartDatas(recoveredData, date);
                myArrayForCanvas1 = myArray[0];
                myArrayForCanvas2 = myArray[1];
                myArrayForCanvas3 = myArray[2];
            }
            if (document.querySelector('#partiallyVaccinatedSecond').checked == true) {
                if (vaccinationData.Afghanistan == undefined) {
                    vaccinationData = await loadAllVaccinesData();
                }
                myArray = await makeChartDatas(vaccinationData, date, 'people_partially_vaccinated');
                myArrayForCanvas1 = myArray[0];
                myArrayForCanvas2 = myArray[1];
                myArrayForCanvas3 = myArray[2];
            }
            if (document.querySelector('#vaccinatedSecond').checked == true) {
                if (vaccinationData.Afghanistan == undefined) {
                    vaccinationData = await loadAllVaccinesData();
                }
                myArray = await makeChartDatas(vaccinationData, date, 'people_vaccinated');
                myArrayForCanvas1 = myArray[0];
                myArrayForCanvas2 = myArray[1];
                myArrayForCanvas3 = myArray[2];
            }
            myChartFunction2(myArrayForCanvas1, myArrayForCanvas2, myArrayForCanvas3)
            document.querySelector('#border-second').scrollIntoView('top')
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
    const since1970 = now.getTime();
    //két nappal visszaállítom a naptárat
    const lastTwoDays = 2 * 24 * 60 * 60 * 1000;
    now.setTime(since1970 - lastTwoDays);

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
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

const sizeRadioEvent = () => {
    if (myArray.length != 0) {
        if (document.querySelector('#big-size').checked == true) {
            document.querySelector("#containerForCanvasSecond").style.width = "5000px";
            document.querySelector("#containerForCanvasSecond").style['max-height'] = "400px";
            clearCanvas2("400", "5000");
        }
        if (document.querySelector('#small-size').checked == true) {
            const myWidth = window.innerWidth;
            document.querySelector("#containerForCanvasSecond").style.width = `${myWidth}px`;
            document.querySelector("#containerForCanvasSecond").style['max-height'] = "400px";
            clearCanvas2("400", `${myWidth}`);
        }

        myChartFunction2(myArrayForCanvas1, myArrayForCanvas2, myArrayForCanvas3)
        document.querySelector('#border-second').scrollIntoView('top')
    }
}
