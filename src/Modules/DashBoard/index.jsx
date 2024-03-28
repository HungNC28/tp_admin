import iconGroup from "../../Asset/icon/icon-group.svg"
import iconBox from "../../Asset/icon/icon-box.svg"
import iconRecord from "../../Asset/icon/icon-record.svg"
import iconSensor from "../../Asset/icon/icon-sensor.svg"
import BarChart from "../Chart/BarChart"
import DoughnutChart from "../Chart/DoughnutChart"
import TableComponent from "../Table/Table"
import { useEffect, useState } from "react"
import sharedService from "../../Services/SharedService"
import LoadingComponent from "../Layout/LoadingComponent"

const DashBoard = () => {
  const [docs, setDocs] = useState([]);
  const [total, setTotal] = useState({});
  const [pos, setPos] = useState({});
  const [loading, setLoading] = useState(true)

  const TotalBox = (data) => data.reduce((a, b) => a + b.boxs.length, 0)
  const TotalMetric = (data) => data.reduce((a, b) => a + b?.boxs?.reduce((t, s) => t + s.metrics.length, 0), 0)
  const TotalRecord = (data) => data.reduce((a, b) => a + b.total, 0)
  const TotalInputMonth = (data) => data.reduce((a, b) => a + b.total_month, 0)

  useEffect(() => {
    const zone_id = 'GI3K8ROF'
    sharedService.listStatistic({ zone_id }).then(res => {
      const result = res.data.filter(d => !d.dtime)
      setDocs(result);
      setTotal({
        box: TotalBox(result),
        metric: TotalMetric(result),
        record: TotalRecord(result)
      });
      setLoading(false)
    }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (!total || !total.record || docs.length === 0) return;
    let obj = {
      posMax: 0,
      totalMax: docs[0]?.total,
      posMin: 0,
      totalMin: docs[0]?.total
    }
    docs.forEach((d, i) => {
      if (d.total > obj.totalMax) {
        obj.totalMax = d.total;
        obj.posMax = i;
      }
      else if (obj.totalMin > d.total) {
        obj.posMin = i;
        obj.totalMin = d.total;
      }
    })
    setPos({ min: obj.posMin, max: obj.posMax })
  }, [total, docs])

  function ChartData() {
    const labels = docs.map(d => d.name);
    const datasets = [
      {
        label: 'Dung luong',
        data: docs.map(d => d.total),
        backgroundColor: [
          'black',
          'red',
          'blue',
          'brown',
          'gray',
          'pink',
          'orange',
          'green',
          'purple'
        ]
      }
    ];
    return { labels, datasets }
  }

  return <>
    <div className="Count grid grid-cols-4 text-white pb-10">
      <div className="card rounded px-6 py-4 mr-5 bg-[#6200ea]">
        <div className="flex items-center justify-between">
          <div className="card-label mb-2">
            <div className="text-3xl">{docs.length}</div>
            <div className="opacity-[.6]">Công Trình</div>
          </div>
          <div className="card-icon w-12 h-12 rounded-full bg-[#b596f6] flex items-center justify-center">
            <img className="w-8 h-8" src={iconGroup} alt="icon" />
          </div>
        </div>
        {/* <div className="text-xs">Tang 1 so voi thang truoc</div> */}
      </div>
      <div className="card rounded px-6 py-4 mx-5 bg-[#ffb300]">
        <div className="flex items-center justify-between">
          <div className="card-label mb-2">
            <div className="text-3xl">{total.box}</div>
            <div className="opacity-[.6]">Trạm đo</div>
          </div>
          <div className="card-icon w-12 h-12 rounded-full bg-[#ffda9a] flex items-center justify-center">
            <img className="w-8 h-8" src={iconBox} alt="icon" />
          </div>
        </div>
        {/* <div className="text-xs">Tang 1 so voi thang truoc</div> */}
      </div>
      <div className="card rounded px-6 py-4 mx-5 bg-[#9c27b0]">
        <div className="flex items-center justify-between">
          <div className="card-label mb-2">
            <div className="text-3xl">{total.metric}</div>
            <div className="opacity-[.6]">Cảm biến</div>
          </div>
          <div className="card-icon w-12 h-12 rounded-full bg-[#d19ed9] flex items-center justify-center">
            <img className="w-8 h-8" src={iconSensor} alt="icon" />
          </div>
        </div>
        {/* <div className="text-xs">Tang 1 so voi thang truoc</div> */}
      </div>
      <div className="card rounded px-6 py-4 ml-5 bg-[#26a69a]">
        <div className="flex items-center justify-between">
          <div className="card-label mb-2">
            <div className="text-3xl">{total.record?.toLocaleString('vi-VN')}</div>
            <div className="opacity-[.6]">Bản ghi dữ liệu</div>
          </div>
          <div className="card-icon w-12 h-12 rounded-full bg-[#a2d4ce] flex items-center justify-center">
            <img className="w-8 h-8" src={iconRecord} alt="icon" />
          </div>
        </div>
        <div className="text-xs">Tăng {TotalInputMonth(docs).toLocaleString('vi-VN')} so với tháng trước</div>
      </div>
    </div>

    <div className="Chart grid grid-cols-12 pb-10 rounded">
      <div className="PieChart col-span-6 mr-5 h-full shadow-lg">
        <div className="card-header px-5 py-3 bg-[#6200ea] text-white rounded-t h-1/6">
          <div className="text-2xl">Cơ sở dữ liệu</div>
          <div className="opacity-[.6]">Phần trăm dung lượng</div>
        </div>
        <div className="flex card-body border border-[#e3e3e3] h-5/6 rounded-b bg-white items-center justify-between">
          <div className="w-1/3 m-4">
            <p className="font-mono text-[#757575] tracking-tight">Tổng số lượng bản ghi</p>
            <p className="font-bold  color-[#212121] leading-8 text-2xl pb-6 font-roboto">{total.record?.toLocaleString('vi-VN')}</p>

            <p className="font-mono text-[#757575] tracking-tight">Lưu trữ nhiều nhất</p>
            <p className="font-bold  color-[#212121] leading-8 text-2xl">{docs[pos?.max]?.name}</p>
            <p className="font-mono text-[#757575] tracking-tight">Số lượng bản ghi</p>
            <p className="font-bold  color-[#212121] leading-8 text-2xl pb-6">{docs[pos?.max]?.total?.toLocaleString('vi-VN')} <span className="text-slate-500 ">({(docs[pos?.max]?.total / total.record * 100).toFixed(2)}%)</span></p>

            <p className="font-mono text-[#757575] tracking-tight">Lưu trữ thấp nhất</p>
            <p className="font-bold  color-[#212121] leading-8 text-2xl">{docs[pos?.min]?.name}</p>
            <p className="font-mono text-[#757575] tracking-tight">Số lượng bản ghi</p>
            <p className="font-bold  color-[#212121] leading-8 text-2xl pb-6">{docs[pos?.min]?.total?.toLocaleString('vi-VN')} <span className="text-slate-500 ">({(docs[pos?.min]?.total / total.record * 100).toFixed(2)}%)</span></p>
          </div>
          <div className="w-2/3">
            {loading ?
              <LoadingComponent />
              :
              <DoughnutChart data={ChartData()} total={total} />
            }
          </div>
        </div>
      </div>

      <div className="LineChart col-span-6 ml-5 h-full shadow-lg">
        <div className="card-header px-5 py-3 bg-[#6200ea] text-white rounded-t h-1/6">
          <div className="text-2xl">Tổng bản ghi dữ liệu</div>
          <div className="opacity-[.6]">30 ngày gần nhất</div>
        </div>
        <div className="card-body border border-[#e3e3e3] bg-white h-5/6 rounded-b  flex items-center justify-between">
        {loading ?
              <LoadingComponent />
              :
              <BarChart docs={docs} />
        }
        </div>
      </div>
    </div>
    {loading ?
      <LoadingComponent />
      :
      <TableComponent docs={docs} total={total} />
    }

  </>
}

export default DashBoard;