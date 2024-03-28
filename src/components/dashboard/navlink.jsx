import clsx from "clsx";
import { NavLink as Link } from "react-router-dom";

/**
 * Link elements for the navbar
 * @typedef {object} props
 * @property {string} path
 * @property {React.ReactNode} children
 * @property {string} icon
 * @param {props} param0
 * @returns {React.JSX.Element}
 */
const NavLink = ({ path, children, icon }) => {
    return (  
        <li>
            <Link 
                to={path} 
                className={({ isActive }) => clsx(
                    isActive ? "bg-secondary" : "!text-white",
                    "hover:!bg-secondary/25 [&>*]:hover:!text-white/75 [&>*]:!text-white sidenav-close"
                )}
            >
                <i className="material-icons">{icon}</i>
                <span>{children}</span>
            </Link>
        </li>
    );
}
 
export default NavLink;