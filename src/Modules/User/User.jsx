import useApiData from "../../Services/fetchApi";
import { BASE_URL } from "../../Utils/const";
import { time } from "../../Utils/time";

const User = () => {
    const apiUrl = `${BASE_URL}user/list`;
    const user = useApiData(apiUrl);

    return (
        <>
            <div className="TableComponent w-full shadow-lg bg-white rounded">
                <div className="table-title px-5 py-3 bg-[#6200ea] text-white rounded-t">
                    <p className="text-2xl">Danh sách người dùng</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className="flex items-center justify-between !px-2">
                                Tài khoản
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2">
                                    Tên người dùng
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2">
                                    Số điện thoại
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2">
                                    Quyền hạn
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center justify-between !px-2">
                                    Thời gian tạo
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user &&
                            user.map((u, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="!text-center">
                                            {i + 1}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {u.username}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {u.full_name}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {u.phone}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {u.role}
                                        </td>
                                        <td className="!text-left !px-2">
                                            {time(u.ctime * 1000)}
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

export default User;
