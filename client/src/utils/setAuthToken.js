export const setAuthToken = (token) => {
    const tokenCookie = 'token=' + token;
    document.cookie = tokenCookie;
}

export const getCookies = () => {
    return document.cookie
        .split(";")
        .map(cookie => cookie.split("="))
        .reduce(
                (accumulator, [key, value]) => (
                {...accumulator, [key.trim()]: decodeURIComponent(value)}
            ),
            {}
        );
}

export const isLoggedIn = () => {
    const cookies = getCookies();
    const token = cookies.token;
    if (token !== undefined && token !== "") {
        return false;
    }
    return true;
}

export const deleteCookie = (cookie) => {
    document.cookie = cookie + "=;" + "expires=-1";
}
