import React from 'react';
import { useNavigate } from 'react-router-dom';

import { isLoggedIn } from '../utils/setAuthToken';

const Profile = () => {

    let navigate = useNavigate();

    if (!isLoggedIn()) {
        navigate('/login');
        return null;
    } else {
        return (
            <div style={{ marginTop: 200 }}>
                <h3>This is the profile page. You are logged in.</h3>
            </div>
        );
    }
}

export default Profile;
