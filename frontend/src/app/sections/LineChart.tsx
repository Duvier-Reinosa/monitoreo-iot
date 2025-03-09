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
import axios from 'axios';
import Loading from '../components/loading/Loading';
import moment from 'moment';

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

function Linechart() {
    const [isLoading, setIsLoading] = useState(true);
    const [labels, setLabels] = useState(['', '', '', '', '', '', '', '', '', '']);
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

    const fetchData = async () => {
        try {
            const response = await axios.get('http://143.198.31.104:3033/api/agent/lastLogs');
            const logs = response.data;

            const data = logs.reverse().map((log: { log_value: number }) => log.log_value);
            const localLabels = logs.map((log: { log_time: string }) => moment(log.log_time).subtract(5, 'hours').format('MM-DD HH:mm:ss'));
            setChartData((prevData) => {
                return {
                    ...prevData,
                    labels: localLabels,
                    datasets: [{ ...prevData.datasets[0], label: logs[0]?.agent_name || '', data }],
                };
            });
            setLabels(localLabels);
            setIsLoading(false);
        } catch (error) {
            console.error('🔴 Error al obtener los logs:', error);
            alert('Error al obtener los logs');
        }
    }


    useEffect(() => {
        fetchData();
        const socket = socketIOClient('http://143.198.31.104:3033');

        socket.on('logValue', (data: { agent_name: string; log_value: number }) => {
            console.log('📢 Nuevo log recibido:', data);
            const newLabel = moment().format('MM-DD HH:mm:ss');
            setChartData((prevData) => {
                const newData = [...prevData.datasets[0].data, data.log_value].slice(-9);
                return {
                    ...prevData,
                    labels: [...prevData.labels, newLabel].slice(-9),
                    datasets: [{ ...prevData.datasets[0], label: data.agent_name, data: newData }],
                };
            });
        });

        return () => {
            socket.disconnect(); // 🔥 Importante: Cerrar la conexión al desmontar el componente
        };
    }, []);

    if (isLoading) {
        return (
            <div className='mt-100 w-2/3'>
                <h1 className='font-bold text-4xl m-auto w-52'>Monitor IoT</h1>
                <Loading />
            </div>
        )
    }

    return (
        <div className='mt-100 w-2/3'>
            <h1 className='font-bold text-4xl m-auto w-52'>Monitor IoT</h1>
            <Line options={options} data={chartData} />
        </div>
    );
}

export default Linechart;
