import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import GroupDetail from "./Group/Detail";
import Menu from "./Layout/Menu";
import User from "./User/User";
import Group from "./Group/Group";
import Measuring from "./Measuring/Measuring";
import FormGroup from "./Group/FormGroup";

function App() {
    return (
        <>
            <Menu />
            <div className="App px-10 py-5 bg-[#f5f5f5] h-[calc(100vh-64px)] overflow-auto">
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/group/:groupId" element={<GroupDetail />} />
                    <Route path="/*" element={<DashBoard />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/group" element={<Group />} />
                    <Route path="/quanly" element={<Measuring />} />
                    <Route
                        path="/group/form/:id/:group_id?"
                        element={<FormGroup />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
