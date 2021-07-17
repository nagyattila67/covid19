import { CategoryScale } from "chart.js";
import { mergeMap } from "rxjs/operators";

const loadInfo = async (country, status) => {
    const response = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}`)
    if (response.status !== 200) { throw `Error loading ${status}-info` }
    const jsonResponse = await response.json();
    console.log(status, country, jsonResponse);
    return jsonResponse;
}

export const loadDataInf = async () => {
    const country = document.querySelector(".select-container .country-select").value;
    try {
        const confirmedInfo = await loadInfo(country, "confirmed");
        const deathsInfo = await loadInfo(country, "deaths");
        const recoveredInfo = await loadInfo(country, "recovered");
        return [confirmedInfo, deathsInfo, recoveredInfo];
    } catch (e) {
        console.log('Error loading dataInf')
        throw e
    }
}

export const loadDataVacc = async () => {
    const country = document.querySelector(".select-container .country-select").value;
    try {
        const response = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`)
        if (response.status !== 200) { throw 'Error loading vaccines-data' }
        const jsonResponse = await response.json();
        console.log(status, country, jsonResponse);
        return jsonResponse;
    } catch (e) {
        console.log('Error loading dataVacc')
        throw e
    }
}

export const loadAllCountriesData = async (status) => {
    try {
        const response = await fetch(`https://covid-api.mmediagroup.fr/v1/history?status=${status}`);
        if (response.status !== 200) { throw 'Error loading all-countries-data' };
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (e) {
        console.log('Error loading allCountriesData')
    }
}

export const loadAllVaccinesData = async () => {
    try {
        const response = await fetch('https://covid-api.mmediagroup.fr/v1/vaccines');
        if (response.status !== 200) { throw 'Error loading all-vaccines-data' };
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (e) {
        console.log('Error loading allVaccinesData')
    }
}
