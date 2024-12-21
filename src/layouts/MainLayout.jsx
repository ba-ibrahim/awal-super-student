import { Outlet } from "react-router-dom";
import Vnavbar from "../components/Vnavbar/Vnavbar";
import "./MainLayout.css"
export default function MainLayout() { 
    return (
        <div className="parent">
            <div className="div1">
                <Vnavbar/>
            </div>
            <div className="div2">
                <Outlet/>
            </div>
        </div>
)}