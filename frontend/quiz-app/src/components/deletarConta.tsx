
"use client"; // Isso garante que o componente será renderizado no cliente

import React from 'react';
import { Perfil } from './Perfil';



interface DeletarContaBotaoProps {
    onDelete: () => void;
}

const DeletarContaBotao: React.FC<DeletarContaBotaoProps> = ({ onDelete }) => {
    return (
        <a className="btn-deletar" onClick={onDelete}>Deletar conta</a>
    );
};

export default DeletarContaBotao;