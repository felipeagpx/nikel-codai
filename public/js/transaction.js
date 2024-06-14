const minhaModal = new bootstrap.Modal("#transaction-modal");
let logado = sessionStorage.getItem("logado");
const session = localStorage.getItem("session");

let data = {
    transaction: []
};

checarLogado();

document.getElementById("btn-logout").addEventListener("click", logout);

//Adicionar Lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transaction.unshift({
        value: value, description: description, date: date, type: type
    });

    saveData(data);

    e.target.reset();
    minhaModal.hide();

    getLancamentos();
    
    alert("Lançamento adicionado com sucesso.")

});

function checarLogado (){
    if(session){
        sessionStorage.setItem("logado", session);
        logado = session;        
    }

    if(!logado){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logado);

    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getLancamentos();
        
}

function logout (){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");
    
    window.location.href = "index.html";
}

function getLancamentos (){
    const transaction = data.transaction;
    let transactionHtml = ``;
    
    if(transaction.length){
        transaction.forEach((item) => {
            let type = "Entrada";
            
            if(item.type === "2"){
                type = "Saída";
            }
            
            transactionHtml += `
            <tr>
            <td scope="row">${item.date}</td>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.description}</td>
            </tr> 
            `; 
        });
    }

    document.getElementById("transaction-list").innerHTML = transactionHtml;

}

function saveData (data){
    localStorage.setItem(data.email, JSON.stringify(data));
}