import React from 'react';

// Parâmetro para recupera as propriedades de componentes

// Desestruturação 
export default function Header({ children }){
/**
 * Sem desestruturação
 * <h1>{props.title}</h1>
 * export default function Header(props) {
 *  */ 
    return (
        <header>           
            <h1>{children}</h1>
        </header>
    );
}
/**
 * Outra forma de 
 * <Header title = "Semana OminiStack"> - no arquivo App.js
    <h1>{props.title}</h1> - no arquivo Header.js
 */


// uma forma de exportar com o cabeçalho da função: function Header() {
// export default Header;