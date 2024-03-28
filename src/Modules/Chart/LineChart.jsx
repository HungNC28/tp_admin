import React, { useEffect, useState } from 'react';
import sharedService from "../../Services/SharedService";
import {
  Chart as LChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

LChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale
);

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
      formatter: () => "",
      color: '#fff',
    }
  }
};

const LineChart = (props) => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    const zone_id = 'GI3K8ROF'
    sharedService.getTotalMonth({ zone_id }).then(res => {
      const doc = res.data
      setData({...doc})
    }).catch(err => console.log(err))
  }, [])


  return <div className='chart-item w-[94%] m-[3%]'>
    <Line className='m-auto w-full' options={options} data={data} />
  </div>
}

export default LineChart