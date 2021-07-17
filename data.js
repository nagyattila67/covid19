export const makeChartDatas = (myObject, myDate) => {
    console.log(myObject)
    const chartLabels = Array();
    const chartData = Array();
    const countries = Object.keys(myObject);
    countries.forEach((value, index) => {
        chartLabels[index] = value;
        const people = myObject[`${chartLabels[index]}`].All.dates[`${myDate}`];
        const population = myObject[`${chartLabels[index]}`].All.population;
        let percentage = Math.ceil(people * 100 / population);
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
console.log(chartLabels2, chartData2)
    return [chartLabels2, chartData2];
}