export const MESSAGES = {
    CONTATOS: {
        INVITE_ALREADY_SENT: 'Convite já enviado para',
        CONTACT_ALREADY_EXISTS: 'O contato já existe.',
        INVITE_TO_BLOCKED_CONTACT:
            'Este contato está bloqueado. Não é possível lhe enviar um convite.'
    },
    GENERIC: {
        ERROR: 'Ooops! Ocorreu um erro, por favor tente novamente.',
        ERR_404: 'Recurso não encontrado, por favor tente novamente.',
        ERR_401: 'Não autorizado. Por favor tente novamente.',
        ERR_400: 'Ocorreu um erro na sua ação, por favor tente novamente.'
    },
    LOGIN: {
        UNVERIFIED:
            'Este e-mail já está cadastrado. Acabamos de enviar um novo e-mail de confirmação.',
        PASSWORD_WRONG:
            'Senha incorreta. Caso tenha esquecido a senha, use a opção "Esqueci a senha."',
        PASSWORD_REQUEST_RESET:
            'As instruções para você alterar sua senha foram enviadas para o seu e-mail',
        PASSWORD_RESET_EXPIRED:
            'Sua solicitação de alteração de senha expirou, por favor tente novamente.',
        USER_NOT_EXIST: 'Usuário não cadastrado'
    },
    LISTA: {
        ERROR: 'Ocorreu um erro ao carregar a lista.'
    },
    MOVIMENTACAO: {
        CADASTRO_INSTITUICAO_ERROR: 'Falha no cadastro. Tente novamente.',
        OPERACAO_ERROR: 'Falha no cadastro. Tente novamente.'
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
    WS: {
        ERROR: 'Ooops! Ocorreu um error de conexão com os servidores.',
        SECURITY_ERROR: 'Ooops! Ocorreu um error de conexão com os servidores.'
    }
};

export default MESSAGES;
