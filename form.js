import '/styles.css'
import { countries } from '/select.js'
import { loadDataInf } from '/load.js'
import { loadDataVacc } from '/load.js'
import { addCardInf, addCardVacc } from './card';
//const list = countries;
export const initForm = () => {
    const radioButton = document.querySelectorAll('.form-item-radio');
    radioButton.forEach((value) => {
        value.addEventListener('input', radioEvent);
    })

    const selectContainer = document.querySelector(".select-container");
    selectContainer.insertAdjacentHTML('afterbegin', countries);
    const datePicker = document.querySelector("#date-input");
    let now = new Date();
    console.log("now", now)
    console.log("hello")
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
    datePicker.max = `${dateString}`;
    datePicker.min = '2020-01-22';

    const form = document.querySelector("#form");
    const cardContainer = document.querySelector("#card-container");
    const errorMessage = document.querySelector('#error-message');
    const loadButton = document.querySelector('#load-button');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loadButton.disabled=true;
        cardContainer.insertAdjacentHTML('afterbegin',
            `<div class='loader' id='loader'></div>`)
        if (document.querySelector("#inf").checked == true) {
            const date = document.querySelector("#date-input").value;
            const country = document.querySelector("#country-select").value;
            try {
                const covidArray = await loadDataInf();
                console.log("!!", covidArray);
                addCardInf(country, date, covidArray)
            } catch (e) {
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none'
                }, 4000)
            }
        }
        if (document.querySelector("#vacc").checked == true) {
            const country = document.querySelector("#country-select").value;
            const vaccineInfo = await loadDataVacc();
            console.log(vaccineInfo)
            addCardVacc(country, vaccineInfo);
        }
        cardContainer.removeChild(document.querySelector("#loader"));
        loadButton.disabled=false;
    })
}



const radioEvent = () => {
    if (document.querySelector('#inf').checked == true) {
        document.querySelector('#date-input').disabled = false;
    }
    if (document.querySelector('#vacc').checked == true) {
        document.querySelector('#date-input').disabled = true;
    }
}
