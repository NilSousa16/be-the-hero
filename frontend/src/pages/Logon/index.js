import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiLogIn } from 'react-icons/fi'; //import de icone

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const[id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            // Envio do Id via API para o back end
            const response = await api.post('sessions', { id });

            // Armazenando informações do id e do nome da instituição
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            // Responsável por redirecionamentos da página
            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}