import React, { memo } from 'react';

// Context
const AppManagerContext = React.createContext();

const initialState = {
    hiddenValue: false
};

// Reducers
const reducers = (state = initialState, action) => {
    if (action.type === 'TOOGLE_HIDDEN_VALUE') {
        return {
            ...state,
            hiddenValue: action.payload ? action.payload : !state.hiddenValue
        };
    }
};

// Dispatchs
const updateHiddenValue = pBool => ({
    type: 'TOOGLE_HIDDEN_VALUE',
    payload: pBool
});

// Custom Hook
export const useAppContext = () => React.useContext(AppManagerContext);

export const AppProvider = memo(({ children }) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);

    // Utilizado para ocultar valores da aplicação
    const handleUpdateHiddenValue = pValue => {
        dispatch(updateHiddenValue(pValue));
    };

    return (
        <AppManagerContext.Provider value={{ state, handleUpdateHiddenValue }}>
            {children}
        </AppManagerContext.Provider>
    );
});

export default AppProvider;
