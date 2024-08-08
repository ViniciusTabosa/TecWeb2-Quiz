
import React from 'react';
import './cadastro.css'
import Img from '@/app/fotos_do site/outer-space.png'
import Link from 'next/link'



export const Cadastro = () => {

    return(
        <div className="container-form-bg">

            <div className="container-form">
                <img src={Img.src} alt=""/>
                <div className="form">
                    <h1 className="titulo_form">Cadastre-se</h1>
                    <form action="" id="form">
                        <div className="input">
                            <input required className="campo_input" type="text" id="nome" />
                            <label>Nome</label>
                        </div>
                        <div className="input">
                            <input required className="campo_input" type="password" id="senha" />
                            <label>Senha</label>
                        </div>
                    </form>
                </div>
                <div className="btn">
                    <Link href="/pages/perfil" className="btn-cadastrar">Cadastrar</Link>
                </div>
            </div>

        </div>
    )
}