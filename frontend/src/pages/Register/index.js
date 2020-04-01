import React, { useState } from 'react';
// useHistory - utilizado para realizar navegação
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// Realiza a conexão com o back end
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    // Utilizado para navegação
    const history = useHistory();

    // Disparada ao se realizar um submit
    async function handleRegister(e) {
        e.preventDefault(); // evita que a página seja totalmente recarregada
        
        //Objeto javascript
        const data = {
            name, 
            email, 
            whatsapp, 
            city, 
            uf
        };
        /**
         * Verifica se o cadastro funcionou
         */
        try {
            /**
             * chama a api e realiza o cadastro
             * os dados já são enviados em json
             *  */ 
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            // Retorna para a raiz
            history.push('/');
        } catch (error) {
            alert(`Erro no cadastro, tente novamente.`);
        }        
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        /> 
                        <input 
                            placeholder="UF" 
                            style={{ width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}