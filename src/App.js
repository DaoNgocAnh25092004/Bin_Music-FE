import { ToastContainer } from 'react-toastify';
import {
    Outlet,
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { publicRoutes, protectedRoutes } from '~/routes';
import DefaultLayout from '~/Layouts';
import Login from './components/Login';
import SplashCursor from '~/components/SplashCursor';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to check if user is logged in
    // If not, redirect to Home page
    const ProtectedRoute = ({ role }) => {
        const user = useSelector((state) => state.user);

        // Need login
        if (!user.isLogin) {
            return <Navigate to="/" />;
        }

        // Only admin
        if (role === 'admin' && user.role !== 'admin') {
            return <Navigate to="/" />;
        }

        return <Outlet />;
    };

    // Function to render routes
    const renderRoutes = (routes, Layout = DefaultLayout) => {
        return routes.map((route, index) => {
            let RouteLayout = route.layout || Layout;
            if (route.layout === null) {
                RouteLayout = Fragment;
            }
            const Page = route.component;

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <RouteLayout>
                            <Page />
                        </RouteLayout>
                    }
                />
            );
        });
    };

    return (
        <Router>
            <div className="App">
                {/* <SplashCursor /> */}

                <ToastContainer />

                <Login isOpen={isModalOpen} setIsOpen={setModalOpen} />

                <Routes>
                    {/* Public Routes */}
                    {renderRoutes(publicRoutes)}

                    {/* Protected Routes for both users and admins */}
                    <Route element={<ProtectedRoute />}>
                        {renderRoutes(protectedRoutes.both)}
                    </Route>

                    {/* Only admin */}
                    <Route element={<ProtectedRoute role="admin" />}>
                        {renderRoutes(protectedRoutes.admin)}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
