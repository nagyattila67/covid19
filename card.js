let id_Inf = 0;
let id_Vacc = 0;

export const addCardInf = (country, date, covidArray) => {
    //covidArray: [confirmedInfo,deathsInfo,recoveredInfo]
    const cardContainer = document.querySelector("#card-container");
    console.log("country", country);
    console.log("date", `${date}`)
    console.log("www", covidArray[0].All.dates[`${date}`])
    const confirmed = covidArray[0].All.dates[`${date}`]
    const deaths = covidArray[1].All.dates[`${date}`]
    const recovered = covidArray[2].All.dates[`${date}`];
    const population = covidArray[0].All.population;
    const percentage1=(confirmed*100/population).toFixed(1);
    const percentage2=(deaths*100/population).toFixed(1);
    const percentage3=(recovered*100/population).toFixed(1);
    cardContainer.insertAdjacentHTML('afterbegin', `<na92-card title='${country}' id='card${id_Inf}'
    class='card-content'>
    <h2>${date}-ig</h2>
    <div>${confirmed} megbetegedés - ${percentage1} %</div>
    <div>${deaths} elhunyt - ${percentage2} %</div>
    <div>${recovered} gyógyult - ${percentage3} %</div>
    <div>népesség: ${population} fő</div>
    <div><button class='card-button' id='button${id_Inf}'>töröl</button></div>
    </na92-card>`);

    const myId = id_Inf;

    document.querySelector(`#button${id_Inf}`).addEventListener('click', () => {
        const place = document.querySelector("#card-container")
        const sector = document.querySelector(`#card${myId}`);
        place.removeChild(sector);
    })

    id_Inf++;
}

export const addCardVacc = (country, vaccineInfo) => {
    const cardContainer = document.querySelector("#card-container");
    let date=vaccineInfo.All.updated;
    date=date.split(' ');
    date=date[0];
    const partiallyVaccinated = vaccineInfo.All.people_partially_vaccinated;
    const vaccinated = vaccineInfo.All.people_vaccinated;
    const population = vaccineInfo.All.population;
    const percentage1 = (partiallyVaccinated * 100 / population).toFixed(1);
    const percentage2 = (vaccinated * 100 / population).toFixed(1);
    console.log("percentage",percentage1)

    cardContainer.insertAdjacentHTML('afterbegin', `<na92-card title='${country}' id='card${id_Vacc}'
    style='background-color:#ffd2da'>
    <h2>${date}-ig</h2>
    <div>${partiallyVaccinated} részl. oltott - ${percentage1} %</div>
    <div>${vaccinated} oltott - ${percentage2} %</div>
    <div>népesség: ${population} fő</div>
    <div><button class='card-button' id='button${id_Vacc}'>töröl</button></div>
    </na92-card>`);

    const myId = id_Vacc;

    document.querySelector(`#button${id_Vacc}`).addEventListener('click', () => {
        const place = document.querySelector("#card-container")
        const sector = document.querySelector(`#card${myId}`);
        place.removeChild(sector);
    })

    id_Vacc++;
}



