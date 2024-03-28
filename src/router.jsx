import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout, DefaultLayout } from './layouts';
import { Dashboard, Home, Login, SignUp } from './pages';
import * as loader from './loaders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                loader: loader.dashboard
            }
        ]
    }
])

export default router;