let options={
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        }
}

async function getItems(){
    let response = await fetch(`http://localhost:8080/joshiSoftware/item/`,options);
    let data = await response.json();
    console.log(data);
    // console.log(JSON.parse(data).length)

    let head = ['Quantity','Weight','Box Count'];
    let content = ['quantity','weight','boxCount'];

    //creating dynamic table
    let tableBody = document.getElementById('tableBody');
    for(let i=0;i<3;i++){
        let tr = document.createElement('tr');
        let cols = "";
        cols += `<td><strong>${head[i]}</strong></td>`;
        cols += `<td>${data[0][content[i]]}</td>`;
        cols += `<td>${data[1][content[i]]}</td>`;
        cols += `<td>${data[0][content[i]] + data[1][content[i]]}</td>`;
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
