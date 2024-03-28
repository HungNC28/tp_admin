import { useEffect, useState } from "react";
import { ReactComponent as UpDownIcon } from "../../Asset/icon/up-and-down.svg";
import { Link } from "react-router-dom";
import { time, date, RangeMonth } from "../../Utils/time";

const TableComponent = ({ docs, total }) => {
    const [data, setData] = useState([])
    const [sort, setSort] = useState("")

    useEffect(() => {
        const data = JSON.parse(JSON.stringify(docs))
        setData([...data])
    }, [docs])

    function HandleSort(key, t, s) {
        switch (key) {
            case "ctime":
                return t.ctime - s.ctime
            case "record":
                return t.total - s.total
            case "metric":
                return t.boxs.reduce((a, b) => a + b.metrics.length, 0) - s.boxs.reduce((a, b) => a + b.metrics.length, 0)
            case "box":
                return t.boxs.length - s.boxs.length
            case "last":
                return t.last - s.last
            default:
                break
        }
    }

    function SortData(key) {
        if (key === sort) {
            data.sort((a, b) => HandleSort(key, a, b))
            setSort("")
        } else {
            setSort(key)
            data.sort((a, b) => HandleSort(key, b, a))
        }
        setData([...data])
    }

    return <>
        <div className="TableComponent w-full shadow-lg bg-white rounded">
            <div className="table-title px-5 py-3 bg-[#6200ea] text-white rounded-t">
                <p className="text-2xl">Thống kê</p>
                <p className="opacity-[.6]">{data.length} công trình</p>
            </div>
            <table >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th className="text-right">Công trình</th>
                        <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("box")} className="w-6 h-8 cursor-pointer" />
                                Số trạm
                            </div>
                        </th>
                        <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("metric")} className="w-6 h-8 cursor-pointer" />
                                Số cảm biến
                            </div>
                        </th>
                        <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("record")} className="w-6 h-8 cursor-pointer" />
                                Tổng số bản ghi
                            </div>
                        </th>
                        <th>
                            <div>Trung bình bản ghi trên 1 tháng</div>
                        </th>
                        {/* <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("record")} className="w-6 h-8 cursor-pointer" />
                                Dung lượng
                            </div>
                        </th> */}
                        <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("ctime")} className="w-6 h-8 cursor-pointer" />
                                Ngày tạo
                            </div>
                        </th>
                        <th >
                            <div className="flex items-center justify-between !px-2">
                                <UpDownIcon onClick={e => SortData("last")} className="w-6 h-8 cursor-pointer" />
                                Cập nhật gần nhất
                            </div>
                        </th>
                        {/* <th>Chức năng khác</th> */}
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                        return <tr key={d.id}>
                            <td className="!text-center">{i + 1}</td>
                            <td>{d.name}</td>
                            <td>{d.boxs.length}</td>
                            <td>{d.boxs.reduce((a, b) => a + b.metrics.length, 0)}</td>
                            <td>{d.total?.toLocaleString('vi-VN')}</td>
                            <td>{Math.floor((d.total / RangeMonth(d.ctime))).toLocaleString('vi-VN')}</td>
                            <td>{date(d.ctime)}</td>
                            <td>{time(d?.last * 1000)}</td>
                            <td><Link to={"/group/" + d.id} className="bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-200 cursor-pointer">Xem</Link> </td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    </>
}

export default TableComponent