/**
 * Captura e validação dos dados do usuário enviado pelo formulário.
 * @param {*} eventoDoFormulario Objeto de evento do formulário.
 */


 function validarCredenciaisDoUsuario(eventoDoFormulario) {

    // Para não atualizar a página.
    eventoDoFormulario.preventDefault();

    // Destruturando/Separando os campos e-mail e senha do formulário.
    let [email, senha] = eventoDoFormulario.target;

    // Armazena e-mail e senha em variáveis.
    let emailDoUsuario = email.value;
    let senhaDoUsuario = senha.value;

    // Cria um objeto contendo as credenciais do usuário.
    let credenciaisDoUsuario = {
        email: emailDoUsuario,
        password: senhaDoUsuario
    }

    // Requisição de autenticação do usuário.
    loginUsuario(credenciaisDoUsuario);

}

// Services responsáveis pela comunicação com a API.

/**
 * Base do endereço da API.
 * @constant API_URL
 * @type string
*/
const API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

/**
 * Service de autenticação do usuário.
 * @param credenciaisDoUsuario Objeto contendo e-mail e senha.
 * @type { email: string, password: string } 
 */
 function loginUsuario(credenciaisDoUsuario) {
   
    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(credenciaisDoUsuario),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    }
    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/users/login`, configuracoes)
        .then(function (respostaDoServidor) {
            //console.log(respostaDoServidor.ok);
             if (!respostaDoServidor.ok) {
               return new Error('Autenticação falhou!');
             } 
            //console.log(respostaDoServidor.status);

            if (respostaDoServidor.status >= 400 && respostaDoServidor.status < 600) {
                throw new Error('Erro de resposta do servidor!')
            }
            
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();

            //console.log(JSON);
            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
    
            let tokenDoUsuario = respostaDoServidorEmJSON.jwt;
            // Resultado da promessa convertida em JSON. 
            localStorage.setItem('token', tokenDoUsuario);
            pedirInformacoesDoUsuario(tokenDoUsuario);
            redirecionarPagina();
            
        })
        .catch(function(Error) { 
            console.log('Erro ao autenticar: ' + Error.message)}
        );
}


 /**
 * Pedi os dados de cadastro do usuário.
 * @param {string} tokenDoUsuario Token JWT da autenticação do usuário.
 */
  function pedirInformacoesDoUsuario(tokenDoUsuario) {

    // Configurações da requisição GET.
    let configuracoes = {
        method: 'GET',
        headers: {
            'authorization': tokenDoUsuario
        },
    }

    // Requisição para retorno dos dados de cadastro do usuário.
    fetch(`${API_URL}/users/getMe/`, configuracoes)
        .then(function (respostaDoServidor) {
                
            // Retorno apenas dos dados convertidos em JSON.
            let JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {

            
            localStorage.setItem('@User', respostaDoServidorEmJSON)

            
            // Apresentando resultado final no console.log().
            console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);

        });

}





function redirecionarPagina() {
    var URL_LISTA = "/list.html";
    window.location.pathname = URL_LISTA;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





function pedirUmaTarefa(idDaTarefa) {
    
    // URL(https://jsonplaceholder.typicode.com/posts/1)
    fetch(`${API_URL}/tasks/${idDaTarefa}`)
        .then(function (respostaDoServidor) {
            
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
            // Resultado da promessa convertida em JSON. 
            console.log('GET pedirUmaTarefa() \n', respostaDoServidorEmJSON)
        });
}

function substituirUmaTarefa(idDaTarefa, corpoDaTarefa) {

    var configuracoes = {
        method: 'PUT',
        body: JSON.stringify(corpoDaTarefa),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
        
    // URL(https://jsonplaceholder.typicode.com/posts/1)
    fetch(`${API_URL}/tasks/${idDaTarefa}`, configuracoes)
        .then(function (respostaDoServidor) {
                        
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 
    
            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
                
            // Resultado da promessa convertida em JSON. 
            console.log('PUT substituirUmaTarefa() \n', respostaDoServidorEmJSON)
        });
}

function atualizarUmaTarefa(idDaTarefa, corpoDaTarefa) {

    var configuracoes = {
        method: 'PATCH',
        body: JSON.stringify(corpoDaTarefa),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    
    // URL(https://jsonplaceholder.typicode.com/posts/1)
    fetch(`${API_URL}/tasks/${idDaTarefa}`, configuracoes)
        .then(function (respostaDoServidor) {
                    
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
            // Resultado da promessa convertida em JSON. 
            console.log('PATCH atualizarUmaTarefa() \n', respostaDoServidorEmJSON)
        });
}

function deletarUmaTarefa(idDaTarefa) {

    var configuracoes = {
        method: 'DELETE'
    }

    // URL(https://jsonplaceholder.typicode.com/posts/1)
    fetch(`${API_URL}/tasks/${idDaTarefa}`, configuracoes)
        .then(function (respostaDoServidor) {
                        
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
                
            // Resultado da promessa convertida em JSON. 
            console.log('DELETE deletarUmaTarefa() \n',respostaDoServidorEmJSON)
        });

}
