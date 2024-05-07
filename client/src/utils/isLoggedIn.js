import axios from 'axios';

export const isLoggedIn = async () => {
    try {
        const res = await axios.get('/api/users', { withCredentials: true });
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}