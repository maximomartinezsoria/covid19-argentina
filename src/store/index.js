import { readable } from 'svelte/store'
import chartOptions from './chartOptions'

const data = readable({confirmed: [], deaths: [], recovered: []}, async function(set) {
    const endpoints = [
        'https://api.covid19api.com/total/country/argentina/status/confirmed',
        'https://api.covid19api.com/total/country/argentina/status/deaths',
        'https://api.covid19api.com/total/country/argentina/status/recovered'
    ];
    
    let dataFormated = [];

    Promise.all(endpoints.map(url => fetch(url).then(response => response.json())))
    .then(responses => {
        responses.map(value => {
            dataFormated[value[0].Status] = value.slice(38, value.length).map(data => {
                const dateObject = new Date(data.Date);
                dateObject.setDate(dateObject.getDate()+1);
                const date = new Intl.DateTimeFormat('es-AR', { month: 'long', day: 'numeric' }).format(dateObject);
                
                return {
                    date,
                    cases: data.Cases,
                    rawDate: data.Date
                }
            });
        });

        set({ 
            confirmed: dataFormated['confirmed'],
            deaths: dataFormated['deaths'],
            recovered: dataFormated['recovered'],
         })
    });
});

const translations = Object.entries({
    confirmed: 'Confirmados',
    recovered: 'Recuperados',
    deaths: 'Muertes',
});

const total = readable(null, async function(set) {
    data.subscribe(data => {
        if(data.confirmed.length > 0) {   
            let dataFormated = [];

            Object.entries(data).forEach(([label, number]) => {
                const translation = translations.map(([english, spanish]) => english == label ? spanish : '').join('');
                dataFormated[translation] = number.reduce((accumulator, currentValue) => currentValue.cases)
            })

            set(dataFormated);
        }
    });  

});

const probabilityData = readable({confirmed: [], deaths: [], recovered: []}, async function(set) {
    const calcProbabilityFactor = values => {
        const length = values.length;
        const lastValue = length - 1;
        const prevLastValue = length - 2;
    
        return values[lastValue].cases / values[prevLastValue].cases;
    }

    const calcProbability = (data) => {
        const factor = calcProbabilityFactor(data);

        let calcData = [];
        calcData[0] = {
            cases: data[data.length - 1].cases,
            date: data[data.length - 1].date,
            rawDate: new Date(data[data.length - 1].rawDate)
        }
    
        for(let i = 1; i <= 15; i++) {
            const rawDate = new Date(calcData[i - 1].rawDate);
            if(i === 1) rawDate.setDate(rawDate.getDate() + 1);
            rawDate.setDate(rawDate.getDate() + 1);

            calcData[i] = {
                cases: (calcData[i - 1].cases * factor).toFixed(0),
                date: new Intl.DateTimeFormat('es-AR', { month: 'long', day: 'numeric' }).format(rawDate),
                rawDate,
            }
        }

        return calcData;
    }


    data.subscribe(data => {
        if(data.confirmed.length > 0) {
            set({ 
                confirmed: calcProbability(data.confirmed),
                deaths: calcProbability(data.deaths),
                recovered: calcProbability(data.recovered)
             })
        }
    });  
});

export { data, total, probabilityData, chartOptions }