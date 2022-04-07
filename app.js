

/* 
    Métodos HTTP 
    
        - Get: Pedir o retorno de um objeto ou mais.
        - Post: Criar um novo objeto.
        - Put: Atualizar o objeto.
        - Path: Atualizar parcialmente do objeto.
        - Delete: Deletar o objeto.

*/

var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

var user = {
    "firstName": "Fulano",
    "lastName": "Silva",
    "email": "fulano.silva@gmail.com",
    "password": "12345"
  }

criarUmUsuario(user);

var login = {
    "email": "fulano.silva@gmail.com",
    "password": "12345"
}

loginUsuario(login);

// GET
pedirTodasTarefas();

// GET
var idDaTarefa = 1;

pedirUmaTarefa(1);

// PUT
var novaTarefa = {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
}

var corpodaTarefa = {
    "description": "Aprender Javascript",
    "completed": false
  }
  
criarUmaTarefa(corpodaTarefa)

substituirUmaTarefa(idDaTarefa, novaTarefa);

// PATCH
var TarefaAtualizada = {
    title: 'foo'
}

atualizarUmaTarefa(idDaTarefa, TarefaAtualizada);

// DELETE
deletarUmaTarefa(idDaTarefa);

function criarUmUsuario(usuario) {

    /*
        Configurações do pedido:

        - method: Qual será o método utilizado? Get, Post, Put, Delete... 
        - body: Quais informações deseja enviar? 
        - headers: Quais os formatos e configurações do que deseja enviar?

    */
    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    // URL(https://jsonplaceholder.typicode.com/posts)
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
            
            // Resultado da promessa convertida em JSON. 
            console.log('POST criarUmUsuario() \n', respostaDoServidorEmJSON)
        });
}

function loginUsuario(login) {

    /*
        Configurações do pedido:

        - method: Qual será o método utilizado? Get, Post, Put, Delete... 
        - body: Quais informações deseja enviar? 
        - headers: Quais os formatos e configurações do que deseja enviar?

    */
    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/users/login`, configuracoes)
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
            console.log('POST loginUsuario() \n', respostaDoServidorEmJSON)
            return respostaDoServidorEmJSON;
        });
}

function criarUmaTarefa(corpoDaTarefa) {

    /*
        Configurações do pedido:

        - method: Qual será o método utilizado? Get, Post, Put, Delete... 
        - body: Quais informações deseja enviar? 
        - headers: Quais os formatos e configurações do que deseja enviar?

    */
    var configuracoes = {
        method: 'POST',
        body: JSON.stringify(corpoDaTarefa),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    console.log(configuracoes);

    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/tasks/`, configuracoes)
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
            console.log('POST criarUmaTarefa() \n', respostaDoServidorEmJSON)
        });
}

function pedirTodasTarefas() {

    // URL(https://jsonplaceholder.typicode.com/posts)
    fetch(`${API_URL}/tasks`)
        .then(function (respostaDoServidor) {
            
            // Retorno apenas dos dados convertidos em JSON.
            var JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then(function (respostaDoServidorEmJSON) {
            
            // Resultado da promessa convertida em JSON. 
            console.log('GET pedirTodasTarefas() \n', respostaDoServidorEmJSON)
        });
}

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

    /*
        Configurações do pedido:

        - method: Qual será o método utilizado? Get, Post, Put, Delete... 
        - body: Quais informações deseja enviar? 
        - headers: Quais os formatos e configurações do que deseja enviar?

    */
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

