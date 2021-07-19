export const makeChartDatas = (myObject, myDate, config) => {
    const chartLabels = Array();
    const chartData = Array();
    const countries = Object.keys(myObject);
    let dataDate = myDate;
    if (config == "people_vaccinated" || config == "people_partially_vaccinated"){
        dataDate = myObject.Afghanistan.All.updated;  
    };
    countries.forEach((value, index) => {
        chartLabels[index] = value;
        let people = "";
        if (config == "people_vaccinated") {
            people = myObject[`${chartLabels[index]}`].All.people_vaccinated;
        }
        if (config == "people_partially_vaccinated") {
            people = myObject[`${chartLabels[index]}`].All.people_partially_vaccinated;
        }
        if (config == undefined) {
            people = myObject[`${chartLabels[index]}`].All.dates[`${myDate}`];
        }
        const population = myObject[`${chartLabels[index]}`].All.population;
        let percentage = people * 100 / population
        chartData[index] = percentage;
    })
    const chartLabels2 = Array();
    const chartData2 = Array();

    chartData.forEach((value, index) => {
        if (isNaN(value) == false) {
            chartLabels2[chartLabels2.length] = chartLabels[index];
            chartData2[chartData2.length] = value;
        }
    })
    return [chartLabels2, chartData2, dataDate];
}