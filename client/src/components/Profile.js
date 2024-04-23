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
            <div>
                <p>This is the profile page</p>
            </div>
        );
    }
}

export default Profile;
