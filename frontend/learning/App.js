import React, { useState }  from 'react'; // useState - utilizado para modificar o estado de uma variável

import Header from './Header';

// Componente - função no JavaScript que retorna um HTML que pode ter funcionalidade JS, CSS, etc. (Nome de componente sempre começa com letra maiúscula)
// JSX (JavaScript XML) - HTML integrado dentro do JavaScript
// Propriedade - similar aos atribudos HTML
function App() {
  /**
   * Conceitos de estado e imudabilidade
   * Toda vez que um componente precise armazenar uma informação dentro dele deverá ser criado um estado, que permitirá alterar as informações e refletir essa alteração na interface
   * 
   * useState - retorna um array com o valor e uma função para modificação
   * 
   *  */   
  const [counter, setCounter] = useState(0); 
 

  function increment() {
    setCounter(counter + 1 );
  }

  return (
    // propriedade title
    <div>
      <Header>
        Contador: {counter} 
      </Header>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
