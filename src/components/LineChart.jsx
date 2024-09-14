import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ resultados }) => {
    // Extrae los datos de ingresos, costos y ganancias de los resultados
    const años = resultados.map(resultado => resultado.año);
    const ingresos = resultados.map(resultado => resultado.ingresos !== undefined ? resultado.ingresos : 0);
    const costos = resultados.map(resultado => resultado.costos !== undefined ? resultado.costos : 0);
    const ganancias = resultados.map(resultado => resultado.ganancias !== undefined ? resultado.ganancias : 0);

    // Configuración de la gráfica
    const midata = {
        labels: años,
        datasets: [
            {
                label: 'Ingresos',
                data: ingresos,
                tension: 0.5,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 3,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'Costos',
                data: costos,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(54, 162, 235)',
                pointBackgroundColor: 'rgba(54, 162, 235)',
            },
            {
                label: 'Ganancias',
                data: ganancias,
                tension: 0.5,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(75, 192, 192)',
                pointBackgroundColor: 'rgba(75, 192, 192)',
            },
        ],
    };

    const misoptions = {
        scales: {
            y: {
                min: 0,
                title: {
                    display: true,
                    text: 'Valor'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Año'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        }
    };

    return <Line data={midata} options={misoptions} />;
};

export default LineChart;
