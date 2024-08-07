import './perfil.css'
import Img from '@/app/fotos_do site/outer-space.png'
import Link from 'next/link'

export const Perfil = () => {
    return(
        <div className="container-perfil-bg">

            <div className="container-perfil">
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
                    <a href="/" className="btn-cadastrar">Cadastrar</a>
                </div>
            </div>

        </div>
    )
}