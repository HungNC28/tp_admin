import React, { useEffect, useState } from 'react';
import { ONE_DAY, date } from '../../Utils/time';
import { COLOR_CHART } from '../../Utils/color'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Bar Chart',
        },
        datalabels: {
            color: '#fff',
            formatter: (value, ctx) => {
                return value.toLocaleString('vi-VN')
            },
        }
    },
};

export default function BarChart(props) {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        if (!props.docs) return;
        const labels = [date(Date.now() - 30 * ONE_DAY) + "-" + date(Date.now())]
        const datasets = [];
        props.docs.map((d, i) => {
            const obj = {
                label: d.name,
                data: [+d.total_month === 0 ? "" : d.total_month],
                backgroundColor: COLOR_CHART[i]
            }
            datasets.push(obj)
            return d;
        })
        let obj = {
            labels, datasets
        }
        setData({ ...obj })
    }, [props])

    return <div className='flex items-center justify-between chart-item w-[96%] m-[2%]'>
    <Bar options={options} data={data} />
  </div>
}