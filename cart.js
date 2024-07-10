// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);

// var xhttp = new XMLHttpRequest();
// xhttp.open("GET","https://dummyjson.com/products",true);
// xhttp.send();
// xhttp.onreadystatechange = function(){
//     if(xhttp.readyState == 4 && xhttp.status == 200){
//         var convertedData = JSON.parse(this.responseText);
//         console.log(convertedData)
//     }
// }







// fetch('https://dummyjson.com/carts/user/6')
// .then(res => res.json())
// .then(data => {
//     var dat =data.carts[0].products;
//     var table = document.getElementById("tbody")
//     //console.log(table.innerHTML)
//     for (let i = 0; i < dat.length; i++) {
//     //    const element = array[i];
//         const newRow = table.insertRow();

//         const cell1 = newRow.insertCell(0);
//         const cell2 = newRow.insertCell(1);
//         const cell3 = newRow.insertCell(2);
//         const cell4 = newRow.insertCell(3);
//         const cell5 = newRow.insertCell(4);
//         const cell6 = newRow.insertCell(5);
//         const cell7 = newRow.insertCell(6);

//         cell1.innerHTML = `<img src="${dat[i].thumbnail}" alt="${dat[i].title}">`;
//         cell2.textContent = dat[i].title;
//         cell3.textContent = `$${dat[i].price}`;
//         cell4.innerHTML = `<input type="number" value="${dat[i].quantity}" min="1" onchange="updatequantity(this,${dat[i].id})">`;
//         cell5.textContent = '$'+dat[i].total;
//         cell6.textContent = `$${dat[i].discountedTotal}`;
//         cell7.innerHTML = `<button class="remove" onclick="removeItem(this)">Remove</button>`;
//     }
//     document.getElementById("cart-total").innerText=data.carts[0].total;
// } );






var change = [];



function cart(data) {
  var dat = data.products;
  var table = document.getElementById("tbody")
  table.innerHTML = "";
  //console.log(table.innerHTML)
  for (let i = 0; i < dat.length; i++) {
    //    const element = array[i];
    if (dat[i].quantity > 0) {
      const newRow = table.insertRow();

      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);
      const cell7 = newRow.insertCell(6);

      cell1.innerHTML = `<img src="${dat[i].thumbnail}" alt="${dat[i].title}">`;
      cell2.textContent = dat[i].title;
      cell3.textContent = `$${dat[i].price}`;
      cell4.innerHTML = `<input type="number" value="${dat[i].quantity}" min="1" onchange="updatequantity(this,${dat[i].id},${data.id})">`;
      cell5.textContent = '$' + dat[i].total;
      if (dat[i].discountedTotal == undefined) {
        cell6.textContent = `$${dat[i].discountedPrice}`;
      } else {
        cell6.textContent = `$${dat[i].discountedTotal}`;
      }
      cell7.innerHTML = `<button class="remove" onclick="removeItem(${dat[i].id},${data.id})">Remove</button>`;
    }
  }
  document.getElementById("cart-total").innerText = data.discountedTotal;
}





fetch('https://dummyjson.com/carts/user/6')
  .then(res => res.json())
  .then(data => {
    cart(data.carts[0]);
  });








// fetch('https://dummyjson.com/carts')
// .then(res => res.json())
// .then(console.log);




function updatequantity(quan, idd, cid) {
  // console.log(quan.value)
  // console.log(idd)
  change.push({
    id: idd,
    quantity: quan.value,
  });
  fetch('https://dummyjson.com/carts/' + cid, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merge: true,
      products: change
    })
  })
    .then(res => res.json())
    .then(data => {
      cart(data);
      //    console.log(data);
    });
}





function removeItem(idd, cid) {
  // console.log(idd)
  change.push({
    id: idd,
    quantity: 0,
  });

  fetch('https://dummyjson.com/carts/' + cid, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merge: true,
      products: change
    })
  })
    .then(res => res.json())
    .then(data => {
      cart(data);
      //    console.log(data);
    });
}







fetch('https://dummyjson.com/carts/1')
  .then(res => res.json())
  .then(console.log);




/* adding products in cart with id 1 */
fetch('https://dummyjson.com/carts/1', {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merge: true, // this will include existing products in the cart
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 2,
        quantity: 2,
      },
      {
        id: 1,
        quantity: 5,
      },
    ]
  })
})
  .then(res => res.json())
  .then(console.log);



