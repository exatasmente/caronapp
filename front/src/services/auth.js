export const TOKEN_KEY = "@caronapp-Token";
export const ROLE_KEY = "@caronapp-userRole";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY,token);
export const isAuthenticated = () => getToken() !== null;
export const setRole = (role) => localStorage.setItem(ROLE_KEY,role);
export const getRole = () => localStorage.getItem(ROLE_KEY);
export const login = (token,role) => { setToken(token)  ; setRole(role) };
export const logout = () => {localStorage.removeItem(TOKEN_KEY) ; localStorage.removeItem(ROLE_KEY)};