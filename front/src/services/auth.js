export const TOKEN_KEY = "@caronapp-Token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token,) => localStorage.setItem(TOKEN_KEY,token);
export const isAuthenticated = () => getToken() !== null;
export const login = (token) => setToken(token);
export const logout = () => setToken(null);