const form = document.getElementById('bookingForm');
const price = document.getElementById('price');
const dish = document.getElementById('dish');
const table = document.getElementById('table');
const orderList = document.getElementById('orderList');
const apiEndpoint = 'https://crudcrud.com/api/edcec8bf8ff040c888d09771fec4d5df/orders';

window.addEventListener('DOMContentLoaded', ()=>{
    axios.get(apiEndpoint)
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            showOrderOnScreen(response.data[i]);
        }
    })
    .catch((error)=>{
        console.error('Error fetching orderes:', error);
    });
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    axios.post(apiEndpoint, {
        price: price.value,
        dish: dish.value,
        table: table.value
    })
    .then((response)=>{
        showOrderOnScreen(response.data);
        form.reset();
    })
    .catch((error)=>{
        console.error("Error saving the order:", error);
    });
});

function showOrderOnScreen(order){
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.id= order._id;
    li.innerHTML = `
        <span><strong>${order.table}</strong>: ${order.dish} - ₹${order.price}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteOrder('${order._id}')">Delete</button>
    `;
    
    orderList.appendChild(li);
}

function deleteOrder(orderId){
    const specificURL = `${apiEndpoint}/${orderId}`
    axios.delete(specificURL)
    .then(()=>{
        const li = document.getElementById(orderId);
        if(li){
            orderList.removeChild(li);
        }
    })
    .catch((error)=>{
        console.error("Error deleting order:", error);
    });
}
    