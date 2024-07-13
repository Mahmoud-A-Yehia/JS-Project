
var change= [{
  id: 190,
  quantity:0,
},{
  id: 94,
  quantity:0,
}];

console.log(change)
let local=localStorage.getItem('cart');
let loc = JSON.parse(local);
// let loc = local.split(',');
loc.forEach(element => {
  change.push(element)
});

console.log(change)






function cart(data){
    var dat =data.products;
    var table = document.getElementById("tbody")
    table.innerHTML="";
    //console.log(table.innerHTML)
    for (let i = 0; i < dat.length; i++) {
    //    const element = array[i];
    if(dat[i].quantity>0){
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
        cell5.textContent = '$'+dat[i].total;
        if(dat[i].discountedTotal==undefined){
        cell6.textContent = `$${dat[i].discountedPrice}`;
        }else{
        cell6.textContent = `$${dat[i].discountedTotal}`;
        }
        cell7.innerHTML = `<button class="remove" onclick="removeItem(${dat[i].id},${data.id})">Remove</button>`;
    }
    }
    document.getElementById("cart-total").innerText=data.discountedTotal;
}





/////
fetch('https://dummyjson.com/carts/10', {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merge: true, // this will include existing products in the cart
    products: change
  })
})
.then(res => res.json())
.then(data => {
  cart(data);
  });

  
// fetch('https://dummyjson.com/carts/10')
// .then(res => res.json())
// .then(data => {
// cart(data);
// } );





// fetch('https://dummyjson.com/carts')
// .then(res => res.json())
// .then(console.log);




function updatequantity(quan,idd,cid){
    // console.log(quan.value)
    // console.log(idd)
    for (let i = 0; i < change.length; i++) {
      if(change[i].id== idd){
        change.splice(i,1,{
              id: idd,
              quantity: quan.value,
            })
            break;
      }
      
    }
    localStorage.setItem('cart', JSON.stringify(change))
// change.push({
//     id: idd,
//     quantity: quan.value,
//   });
fetch('https://dummyjson.com/carts/'+cid,{
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
    } );
}





function removeItem(idd,cid){
    // console.log(idd)

    for (let i = 0; i < change.length; i++) {
      if(change[i].id== idd){
        change.splice(i,1)
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(change))
    // change.push({
    //     id: idd,
    //     quantity: 0,
    //   });

fetch('https://dummyjson.com/carts/'+cid,{
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
    console.log(change)
    console.log(data)
    });
}






