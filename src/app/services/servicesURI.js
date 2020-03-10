// URI
export const REACT_APP_BACK_URI = process.env.REACT_APP_BACK_URI;

// BASE
export const BASE_USER_URI = REACT_APP_BACK_URI + '/api/v1/usuarios';
export const BASE_OAUTH_URI = REACT_APP_BACK_URI + '/api/v1/auth';

// Autenticação
export const OAUTH_VERIFY_USERNAME = BASE_OAUTH_URI;
export const OAUTH_UPDATE_TOKEN = BASE_OAUTH_URI;
export const OAUTH_LOGIN = BASE_OAUTH_URI;
export const OAUTH_LOGOUT = BASE_OAUTH_URI;

// User
export const USER_READ = BASE_USER_URI;
export const USER_READ_USERNAME = BASE_USER_URI;
export const USER_UPDATE = BASE_USER_URI;
export const USER_UPDATE_PASSWORD = `${BASE_USER_URI}/password`;
