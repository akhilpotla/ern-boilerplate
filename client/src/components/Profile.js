import React from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn } from '../utils/setAuthToken';

const Profile = () => {

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    } else {
        return (
            <div>
                <h3>This is the profile page. You are logged in.</h3>
            </div>
        );
    }
}

export default Profile;
