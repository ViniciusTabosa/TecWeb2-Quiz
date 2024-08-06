import Link from 'next/link'
import './globals.css'
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
              <Link href='/pages/login'>
                <li>
                  <a href="/" className="btn-Entar">Entrar</a>
                </li>
              </Link>
              <Link href='/pages/cadastro'><li><a href="/" className="btn-Conta">Criar conta</a></li></Link>
              
              
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