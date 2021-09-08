import React from 'react';
import { useHistory } from 'react-router-dom';

import { isLoggedIn } from '../utils/setAuthToken';

const Profile = () => {

    let history = useHistory();

    if (isLoggedIn()) {
        return (
            <div>
                <p>This is the profile page</p>
            </div>
        );
    } else {
        history.push('/login')
        return null;
    }
}

export default Profile;
