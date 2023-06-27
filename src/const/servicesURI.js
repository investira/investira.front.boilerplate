// URI
export const BASE_URL = process.env.REACT_APP_BACK_URI + 'api/v1/';

//STATUS
export const STATUS_URL = process.env.REACT_APP_BACK_URI + 'status';

// INFO
export const INFO_URL = process.env.REACT_APP_BACK_URI + 'info/';

// BASE
export const BASE_USER_URI = BASE_URL + 'usuarios/';
export const BASE_OAUTH_URI = BASE_URL + 'auth/';
export const BASE_NOTIFICACOES_URI = BASE_URL + 'notificacoes';

// Autenticação
export const OAUTH_VERIFY_USERNAME = BASE_OAUTH_URI;
export const OAUTH_UPDATE_TOKEN = BASE_OAUTH_URI;
export const OAUTH_LOGIN = BASE_OAUTH_URI;
export const OAUTH_LOGOUT = BASE_OAUTH_URI;
export const OAUTH_REGISTER = BASE_OAUTH_URI + 'register/';
export const OAUTH_REGISTER_CODE_VALIDATE = OAUTH_REGISTER;
export const OAUTH_PASSWORD_RESET = BASE_OAUTH_URI + 'password/';
export const OAUTH_PASSWORD_RESET_VALIDATE = OAUTH_PASSWORD_RESET;
export const OAUTH_PASSWORD_RESET_CONFIRM = OAUTH_PASSWORD_RESET;

// User
export const USER_READ = BASE_USER_URI;
export const USER_READ_USERNAME = BASE_USER_URI;
export const USER_UPDATE = BASE_USER_URI;
export const USER_UPDATE_PASSWORD = BASE_USER_URI + 'password/';
export const USER_FAVORITE_LIST = BASE_USER_URI + 'favoritos/';
export const USER_FAVORITE_UPDATE = BASE_USER_URI;
export const USER_SUMMARY_LIST = BASE_USER_URI + 'resumos/';
export const USER_SUMMARY_UPDATE = BASE_USER_URI;

// Notificações
export const NOTIFICACAO_LIST = BASE_NOTIFICACOES_URI;
export const NOTIFICACAO_RESPONDER = BASE_NOTIFICACOES_URI;
