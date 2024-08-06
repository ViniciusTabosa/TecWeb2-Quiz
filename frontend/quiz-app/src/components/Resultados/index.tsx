import './resultados.css'

export const Resultados = () => {
    return(
        <div className="container_login2_bg">
    
            <div className="container_login2">
                <div className="result_pessoal">
                    <h2>Pontuação Pessoal</h2>
                    <div className="desc">
                        <h4>Nome</h4>
                        <span>Pontuação</span>
                    </div>
                </div>

                <div className="result_global">
                    <h2>Ranking Geral</h2>
                    <div className="desc">
                        <h4>Jogador</h4>
                        <span>Resultado</span>
                    </div>
                </div>

            </div>
            <div className="botaos">
                <button className="btn_voltar">Voltar</button>
                <button className="btn_jogar">Jogar</button>
                <button className="btn_deletar">Deletar conta</button>
            </div>

        </div>
    )
}