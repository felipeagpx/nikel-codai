const minhaModal = new bootstrap.Modal("#transaction-modal");
let logado = sessionStorage.getItem("logado");
const session = localStorage.getItem("session");

let data = {
    transaction: []
};

checarLogado();

document.getElementById("btn-logout").addEventListener("click", logout);
document.getElementById("btn-transaction").addEventListener("click", function(){
    window.location.href = "transaction.html"
});

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
    getCashIn();
    getCashOut();
    getSaldo();

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
    
    getCashIn();
    getCashOut();
    getSaldo();

}

function logout (){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");
    
    window.location.href = "index.html";
}

function getCashIn (){
    const transaction= data.transaction;

    const cashIn = transaction.filter((item)=> item.type === "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;
        
        if(cashIn.length > 5){
            limit = 5;
        }else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {

            cashInHtml += `

            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>${cashIn[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            `;            
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;

    }

}

function getCashOut (){
    const transaction = data.transaction;

    const cashOut = transaction.filter((item)=> item.type === "2");

    if(cashOut.length){
        let cashOutHtml = ``;
        let limit = 0;
        
        if(cashOut.length > 5){
            limit = 5;
        }else {
            limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {

            cashOutHtml += `

            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>${cashOut[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            `;            
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
        
    }
    
}

function getSaldo (){

    const transaction = data.transaction;
    let saldo = 0;
    
    transaction.forEach((item) => {
        
        if(item.type === "1"){
            saldo += item.value;
        }else{
            saldo -= item.value;
        }
        
    });
    
    document.getElementById("saldo-cash").innerHTML = `R$ ${saldo.toFixed(2)}`;

}

function saveData (data){
    localStorage.setItem(data.email, JSON.stringify(data));
}