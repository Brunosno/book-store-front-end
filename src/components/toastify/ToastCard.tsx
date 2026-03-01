'use client';

import { ToastContainer, ToastPosition, Theme } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastCardProps {
    position?: ToastPosition;
    autoClose?: number;
    theme?: Theme;
}

export default function ToastCard({
    position = "top-left",
    autoClose = 2000,
    theme = "colored"
}: ToastCardProps){

    return (
        <ToastContainer
            position={position}
            theme={theme}
            autoClose={autoClose}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}