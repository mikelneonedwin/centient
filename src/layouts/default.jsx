import { Outlet, ScrollRestoration } from 'react-router-dom';

const DefaultLayout = () => {
    return (  
        <>
            <ScrollRestoration/>
            <Outlet/>
        </>
    );
}
 
export default DefaultLayout;