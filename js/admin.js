let options={
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        }
}

async function getItems(){
    let response = await fetch(`http://localhost:8080/joshiSoftware/item/`,options);
    let data = await response.json();
    console.log(data.length);
    let len = data.length;
    let c1 = [0,0,0];
    let c2= [0,0,0];
    for(let i=0;i<len;i++){
        console.log(data[i].customer)
        if(data[i].customer == 1){
            c1[0]+=data[i].quantity;
            c1[1]+=data[i].weight;
            c1[2]+=data[i].boxCount;
        }
        else{
            c2[0]+=data[i].quantity;
            c2[1]+=data[i].weight;
            c2[2]+=data[i].boxCount;
        }
    }
    // console.log(JSON.parse(data).length)

    let head = ['Quantity','Weight','Box Count'];
    // let content = ['quantity','weight','boxCount'];

    //creating dynamic table
    let tableBody = document.getElementById('tableBody');
    for(let i=0;i<3;i++){
        let tr = document.createElement('tr');
        let cols = "";
        cols += `<td><strong>${head[i]}</strong></td>`;
        cols += `<td>${c1[i]}</td>`;
        cols += `<td>${c2[i]}</td>`;
        cols += `<td>${c1[i] + c2[i]}</td>`;
        tr.innerHTML = cols;
        tableBody.appendChild(tr);
    }
}
getItems()

//logout
let logout = document.getElementById('logout');
logout.onclick = () =>{
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}
