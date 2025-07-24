import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"

const DashboardLayout = () => {
    return(
        <div style={{display:'flex'}}>
            <SideBar/>
            <main style={{flexGrow:1, padding:'1rem'}}>
                <Outlet/>
            </main>
        </div>
    )
}

export default DashboardLayout;