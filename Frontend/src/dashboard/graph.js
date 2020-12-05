import React, {useEffect,useState} from 'react';
import {courses} from '../Config/data'
const Chart = require('chart.js')
export default function Graph() {

    Chart.defaults.global.defaultFontColor = 'rgb(238, 238, 238)';
    Chart.defaults.global.animation.duration = 2000;
    Chart.defaults.global.legend.display = false;

    const [course, setCourse] = useState(courses)

    function getName(){
        let array = []
        for (let i = 0 ; i<course.length; i++){
            array[i]=course[i].text
        }
        return array
    }

    useEffect(()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: getName(),
                datasets: [{
                    data: [95, 40, 30, 80, 70, 90],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Grade',
                    fontColor: 'white',
                    fontSize: 20,
                },
                legend:{
                    labels: {fontColor: 'rgb(238, 238, 238)'},
                    data: {fontColor: 'rgb(238, 238, 238)'}
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        fontColor: 'rgb(238, 238, 238)',
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
    },[])

    return <canvas id='myChart'></canvas>
}