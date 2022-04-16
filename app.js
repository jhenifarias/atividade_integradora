window.onload = function() {

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
    function criarUmUsuario(usuario) {

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

    function redirecionarPagina() {
        paginatual = window.location.href;
        window.location.replace(`${paginatual}/atividade-integradora/list/index.html`);
    };

    function loginUsuario(eventoDoFormulario) {

        var configuracoes = {
            method: 'POST',
            body: JSON.stringify(eventoDoFormulario),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
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

                let tokenDoUsuario = respostaDoServidorEmJSON.jwt;
                
                // Resultado da promessa convertida em JSON. 
                localStorage.setItem('token', tokenDoUsuario);

                pedirInformacoesDoUsuario(tokenDoUsuario);
            });
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
                
                // Apresentando resultado final no console.log().
                console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);

                pedirTodasTarefas();

            });

    }

    function criarUmaTarefa(corpoDaTarefa) {

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
        
            // Configurações da requisição GET.
        let configuracoes = {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token')
            },
        }

        // URL(https://jsonplaceholder.typicode.com/posts)
        fetch(`${API_URL}/tasks`, configuracoes)
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
        
        let configuracoes = {
            method: 'GET',
            headers: {
                'authorization': tokenDoUsuario
            },
        }

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

};


