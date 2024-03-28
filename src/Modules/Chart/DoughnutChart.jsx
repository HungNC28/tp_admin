import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = props?.data?.datasets[0]?.data;
          dataArr.forEach(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2)
          if(percentage > 5) return percentage + "%";
          else return ""
        },
        color: '#fff',
      }
    },
    tooltips: {
      enabled: false
    },
  };

  return <div className='chart-item w-full m-4'>
    <Doughnut className='w-full' data={props.data} options={options} />
  </div>

}

export default DoughnutChart

