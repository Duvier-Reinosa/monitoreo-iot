'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import socketIOClient from 'socket.io-client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Monitor IoT',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function Linechart() {
    const [chartData, setChartData] = useState({
        labels,
        datasets: [
            {
                label: 'Log Values',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    useEffect(() => {
        const socket = socketIOClient('http://localhost:3033');

        socket.on('logValue', (data: { agent_name: string; log_value: number }) => {
            console.log('📢 Nuevo log recibido:', data);

            setChartData((prevData) => {
                const newData = [...prevData.datasets[0].data, data.log_value].slice(-7);
                return {
                    ...prevData,
                    datasets: [{ ...prevData.datasets[0], data: newData }],
                };
            });
        });

        return () => {
            socket.disconnect(); // 🔥 Importante: Cerrar la conexión al desmontar el componente
        };
    }, []);

    return (
        <div className='mt-100 w-2/3'>
            <h1 className='font-bold text-4xl m-auto w-52'>Monitor IoT</h1>
            <Line options={options} data={chartData} />
        </div>
    );
}

export default Linechart;
