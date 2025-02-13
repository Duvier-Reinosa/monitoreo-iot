'use client';

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
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import socket from 'socket.io-client'

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
      text: '',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



function Linechart() {
  const socketIo = socket('http://localhost:3033');

  useEffect(() => {
  }, []);
  
  socketIo.connect().on('logValue', (data:any) => {
    console.log(data);
  });
    


    return (
        <div className='mt-100 w-2/3'>
            <h1 className='font-bold text-4xl m-auto w-52'>Monitor IoT</h1>
            <Line options={options} data={data} />
        </div>
    )
}

export default Linechart