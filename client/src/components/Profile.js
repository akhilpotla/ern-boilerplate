import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const getLoggedIn = async () => {
        console.log('getLoggedIn');
        try {
            console.log('trying');
            const res = await axios.get('/api/users', { withCredentials: true });
            console.log('Response: ', res);
            setLoggedIn(true);
            console.log(res);
        } catch (err) {
            console.log('Sad face');
            console.log(err);
        }
    }

    useEffect(() => {
        getLoggedIn();
        console.log('Logged In: ', loggedIn);
    }, [loggedIn])

    // if (!loggedIn) {
    //     return <Navigate to="/login" replace />;
    // } else {
        return (
            <div>
                <h3>This is the profile page. You are logged in.</h3>
            </div>
        );
    // }
}

export default Profile;
