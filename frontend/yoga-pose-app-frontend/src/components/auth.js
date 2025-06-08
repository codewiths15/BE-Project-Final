export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');
export const isAuthenticated = () => {
   const token = getToken();
   if(!token) return false;
   else {return true;}
}
export const setexpiryTime = (expiry) => {
    localStorage.setItem("tokenExpiry", expiry.toString());
}
export const getUserName = () => localStorage.getItem('userName');
export const setUserName = (response) => localStorage.setItem("userName", response.data.name);