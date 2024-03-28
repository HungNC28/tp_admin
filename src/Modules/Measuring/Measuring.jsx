import useApiData from "../../Services/fetchApi";
import { BASE_URL } from "../../Utils/const";
import { time } from "../../Utils/time";
import "./Measuring.scss";

const Measuring = () => {
    const apiUrl = `${BASE_URL}zone/box_group/list?zone_id=GI3K8ROF`;
    const data = useApiData(apiUrl);

    return (
        <>
            <div className="TableComponent w-full shadow-lg bg-white rounded">
                <div className="table-title px-5 py-3 bg-[#6200ea] text-white rounded-t">
                    <p className="text-2xl">Danh sách trạm đo</p>
                </div>
                {data &&
                    data.map((d, i) => {
                        return (
                            <div key={i} className="table_container">
                                <div className="table-title px-10 py-3 text-black rounded-t measuring_name">
                                    <p className="text-2xl">{d.name}</p>
                                </div>
                                <table className="table_infor">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th className="flex items-center justify-between !px-2 !text-left">
                                                Tên trạm đo
                                            </th>
                                            <th>
                                                <div className="flex items-center justify-between !px-2 !text-left">
                                                    Mã thiết bị{" "}
                                                </div>
                                            </th>
                                            <th>
                                                <div className="flex items-center justify-between !px-2 !text-left">
                                                    Vị trí (Vĩ độ, Kinh độ)
                                                </div>
                                            </th>
                                            <th>
                                                <div className="flex items-center justify-between !px-2 !text-left">
                                                    Các chỉ số
                                                </div>
                                            </th>
                                            <th>
                                                <div className="flex items-center justify-between !px-2 !text-left">
                                                    Chỉnh sửa lúc
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {d &&
                                            d.boxs.map((b, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="!text-center">
                                                            {i + 1}
                                                        </td>
                                                        <td className="!text-left !px-2">
                                                            {b.name}
                                                        </td>
                                                        <td className="!text-left !px-2">
                                                            {b.device_id}
                                                        </td>
                                                        <td className="!text-left !px-2">
                                                            ({b.location.lat},{" "}
                                                            {b.location.lng})
                                                        </td>
                                                        <td className="box_group">
                                                            {b.metrics.map(
                                                                (c, i) => {
                                                                    return (
                                                                        <div
                                                                            className="construction"
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {
                                                                                c.code
                                                                            }{" "}
                                                                            ,{" "}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </td>
                                                        <td className="!text-left !px-2">
                                                            {time(b.mtime)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Measuring;
