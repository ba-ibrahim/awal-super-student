import { MdDashboard } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { SiCodeforces } from "react-icons/si";
import { ImBlog } from "react-icons/im";
import "./Vnavbar.css"


export default function Vnavbar() { 
    return (
        <nav className="navbar">
            <ul>
                <li>
                <NavLink>
                    <MdDashboard size={"80%"} color="rgb(50, 50, 50)"/>
                </NavLink>
                </li>
                <li>
                <NavLink to={"/profil"}>
                    <MdOutlinePerson  size={"80%"} color="rgb(50, 50, 50)"/>
                </NavLink>
                </li>
                <li>
                    <NavLink to={"/meetings"}>
                        <MdOutlineVideoCameraFront size={"80%"} color="rgb(50, 50, 50)"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <GrResources size={"80%"} color="rgb(50, 50, 50)"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <SiCodeforces size={"80%"} color="rgb(50, 50, 50)"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/blog"}>
                        <ImBlog size={"80%"} color="rgb(50, 50, 50)"/>
                    </NavLink>
                </li>
            </ul>
        </nav>
)}