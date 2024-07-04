import { createContext, useContext, useState } from "react";

const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
    const [clicked, setClicked] = useState();
    return (
        <ClickContext.Provider value={{ clicked, setClicked }}>
            {children}
        </ClickContext.Provider>
    )
}

export const UserClickContext = () => {
    return (useContext(ClickContext))
}