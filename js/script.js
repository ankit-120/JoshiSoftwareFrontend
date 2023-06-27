let login = document.getElementById('login');
login.onclick = async(e) =>{
    e.preventDefault();
    let userId = document.getElementById('userId').value;
    let password = document.getElementById('password').value;
    
    let user={
        userId:userId,
        password:password
    };
    console.log(user);
    let data=JSON.stringify(user);
    let options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body:data
    }

    let response= await fetch(`https://joshisoftware-production.up.railway.app/joshiSoftware/login/`,options);
    if(response.status == 200){
        let res= await response.json();
        console.log(res);
        sessionStorage.setItem('user',JSON.stringify(res));
        if(res.isAdmin != 1){
            window.location.href = 'customer.html';
        }
        else{
            window.location.href = 'adminHome.html'
        }
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