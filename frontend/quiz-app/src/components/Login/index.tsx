// 'use client'

// import './login.css'
// import Img from '@/app/fotos_do site/galaxybranca.png'
// import Link from 'next/link'
// import { useState } from 'react';
// import LoginJogador from '@/conexao/loginJogador/loginJogador';

// export const Login = () => {
//     const [nome2, setNome] = useState<string>('');
//     const [senha2, setSenha] = useState<string>('');

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//         e.preventDefault(); // Previne o comportamento padrão do formulário
//         // Aqui você pode chamar uma função para lidar com o submit, se necessário
//     };

//     return(
//         <div className="container-login-bg">
        
//             <div className="container_login">
//                 <img src={Img.src} alt="" /> 
//                 <div className="form-login">
//                     <h1 className="titulo_login">Acesse seu perfil</h1>
//                     <form action="" id="form2" onSubmit={handleSubmit}>
//                         <div className="input2">
//                             <input 
//                                 required 
//                                 className="campo_input2" 
//                                 type="text" 
//                                 id="nome2" 
//                                 value={nome2} 
//                                 onChange={(e) => setNome(e.target.value)} 
//                             />
//                             <label className="label">Nome</label>
//                         </div>
//                         <div className="input2">
//                             <input 
//                                 required 
//                                 className="campo_input2" 
//                                 type="password" 
//                                 id="senha2" 
//                                 value={senha2} 
//                                 onChange={(e) => setSenha(e.target.value)} 
//                             />
//                             <label className="label">Senha</label>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="btn2">
//                     <LoginJogador nome={nome2} senha={senha2} />
//                 </div>
//             </div>

//         </div>
//     )
// }

// 'use client';

// import './login.css';
// import Img from '@/app/fotos_do site/galaxybranca.png';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Use next/navigation em vez de next/router

// export const Login = () => {
//   const [nome, setNome] = useState('');
//   const [senha, setSenha] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // URL do endpoint de login
//       const url = 'http://localhost:3000/jogador/login';
      
//       // Dados que serão enviados no corpo da requisição
//       const data = {
//         nome,
//         senha,
//       };

//       // Fazendo a requisição POST
//       const response = await axios.post(url, data);

//       // Verifique a resposta
//       if (response.status === 200) {
//         // Sucesso no login
//         console.log('Login bem-sucedido:', response.data);
//         router.push('/pages/perfil'); // Redirecionar para a página de perfil
//       } else {
//         // Tratar erro de login
//         setError(response.data.error);
//       }
//     } catch (error) {
//       // Tratando possíveis erros
//       console.error('Erro ao fazer login:', error);
//       setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
//     }
//   };

//   return (
//     <div className="container-login-bg">
//       <div className="container_login">
//         <img src={Img.src} alt="" />
//         <div className="form-login">
//           <h1 className="titulo_login">Acesse seu perfil</h1>
//           <form onSubmit={handleLogin} id="form2">
//             <div className="input2">
//               <input
//                 required
//                 className="campo_input2"
//                 type="text"
//                 id="nome2"
//                 value={nome}
//                 onChange={(e) => setNome(e.target.value)}
//               />
//               <label className="label">Nome</label>
//             </div>
//             <div className="input2">
//               <input
//                 required
//                 className="campo_input2"
//                 type="password"
//                 id="senha2"
//                 value={senha}
//                 onChange={(e) => setSenha(e.target.value)}
//               />
//               <label className="label">Senha</label>
//             </div>
//             <button type="submit" className="btn-entrar">Entrar</button>
//           </form>
//           {error && <p className="error">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';

import './login.css';
import Img from '@/app/fotos_do site/galaxybranca.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const Login = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/jogador/login';
      const data = {
        nome,
        senha,
      };

      const response = await axios.post(url, data);

      if (response.status === 200) {
        // Sucesso no login
        console.log('Login bem-sucedido:', response.data);

        // Armazenar informações no localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.jogador));
        
        // Redirecionar para a página de perfil
        router.push('/pages/perfil');
      } else {
        // Tratar erro de login
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className="container-login-bg">
      <div className="container_login">
        <img src={Img.src} alt="" />
        <div className="form-login">
          <h1 className="titulo_login">Acesse seu perfil</h1>
          <form onSubmit={handleLogin} id="form2">
            <div className="input2">
              <input
                required
                className="campo_input2"
                type="text"
                id="nome2"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <label className="label">Nome</label>
            </div>
            <div className="input2">
              <input
                required
                className="campo_input2"
                type="password"
                id="senha2"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className="label">Senha</label>
            </div>
            <button type="submit" className="btn-entrar">Entrar</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};