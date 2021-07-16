import { mergeMap } from "rxjs/operators";

const loadInfo = async (country, status) => {
    const response = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}`)
    if (response.status !== 200) { throw `Error loading ${status}-info` }
    const jsonResponse = await response.json();
    console.log(status, country, jsonResponse);
    return jsonResponse;
}

export const loadDataInf = async () => {
    const country = document.querySelector("#country-select").value;
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
    const country = document.querySelector("#country-select").value;
    try {
        const response = await fetch(`https://covid-api.mmediagroup.fr/v1//vaccines?country=${country}`)
        if (response.status !== 200) { throw 'Error loading vaccines-data' }
        const jsonResponse = await response.json();
        console.log(status, country, jsonResponse);
        return jsonResponse;
    } catch (e) {
        console.log('Error loading dataVacc')
        throw e
    }
}
