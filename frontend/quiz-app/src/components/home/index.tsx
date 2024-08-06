import React from 'react'
import './home.css'
import Image from '@/app/fotos_do site/venus.png'
import Link from 'next/link'


export const Home = () => {
    return(
        <div className="container-bg">
            <div className="container">
                <div className="container-inicial">
                    <h1 className='titulo_inicial'>Teste seus conhecimentos em astronomia básica!</h1>
                    <Link href='/pages/login'><button className="botao">Começar</button></Link>
                </div>
                <div className="container-img">                    
                    <img src={Image.src} className='planeta'/>
                </div> 
            </div>
        </div>
    )
}

