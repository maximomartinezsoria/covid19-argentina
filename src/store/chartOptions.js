const chartOptions = {
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    padding: 5
                }
            }],
        },
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                boxWidth: 25,
                fontColor: 'black'
            }
        },
        layout: {
            padding: {
                right: 30,
            }
        },
        tooltips: {
            backgroundColor: '#243B53',
            titleFontSize: 16,
            titleMarginBottom: 15,
            bodyFontSize: 13,
            bodySpacing: 15,
            mode: 'x',
            position: 'nearest'
        },
        elements: {
            line: {
                borderWidth: 5,
                fill: false
            },
            point: {
                radius: 7,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 9,
                hoverBorderWidth: 4
            },
        },
        pan: {
            enabled: true,
            mode: "xy",
            speed: 6,
            threshold: 10
        },
        zoom: {
            enabled: true,
            drag: false,
            mode: "xy",
            limits: {
                max: 5,
                min: 100
            }
        }      
    },
}

export default chartOptions;