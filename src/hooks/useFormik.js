import { useRef } from 'react';

const useFormik = () => {
    const formikProps = useRef({});

    // Armazena os dados do formulário
    const registerFormik = pFormik => {
        formikProps.current = pFormik;
    };

    // Retorna os dados do formulário
    const getFormik = () => {
        return formikProps.current;
    };

    return { getFormik, registerFormik };
};

export default useFormik;
