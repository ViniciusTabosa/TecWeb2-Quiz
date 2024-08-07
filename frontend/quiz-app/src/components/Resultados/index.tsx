
import './resultados.css';
import Link from 'next/link';

export const Resultados = () => {

    
    return(
      
        <div className="container_login2_bg">
   
            <div className="container_login2">
                <div className="result_pessoal">
                    <h2>Pontuação Pessoal</h2>
                    <div className="desc">
                        <span>Nome</span>
                        <span>Pontuação</span>
                    </div>
                </div>

                <div className="result_global">
                    <h2>Ranking Geral</h2>
                    <div className="desc">
                        <span>Jogador</span>
                        <span>Resultado</span>
                    </div>
                </div>

            </div>
            <div className="botaos">
                <Link href='/pages/perfil' className="btn_voltar">Voltar</Link>
                               
            </div>

        </div>
    )
}

