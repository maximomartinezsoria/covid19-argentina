<script>
    import { afterUpdate } from 'svelte'
    import { probabilityData, chartOptions } from '../store';
    import Chart from 'chart.js';
    import 'chartjs-plugin-zoom';

    function renderChart() {
        const ctx = document.querySelector('#probabilityChart').getContext('2d');

        if(window.outerWidth > 500) { 
            ctx.canvas.width = 900;
            ctx.canvas.height = 400;
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: $probabilityData.confirmed.map(({date}) => date),
                datasets: [
                    {
                        label: 'Confirmados',
                        data: $probabilityData.confirmed.map(({cases}) => cases),
                        borderColor: '#F7C948',
                    },
                    {
                        label: 'Recuperados',
                        data: $probabilityData.recovered.map(({cases}) => cases),
                        borderColor: '#3EBD93',
                    },
                    {
                        label: 'Muertes',
                        data: $probabilityData.deaths.map(({cases}) => cases),
                        borderColor: '#E12D39',
                    },
                ]
            },
            ...chartOptions
        })
    }

    afterUpdate(renderChart)
</script>

<div class="container pb-12 md:pb-24">
    <h3 class="text-center text-2xl mb-10 font-medium"><span class="text-primary">Probabilidad</span> de Avance</h3>
    <canvas id="probabilityChart" height="1024" width="640"></canvas>
</div>