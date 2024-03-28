import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import groupService from "./GroupService";
import "./FormGroup.scss";

const FormGroup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [zoneList, setZoneList] = useState([]);
    const { id } = useParams();
    const { group_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await groupService.listZone();
                setZoneList(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await groupService.getGroup({ id: group_id });
                setData({ ...res.data });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id !== "new") {
            fetchData();
        }
    }, []);

    const submitHandle = async (e) => {
        e.preventDefault();
        if (id === "new") {
            try {
                delete data.boxs;
                delete data.box_ids;
                const respone = await groupService.postGroup(data);
                alert("Item added successfully");
                navigate("/group");
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                delete data.boxs;
                delete data.box_ids;
                const respone = await groupService.updateGroup(
                    { id: group_id },
                    data
                );
                alert("Item updated successfully");
                navigate("/group");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="form-info">
            <p className="text-2xl">
                {id === "new" ? "Thêm" : "Sửa"} công trình
            </p>
            <form onSubmit={submitHandle}>
                <div className="form-input">
                    <label>
                        Tên công trình <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <label>
                        Khu vực <span className="text-danger">*</span>
                    </label>
                    <select
                        value={data.zone_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                zone_id: e.target.value,
                            })
                        }
                    >
                        {zoneList &&
                            zoneList.map((z, i) => {
                                return (
                                    <>
                                        <option
                                            selected={
                                                data.zone_id === z.id
                                                    ? true
                                                    : false
                                            }
                                            key={i}
                                            value={z.id}
                                        >
                                            {z.name}
                                        </option>
                                    </>
                                );
                            })}
                    </select>
                    <label>
                        Vị trí trung tâm <span className="text-danger">*</span>
                    </label>
                    <div className="position">
                        <input
                            type="number"
                            value={data?.center?.lat}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    center: {
                                        lat: e.target.value,
                                        lng: data?.center?.lng,
                                    },
                                })
                            }
                        />
                        <input
                            type="number"
                            value={data?.center?.lng}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    center: {
                                        lat: data?.center?.lat,
                                        lng: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <label>
                        Mức độ phóng <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        value={data.zoom}
                        onChange={(e) =>
                            setData({ ...data, zoom: e.target.value })
                        }
                    />
                    <label>Subdomain</label>
                    <input
                        type="text"
                        value={data.subdomain}
                        onChange={(e) =>
                            setData({ ...data, subdomain: e.target.value })
                        }
                    />
                </div>
                <button
                    className="bg-sky-500 text-white px-12 py-2 rounded hover:bg-sky-200 cursor-pointer float-end"
                    type="submit"
                >
                    {id === "new" ? "Add" : "Update"}
                </button>
            </form>
        </div>
    );
};

export default FormGroup;
