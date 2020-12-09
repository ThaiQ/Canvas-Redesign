import React, {useEffect,useState} from 'react';
import {courses} from '../Config/data'
const Chart = require('chart.js')
export default function Graph() {

    Chart.defaults.global.defaultFontColor = 'rgb(238, 238, 238)';
    Chart.defaults.global.animation.duration = 2000;
    Chart.defaults.global.legend.display = false;

    const [course, setCourse] = useState(courses)
    const [color, setColor] = useState(randColor(0.2))
    const [bcolor, bsetColor] = useState(randColor(0.8))

    useEffect(()=>{
        randColor()
    },[])

    function getName(){
        let array = []
        for (let i = 0 ; i<course.length; i++){
            array[i]=course[i].text
        }
        return array
    }

    function randColor(opacity){
        let color = [
            `rgba(255, 99, 132, ${opacity})`,
            `rgba(54, 162, 235, ${opacity})`,
            `rgba(255, 206, 86, ${opacity})`,
            `rgba(75, 192, 192, ${opacity})`,
            `rgba(153, 102, 255,${opacity})`,
            `rgba(255, 159, 64, ${opacity})`
        ]
        let ind = Math.floor(Math.random() * color.length);
        return color[ind]
    }

    useEffect(()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['8/12','9/14','12/12'],
                datasets: [{
                    data: [95, 40, 30, 80, 70, 90],
                    backgroundColor: [
                        color
                    ],
                    borderColor: [
                        bcolor
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