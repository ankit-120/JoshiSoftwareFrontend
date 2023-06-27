//to check if customer has already filled forms
let options={
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        }
}
let userData = JSON.parse(sessionStorage.getItem('user'));
let id = userData.userId.slice(-1);

// async function getFormData(){
//     let response = await fetch(`http://localhost:8080/joshiSoftware/item/${id}`,options);
//     let data = await response.json();
//     console.log(data);
//     if(data.isFilled == 1){
//         console.log('inside');
//         document.getElementById('main-div').style.display = "none";
//         document.getElementById('form-filled').style.display = 'flex';
//     }
// }
// getFormData();

//to save data to database
let submit = document.getElementById('submit');
submit.onclick = async(e) =>{
    e.preventDefault();
    let orderDate = document.getElementById('orderDate').value;
    let company = document.getElementById('company').value;
    let owner = document.getElementById('owner').value;
    let item = document.getElementById('item').value;
    let quantity = document.getElementById('quantity').value;
    let weight = document.getElementById('weight').value;
    let shipment = document.getElementById('shipment').value;
    let trackingId = document.getElementById('trackingId').value;
    let size = document.getElementById('size').value;
    let boxCount = document.getElementById('boxCount').value;
    let specification = document.getElementById('specification').value;
    let checklist = document.getElementById('checklist').value;


    if(!validateForm(orderDate,company,owner,item,quantity,weight,shipment,trackingId,size,boxCount,specification,checklist)){
        return;
    }

    
    let items={
        orderDate:orderDate,
        company:company,
        owner:owner,
        item:item,
        quantity:quantity,
        weight:weight,
        shipment:shipment,
        trackingId:trackingId,
        size:size,
        boxCount:boxCount,
        specification:specification,
        checklist:checklist,
        customer:id
    };
    console.log(items);
    let data=JSON.stringify(items);
    let options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body:data
    }

    let response= await fetch(`https://joshisoftware-production.up.railway.app/joshiSoftware/item/`,options);
    if(response.status == 201){
        let res= await response.json();
        console.log(res);
        document.getElementById('main-div').style.display = "none";
        document.getElementById('form-filled').style.display = 'flex';
    }else{
        console.log("error")
        let res= await response.json();
        console.log(res.message)
        let alertBox = document.getElementById('alert-box');
        alertBox.innerText = res.message;
        setTimeout(()=>{
            alertBox.innerText = '';
        },3000);
    }
}


//form validation
function validateForm(orderDate,company,owner,item,quantity,weight,shipment,trackingId,size,boxCount,specification,checklist){
    let alphanumericRegex = /^[a-zA-Z0-9]+$/;
    let flag = true;
    if(!alphanumericRegex.test(company)){
        document.getElementById('error-company').innerHTML='<i class="bi bi-exclamation-triangle-fill"></i>Only alphanumeric allowed';
        flag = false;
        setTimeout(()=>{
            document.getElementById('error-company').innerHTML="";
        },3000);
    }
    if(!alphanumericRegex.test(owner)){
        document.getElementById('error-owner').innerHTML='<i class="bi bi-exclamation-triangle-fill"></i>Only alphanumeric allowed';
        flag = false;
        setTimeout(()=>{
            document.getElementById('error-owner').innerHTML="";
        },3000);
    }
    let integerRegex = /^\d+$/;
    if(!integerRegex.test(quantity)){
        document.getElementById('error-quantity').innerHTML='<i class="bi bi-exclamation-triangle-fill"></i>Enter valid integer'
        flag = false;
        setTimeout(()=>{
            document.getElementById('error-quantity').innerHTML="";
        },3000);
    }
    let parsedFloat = parseFloat(weight);
    if(isNaN(parsedFloat)){
        document.getElementById('error-weight').innerHTML='<i class="bi bi-exclamation-triangle-fill"></i>Enter valid number'
        flag = false;
        setTimeout(()=>{
            document.getElementById('error-weight').innerHTML="";
        },3000);
    }
    if(!integerRegex.test(quantity)){
        document.getElementById('error-boxCount').innerHTML='<i class="bi bi-exclamation-triangle-fill"></i>Enter valid integer'
        flag = false;
        setTimeout(()=>{
            document.getElementById('error-boxCount').innerHTML="";
        },3000);
    }
    return flag;
}

//to logout
let logout = document.getElementById('logout');
logout.onclick = () =>{
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}

let back = document.getElementById('back');
back.onclick = () =>{
    window.location.href = 'customer.html'
}