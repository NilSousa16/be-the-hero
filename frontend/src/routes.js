import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

/**
 * <Switch> - garante que apenas uma rota seja executada
 * BrowserRouter - responsável por gerenciar rotas no reactjs  
 * 
 * <Route path="/" component={Logon} /> - rota padrão para a página de logon
 * 
 * exact - diz que a rota deve ser identica (sem o exact a rota que começar com '/' será a primeira a ser executada) 
 */

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />

                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}