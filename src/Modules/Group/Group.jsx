import { useState, useEffect } from "react";
import useApiData from "../../Services/fetchApi";
import { BASE_URL } from "../../Utils/const";
import { time } from "../../Utils/time";
import groupService from "./GroupService";
import "./Group.scss";

const Group = () => {
    const zone_id = "GI3K8ROF";
    // const [data, setData] = useState({});
    const apiUrl = `${BASE_URL}zone/box_group/list?zone_id=GI3K8ROF`;
    const data = useApiData(apiUrl);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await groupService.listGroup();
    //             console.log("1111", res);
    //             setData(res.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        <>
            <div className="TableComponent w-full shadow-lg bg-white rounded">
                <div className="table-title px-5 py-3 bg-[#6200ea] text-white rounded-t table_title">
                    <p className="text-2xl">Danh sách công trình</p>
                    <a
                        className="bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-200 cursor-pointer"
                        href="/group/form/new"
                    >
                        Add New
                    </a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className="flex items-center justify-between !px-2 !text-left">
                                Tên công trình
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2 !text-left">
                                    Độ phóng to
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2 !text-left">
                                    Trung tâm(vĩ độ - kinh độ)
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2 !text-left">
                                    Trạm đo
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2 !text-left">
                                    Thời gian tạo
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((d, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="!text-center">
                                            {i + 1}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {d.name}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {d.zoom}
                                        </td>
                                        <td className="!text-left !px-2">
                                            ({d.center.lat}, {d.center.lng})
                                        </td>
                                        <td className="box_group">
                                            {d.boxs.map((b, i) => {
                                                return (
                                                    <div
                                                        className="construction"
                                                        key={i}
                                                    >
                                                        {b.name} ,{" "}
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {time(d.ctime)}
                                        </td>
                                        <td>
                                            <a
                                                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-200 cursor-pointer"
                                                href={`/group/form/update/${d.id}`}
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Group;
