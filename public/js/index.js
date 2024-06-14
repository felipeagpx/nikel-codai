const minhaModal = new bootstrap.Modal("#register-modal");
let logado = sessionStorage.getItem("logado");
const session = localStorage.getItem("session");

checarLogado();

//Logar no Sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("senha-login").value;
    const checkSession = document.getElementById("session-check").checked;

    const conta = getConta(email);

    if(!conta){
        alert("Ops, verifique o usuário ou a senha.");
        return;
    }

    if(conta){
        if(conta.senha !== senha){
            alert("Ops, verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";        
    }
    
});

//Criar Conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;
    
    if(email.length < 5){
        alert("Insira um e-mail válido.");
        return;
    }
    
    if(senha.length < 4){
        alert("A senha deve ter no mínimo 4 caracteres.");
        return;
    }
    
    salvarConta({
        email: email,
        senha: senha,
        transaction: []
    });

    minhaModal.hide();
    
    alert("Conta criada com sucesso.");  
});

function checarLogado (){
    if(session){
        sessionStorage.setItem("logado", session);
        logado = session;
    }
    if(logado){
        saveSession(logado, session);

        window.location.href = "home.html"
    }
}

function salvarConta (data){
    localStorage.setItem(data.email, JSON.stringify(data));
}

function saveSession(email, checkSession){
    if(checkSession){
        localStorage.setItem("session", email);
    }
    sessionStorage.setItem("logado", email);
}

function getConta (key){
    const conta = localStorage.getItem(key);

    if(conta){
        return JSON.parse(conta);
    }

    return "";
}