import NavLink from "./navlink";
import Centient from '../centient';

const Sidebar = () => {
    return (  
        <div className="sidenav md:block bg-subdark">

            <div className="my-8 flex justify-center">
                <Centient/>
            </div>

            <ul>
                <NavLink 
                    path="/dashboard"
                    icon="dashboard"
                >
                    Dashboard
                </NavLink>
            </ul>
        </div>
    );
}
 
export default Sidebar;