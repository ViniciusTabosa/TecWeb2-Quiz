import Link from 'next/link'
import  './globals.css'
import Logo from '@/app/fotos_do site/Starion_Logo2.png'

export const Fundo = () => {
  return(
    <>
      <header className='header-bg'>
        <div className="logo">
          <img src={Logo.src} alt="" />
        </div>
        
        <nav className="nav">
          <ul>
            <li>
              <Link href='/pages/login' className="btn-Entar">                
                Entrar              
              </Link>
            </li>
            <li>  
              <Link href='/pages/cadastro' className="btn-Conta">
                Criar conta
              </Link>
            </li>             
          </ul>
        </nav>
      </header>

      <div className="estrela"></div>
      <div className="estrela2"></div>
      <div className="estrela3"></div>
      <div className="estrela4"></div>
    </>
  )
}