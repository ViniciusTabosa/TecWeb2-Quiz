import React from 'react'
import './home.css'
import Image from '@/app/fotos_do site/venus.png'


export const Home = () => {
    return(
        <div className="container-bg">
            <div className="container">
                <div className="container-inicial">
                    <h1 className='titulo_inicial'>Teste seus conhecimentos em astronomia básica!</h1>
                    <button className="botao">Começar</button>
                </div>
                <div className="container-img">                    
                    <img src={Image.src} className='planeta'/>
                </div> 
            </div>
        </div>
    )
}

