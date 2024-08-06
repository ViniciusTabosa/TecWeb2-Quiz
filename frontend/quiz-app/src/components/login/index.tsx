import './login.css'
import Img from '@/app/fotos_do site/galaxybranca.png'

export const Login = () => {
    return(
        <div className="container-login-bg">
        
            <div className="container_login">
                <img src={Img.src} alt="" /> 
                <div className="form-login">
                    <h1 className="titulo_login">Acesse seu perfil</h1>
                    <form action="" id="form2">
                        <div className="input2">
                            <input required className="campo_input2" type="text" id="nome2" />
                            <label className="label">Nome</label>
                        </div>
                        <div className="input2">
                            <input required className="campo_input2" type="password" id="senha2" />
                            <label className="label">Senha</label>
                        </div>
                    </form>
                </div>
                <div className="btn2">
                    <button className="btn-entrar">Entrar</button>
                </div>
            </div>

        </div>
    )
}