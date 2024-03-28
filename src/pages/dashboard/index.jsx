import { useLoaderData } from "react-router-dom"

const Dashboard = () => {
    /** @type {App.Loader.Dashboard} */
    // @ts-expect-error
    const { goals, accounts, spending, transactions } = useLoaderData();

    return (  
        <div>
            
        </div>
    );
}
 
export default Dashboard;