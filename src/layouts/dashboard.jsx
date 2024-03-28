import { Outlet, ScrollRestoration } from "react-router-dom";
import { Sidebar } from "../components/dashboard";
import { Sidenav } from "materialize-css";
import { Centient } from "../components";

const DashboardLayout = () => {

    const showSideNav = () => {
        const sideNav = document.querySelector('.sidenav');
        if (sideNav) {
            const instance = Sidenav.init(sideNav);
            instance.open();
        }
    }

    return (  
        <>
            <ScrollRestoration/>
            <div>
                <nav className="px-4 md:hidden bg-subdark shadow-none text-center">
                    <button 
                        onClick={showSideNav} 
                        className="focus:bg-inherit float-left"
                    >
                        <i className="material-icons text-secondary font-medium">menu</i>
                    </button>
                    <div className="mx-auto h-full inline-flex items-cneter py-2">
                        <Centient/>
                    </div>
                </nav>
                <div>
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}
 
export default DashboardLayout;