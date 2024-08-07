"use client";

import React from 'react';

import Link from 'next/link'

import { useRouter } from 'next/router';

interface CustomAlertProps {
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
    
    const handleOk = () => {
        onClose(); // Chama a função de fechamento passada como prop
        router.push('/pages/home'); // Redireciona para a página de home
    };
    
    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert-box">
                <p>{message}</p>
                <Link className='button' href='/pages/home' onClick={onClose}>OK</Link>
            </div>
        </div>
    );
};

export default CustomAlert;