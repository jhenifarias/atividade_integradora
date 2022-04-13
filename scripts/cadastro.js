const API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

// CRUD - CRIAR USUARIO
function cadastrarUser (){
    // Função é acionada no DOM pega valores do input e aciona a função CriarUmUsuario passando a const usuario
    const usuario = {
        firstName: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value     
     }
     criarUmUsuario(usuario)
}

function criarUmUsuario(usuario) {

    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    // API_URL('https://ctd-todo-api.herokuapp.com/v1')
    fetch(`${API_URL}/users/`, configuracoes)
        .then(function (respostaDoServidor) {
                
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();
            // Nota: Você pode ter acesso ao corpo da informação sem convertê-la:
            // respostaDoServidor.body(); 

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {

            var URL_LISTA = "/index.html";
            window.location.pathname = URL_LISTA;
            
            // Resultado da promessa convertida em JSON.
            console.log('POST criarUmUsuario() \n', respostaDoServidorEmJSON)
        });
}



// Eventos

document.getElementById('btnCadastrar')
    .addEventListener('click', cadastrarUser)