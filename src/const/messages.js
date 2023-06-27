export const MESSAGES = {
    GENERIC: {
        ERROR: 'Ooops! Ocorreu um erro, por favor tente novamente.',
        ERR_404: 'Recurso não encontrado, por favor tente novamente.',
        ERR_401: 'Não autorizado. Por favor tente novamente.',
        ERR_400: 'Ocorreu um erro na sua ação, por favor tente novamente.',
        CANCELED: 'Cancelado pelo usuário.'
    },
    LOGIN: {
        UNVERIFIED:
            'Este e-mail já está cadastrado. Acabamos de enviar um novo e-mail de confirmação.',
        PASSWORD_WRONG:
            'Senha incorreta. Caso tenha esquecido a senha, use a opção "Esqueci a senha."',
        PASSWORD_REQUEST_RESET:
            'As instruções para você alterar sua senha foram enviadas para o seu e-mail',
        PASSWORD_RESET_EXPIRED:
            'Sua solicitação de alteração de senha expirou, por favor tente novamente.'
    },
    SERVER: {
        ERROR: 'Ooops! Ocorreu um error com nossos servidores, por favor tente mais tarde.',
        NO_RESPONSE: 'Não foi possível recuperar os dados do servidor. Por favor tente mais tarde.',
        ERROR_CONEX: 'Oops, ocorreu uma falha na conexão com nossos servidores.'
    },
    STATUS: {
        NO_RESPONSE: 'Infelizmente não há dados disponíveis. Reconecte-se à internet.',
        OFFLINE:
            'Sem conexão com a Internet. O Wi-fi ou Rede de Dados do celular devem estar ativos. Tente Novamente.'
    },
    VALIDATING_DATA: {
        LOADING: 'Validando dados...',
        ERROR: 'Ocorreu um erro durante a validação dos dados. Tente novamente',
        ERROR_SHORT: 'Ocorreu um erro.'
    },
    WS: {
        ERROR: 'Ooops! Ocorreu um error de conexão com os servidores.',
        SECURITY_ERROR: 'Ooops! Ocorreu um error de conexão com os servidores.'
    }
};

export default MESSAGES;
