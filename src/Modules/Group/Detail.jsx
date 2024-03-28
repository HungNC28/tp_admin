import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sharedService from "../../Services/SharedService";
import { ReactComponent as UpDownIcon } from "../../Asset/icon/up-and-down.svg";
import { date, time, RangeTime, ColorTime } from "../../Utils/time";
import { ReactComponent as UpArrowIcon } from "../../Asset/icon/arrow-up.svg";
import LoadingComponent from "../Layout/LoadingComponent";

const GroupDetail = () => {
    const [sort, setSort] = useState("")
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const { groupId } = useParams();

    useEffect(() => {
        if (!groupId) return;
        sharedService.getStatistic({ group_id: groupId }).then(res => {
            const data = res.data;
            setData({ ...data })
            setLoading(false)
        }).catch(err => console.log(err))
    }, [groupId])

    function HandleSort(key, t, s) {
        switch (key) {
            case "ctime":
                return t.ctime - s.ctime
            case "record":
                return t.count - s.count
            case "metric":
                return t.metrics.length - s.metrics.length
            case "last":
                return t.ltime - s.ltime
            default:
                break
        }
    }

    function SortData(key) {
        if (key === sort) {
            data.boxs.sort((a, b) => HandleSort(key, a, b))
            setSort("")
        } else {
            setSort(key)
            data.boxs.sort((a, b) => HandleSort(key, b, a))
        }
        setData({ ...data })
    }

    return <>
        <div className="TableComponent w-full shadow-lg bg-white rounded">
            <div className="table-title px-5 py-3 bg-[#6200ea] text-white rounded-t">
                <p className="text-2xl">{data.name}</p>
                <p className="opacity-[.6] flex items-center">{data.total?.toLocaleString('vi-VN')} bản ghi <UpArrowIcon className="ml-5 mr-2 w-8 h-8" />Tăng {data.total_month?.toLocaleString('vi-VN')} bản ghi so với tháng trước</p>
            </div>
            {loading ?
                <LoadingComponent />
                :
                <table >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className="text-right">Trạm đo</th>
                            <th >
                                <div className="flex items-center justify-between !px-2">
                                    <UpDownIcon onClick={e => SortData("metric")} className="w-6 h-8 cursor-pointer" />
                                    Tổng cảm biến
                                </div>
                            </th>
                            <th >
                                <div className="flex items-center justify-between !px-2">
                                    <UpDownIcon onClick={e => SortData("record")} className="w-6 h-8 cursor-pointer" />
                                    Tổng bản ghi
                                </div>
                            </th>
                            <th >
                                <div className="flex items-center justify-between !px-2">
                                    <UpDownIcon onClick={e => SortData("record")} className="w-6 h-8 cursor-pointer" />
                                    Bản ghi 30 ngày gần nhất
                                </div>
                            </th>
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
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.boxs?.map((d, i) => {
                            return <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td>{d.name}</td>
                                <td>{d.metrics?.length}</td>
                                <td>{d.count?.toLocaleString('vi-VN')}</td>
                                <td>{d.count_month?.toLocaleString('vi-VN')}</td>
                                <td>{d.ctime && date(d.ctime)}</td>
                                <td>{d.ltime && d.ltime > 0 ? time(d.ltime * 1000) : ""}</td>
                                <td className={ColorTime(d.ltime * 1000)}>{RangeTime(d.ltime * 1000)} </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }

        </div>
    </>
}


export default GroupDetail;