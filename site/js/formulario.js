function initMap() {
    /* A função initMap inicializa e adiciona o mapa quando a página da Web carrega. S*/

    var local = {lat: -6.8898741999999995, lng: -38.544510599999995};
    /* Longitute e latituade */
    var map = new google.maps.Map(document.getElementById('map'), {
        /*Adiciona um novo objeto do Google Maps para construir um mapa no elemento div.*/
        zoom: 4,
        center: local  /*A propriedade center informa a API a localização do ponto central do mapa. */
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) { // Pede a localização/autorização
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Localização encontrada"); // informa se a localização foi encontrada
            map.setCenter(pos); // mostar a localização centralizada na tela 

            var marker = new google.maps.Marker({
                /* Adiciona um marcador no mapa e O position propriedade define a posição do marcador.*/
                position: pos,
                map: map
            });
        });


    } else {
        alert("Geolocation is not supported by this browser.");
    }

}

//VALIDACOES
function validarCpf(cpf) {
    var expReg2 = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2} $/;
    if (expReg2.test(cpf) != false) return true;
    else return false;
}

function validarTelefone(telefone) {
    var expRegT = /^\([0-9]{2}\) [0-9]{4,5}\-?[0-9]{4}$/;
    if (expRegT.test(telefone) != false) return true;
    else return false;
}

function validarData(data) {
    var expRegD = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
    if (expRegD.test(data) != false) return true;
    else return false;
}

function validarCep(cep) {
    var expRegC = /^[0-9]{5}\-?[0-9]{3}$/;
    if (expRegC.test(data) != false) return true;
    else return false;
}

function validarRg(rg) {
    var expRegRG = /^[0-9]{2}\.[0-9]{3}\.[0-9]-[0-9]{1}$/;
    if (expRegRG.test(rg) != false) return true;
    else return false;
}


// ARMAZENAMENTO

function verificarCadastro() {
    // PEGA OS VALORES DE CADA INPUT
    var nome_Usuario = document.getElementById('nome').value;
    var cpf_Usuario = document.getElementById('cpf').value;
    var rua_Usuario = document.getElementById('rua').value;
    var data_Nasc_Usuario = document.getElementById('data').value;
    var bairro_Usuario = document.getElementById('bairro').value;
    var numero_Usuario = document.getElementById('numero_casa').value;
    var telefone_Usuario = document.getElementById('telefone').value;
    var cep_Usuario = document.getElementById('cep').value;
    var rg_Usuario = document.getElementById('rg').value;
    var email_Usuario = document.getElementById('email').value;
    var senha_Usuario = document.getElementById('senha').value;
    // var foto_Usuario = document.getElementById('foto_perfil').value;

    // TESTA SE OS CAMPOS ESTAO PREENchidoS OU NAO
    if ((nome_Usuario != "") && (cpf_Usuario != "") && (rua_Usuario != "") && (data_Nasc_Usuario != "") && (bairro_Usuario != "") && (numero_Usuario != "") && (telefone_Usuario != "") && (cep_Usuario != "") && (rg_Usuario != "") && (email_Usuario != "") && (senha_Usuario != "")) {
        armazenarDados(email_Usuario, senha_Usuario);
        $('form').attr("action", "index.html");
    } else {
        if (document.getElementById('nome').value == "") {
            alert("O Campo nome é obrigatório!");
            return false;
        }
        if (validarCpf(document.getElementById('cpf').value) == false) {
            alert("O Campo CPF é obrigatório!");
            return false;
        }
        if (document.getElementById('rua').value == "") {
            alert("O Campo Endereco é obrigatório!");
            return false;
        }
        if (validarData(document.getElementById('data').value) == false) {
            alert("O Campo Data de Nascimento é obrigatório!");
            return false;
        }
        if (document.getElementById('bairro').value == "") {
            alert("O Campo Bairro é obrigatório!");
            return false;
        }
        if (document.getElementById('numero_casa').value == "") {
            alert("O Campo Numero é obrigatório!");
            return false;
        }
        if (validarTelefone(document.getElementById('telefone').value) == false) {
            alert("O Campo Telefone é obrigatório!");
            return false;
        }
        if (validarCep(document.getElementById('cep').value) == false) {
            alert("O Campo CEP é obrigatório!");
            return false;
        }
        if (validarRg(document.getElementById('rg').value) == false) {
            alert("O Campo RG é obrigatório!");
            return false;
        }
    }
}

function armazenarDados(email_Usuario, senha_Usuario) { // Passo os parametros que vao ser armazenados
    var info = [email_Usuario, senha_Usuario];			// Armazenando o EMAIL e a SENHA do usuario
    localStorage.setItem(email_Usuario, info);			// Guardando o Info no localstorage
    console.log(localStorage.getItem(email_Usuario));
}

function verificarChave(usuario) {			// Passo o parametro usuario que contem o vetor com duas posicoes
    var senha = prompt("Digite sua senha");	// Informar a senha e armazena-la
    console.log(usuario);
    if (senha == usuario[1]) {				// Verifica se a senha confere com a senha do parametro usuario
        alert("Usuario logado");			// Se conferir o Usuario está logado
    } else {
        alert("Senha incorreta");           // Caso Nao estejá o Usuario errou a senha
        verificarChave(usuario);
    }
}

function login() {
    var chave = prompt("Digite seu email");  // Pega uma chave de acesso (EMAIL)
    var usuario = localStorage.getItem(chave);	// Guarda em uma variavel (USUARIO) o item do localstorage (CHAVE = EMAIL)
    if (usuario != null) {							// Verifica se o USUARIO existe
        usuario = usuario.split(',');        	// Se existir : como no vetor e separado por virgula SPLIT separa em duas posicoes (0,1) referente a EMAIL e SENHA
        verificarChave(usuario);				// Chama a Funcao de verificar se a senha está correta
        ///
    } else {
        alert("Usuario não cadastrado");
        login();
    }
}


//imagem do formulário
$(function () {
    $(document).on("change", ".Upload", function (e) {
        showThumbnail(this.files);
    });

    function showThumbnail(files) {
        if (files && files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#thumbnail').attr('src', e.target.result);
            }

            reader.readAsDataURL(files[0]);
        }
    }
});