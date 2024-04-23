import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";

function MainLayout() {
    return (
        <>
        <Navbar/>
        <Banner/>
        <Outlet/>
        </>
    )
}

export default MainLayout;