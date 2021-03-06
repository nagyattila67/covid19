//api documentáció: https://www.chartjs.org/docs/latest/getting-started/

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

import { chartLabels, chartData, selectDataType, myIndex } from '/card.js'


export const myChartFunction = () => {
    clearCanvas();

    const labels = chartLabels.slice();
    const data = {
        labels: labels,
        datasets: [{
            label: 'Egyáltalán nem unalmas a karantén, csak azt nem értem, hogy lehet az egyik tasakban 8967 szem rizs, míg a másikban csak 8856.',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 0,
            data: chartData,
            pointStyle: 'circle',
        }]
    };


    const config = {
        type: 'line',
        data,
        options: {}
    };


    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

export const clearCanvas = () => {
    const place = document.querySelector('#divForCanvas');
    if (document.querySelectorAll('#divForCanvas').length > 0) {
        place.innerHTML = "";
    }

    place.insertAdjacentHTML('afterbegin', `
    <div id="divForCanvas" style="display:flex; flex-direction:row; align-items:center; gap:10px;";>
    <h2 id="myChartTitle"></h2>
    <div>
    <input ${myIndex == 0 ? 'checked' : ''}
    type="radio" name="canvas-input" id="confirmed-canvas">
    <label for="confirmed-canvas">megbetegedések</label>
    </div>
    <div>
    <input ${myIndex == 1 ? 'checked' : ''}
    type="radio" name="canvas-input" id="deaths-canvas">
    <label for="deaths-canvas">elhalálozások</label>
    </div>
    <div>
    <input ${myIndex == 2 ? 'checked' : ''}
    type="radio" name="canvas-input" id="recovered-canvas">
    <label for="recovered-canvas">gyógyult esetek</label></div>
    </div>
    </div>
    <canvas id="myChart"></canvas>
    `)



    const places = document.querySelectorAll("input[name='canvas-input']")
    places.forEach((value) => {
        value.addEventListener('input', () => { selectDataType() })
    })

}

export const clearCanvas2 = (myHeight, myWidth) => {
    const place = document.querySelector('#containerForCanvasSecond');
    place.innerHTML = "";
    place.insertAdjacentHTML('afterbegin', `
    <canvas id="myChartSecond" height="${myHeight}" width="${myWidth}"></canvas>
    `)
}

export const myChartFunction2 = (myLabels, myData, myDate) => {

    const actions = [
        {
            name: 'Title Position: start',
            handler(chart) {
                chart.options.plugins.legend.align = 'start';
                chart.options.plugins.legend.title.position = 'start';
                chart.update();
            }
        },
        {
            name: 'Title Position: center (default)',
            handler(chart) {
                chart.options.plugins.legend.align = 'center';
                chart.options.plugins.legend.title.position = 'center';
                chart.update();
            }
        },
        {
            name: 'Title Position: end',
            handler(chart) {
                chart.options.plugins.legend.align = 'end';
                chart.options.plugins.legend.title.position = 'end';
                chart.update();
            }
        },
    ];

    const labels = myLabels;
    const date = myDate;

    const data = {
        labels: labels,
        datasets: [{
            label: `frissítve: ${date}`,
            data: myData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            barThickness: 'flex',
            scaleSteps: 1,
            scaleStepWidth: 100,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    title: {
                        display: true,
                        //text: 'Legend Title',
                    },
                    align: 'start',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        },
    };

    var myChart = new Chart(
        document.getElementById('myChartSecond'),
        config
    );
}
