import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn } from '../utils/isLoggedIn';

const Profile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);


    useEffect(() => {
        isLoggedIn().then(authStatus => {
            setIsAuthenticated(authStatus);
        }).catch(error => {
            console.error('Authentication check failed', error);
        });
    }, [])

    if (isAuthenticated == false) {
        return <Navigate to="/login" replace />;
    } else if (isAuthenticated == true) {
        return (
            <div>
                <h3>This is the profile page. You are logged in.</h3>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default Profile;
