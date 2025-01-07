import { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

function ToastMessage({ children }) {
    const value = {
        toast,
    };
    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

export default ToastMessage;
