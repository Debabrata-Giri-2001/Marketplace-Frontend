import React, { createContext, ReactNode, useContext, useState } from 'react';

const AppContext = createContext<any>({});

type AppContextProviderProps = {
    children?: ReactNode;
};

export default ({ children }: AppContextProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState<any>(null);
    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);