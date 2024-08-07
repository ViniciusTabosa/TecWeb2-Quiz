
"use client"; // Isso garante que o componente será renderizado no cliente

import React from 'react';
import { Resultados } from './Resultados';


interface DeletarContaBotaoProps {
    onDelete: () => void;
}

const DeletarContaBotao: React.FC<DeletarContaBotaoProps> = ({ onDelete }) => {
    return (
        <button className="btn_deletar" onClick={onDelete}>Deletar conta</button>
    );
};

export default DeletarContaBotao;