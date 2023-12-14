var crudcrud = 'dfb1da57683f4417bf7eafe3fe62795f'

async function saveLocal(event){
    event.preventDefault();
    const item_name = event.target.item_name.value;
    const descrip = event.target.descrip.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    
    const inventoryData = {
        item_name,
        descrip,
        price,
        quantity
    };
    try {
        const res = await axios.post('https://crudcrud.com/api/'+crudcrud+'/inventoryData', inventoryData);
        showUser(res.data);
    } catch (err) {
        console.error(err);
    }
}
function showUser(inventoryData){
    const parent = document.getElementById('users');
    const child = document.createElement('li');
    child.innerHTML = inventoryData.item_name + ' - ' + inventoryData.descrip + ' - ' + inventoryData.price + ' - ' +`<span id="dynaquantity-${inventoryData._id}">`+ inventoryData.quantity +'</span>';
    
    const deleteBtn = document.createElement('input');
    const editBtn = document.createElement('input');
    const buyOne = document.createElement('input');
    const buyTwo =  document.createElement('input');
    const buyThree =  document.createElement('input');

    buyOne.type = 'button';
    buyOne.value = 'Buy 1'
    buyOne.setAttribute('class','btn btn-outline-primary')
    buyOne.onclick = async() => {
        try{
            const id = inventoryData._id;
            url = 'https://crudcrud.com/api/'+crudcrud+'/inventoryData/' + id;

            const currentQuantity = await axios.get(url);
            const updatedQuantity = currentQuantity.data.quantity - 1;
            console.log(updatedQuantity)

            if (updatedQuantity < 5) {
                alert("Quantity is running low!");
                return;
            }

            const updatedData = {
                quantity: updatedQuantity
            };

            
            updatedData.item_name = inventoryData.item_name;
            updatedData.descrip = inventoryData.descrip;
            updatedData.price = inventoryData.price;

            const res = await axios.put(url, updatedData)
            const quantityId = `dynaquantity-${id}`
            var quantityElement = document.getElementById(quantityId);
            console.log(quantityElement)
            var current = parseInt(quantityElement.innerText);
            var newQuantity = current - 1;
            quantityElement.innerText = newQuantity;
            
        }
        catch(err){
                console.error(err);
            };
            
    }


      buyTwo.type = 'button';
      buyTwo.value = 'Buy 2'
      buyTwo.setAttribute('class','btn btn-outline-primary')
      buyTwo.onclick = async() => {
        try{
            const id = inventoryData._id;
            url = 'https://crudcrud.com/api/'+crudcrud+'/inventoryData/' + id;

            const currentQuantity = await axios.get(url);
            const updatedQuantity = currentQuantity.data.quantity - 2;
            console.log(updatedQuantity)

            if (updatedQuantity < 5) {
                alert("Quantity is running low!");
                return;
            }

            const updatedData = {
                quantity: updatedQuantity
            };

            
            updatedData.item_name = inventoryData.item_name;
            updatedData.descrip = inventoryData.descrip;
            updatedData.price = inventoryData.price;

            const res = await axios.put(url, updatedData)
            const quantityId = `dynaquantity-${id}`
            var quantityElement = document.getElementById(quantityId);
            console.log(quantityElement)
            var current = parseInt(quantityElement.innerText);
            var newQuantity = current - 2;
            quantityElement.innerText = newQuantity;
            
        }
        catch(err){
                console.error(err);
            };
            
    }

        buyThree.type = 'button';
        buyThree.value = 'Buy 3'
        buyThree.setAttribute('class','btn btn-outline-primary')
        buyThree.onclick = async() => {
            try{
                const id = inventoryData._id;
                url = 'https://crudcrud.com/api/'+crudcrud+'/inventoryData/' + id;
    
                const currentQuantity = await axios.get(url);
                const updatedQuantity = currentQuantity.data.quantity - 3;
                console.log(updatedQuantity)
    
                if (updatedQuantity < 5) {
                    alert("Quantity is running low!");
                    return;
                }
    
                const updatedData = {
                    quantity: updatedQuantity
                };
    
                
                updatedData.item_name = inventoryData.item_name;
                updatedData.descrip = inventoryData.descrip;
                updatedData.price = inventoryData.price;
    
                const res = await axios.put(url, updatedData)
                const quantityId = `dynaquantity-${id}`
                var quantityElement = document.getElementById(quantityId);
                console.log(quantityElement)
                var current = parseInt(quantityElement.innerText);
                var newQuantity = current - 3;
                quantityElement.innerText = newQuantity;
                
            }
            catch(err){
                    console.error(err);
                };
                
        }
    

    editBtn.type = 'button';
    editBtn.value = 'Edit';
    editBtn.setAttribute('class','btn btn-outline-primary');
    editBtn.onclick = async () => {
        try{

            const name = document.getElementById('item_name');
            const descrip = document.getElementById('descrip');
            const price = document.getElementById('price');
            const quantity = document.getElementById('quantity');

            
            name.value = inventoryData.item_name;
            descrip.value = inventoryData.descrip;
            price.value = inventoryData.price;
            quantity.value = inventoryData.quantity;
            
            const id = inventoryData._id
            url = 'https://crudcrud.com/api/'+crudcrud+'/inventoryData/' + id;

            const res = await axios.delete(url);
            console.log(res);
        }
        catch(err){
            console.error(err);

        }
        
        parent.removeChild(child);
        
    }
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.setAttribute('class','btn btn-outline-danger');
    deleteBtn.onclick = async () => {
        //localStorage.removeItem(expenseDetails.category);
        try{
            const id = inventoryData._id
            url = 'https://crudcrud.com/api/'+crudcrud+'/inventoryData/' + id
            const res = await axios.delete(url);
            console.log(res)
            }
        catch(err){
            console.error(err);
            }
        parent.removeChild(child);
    }
    child.appendChild(editBtn);
    child.appendChild(deleteBtn);
    child.appendChild(buyOne);
    child.appendChild(buyTwo);
    child.appendChild(buyThree);
    parent.appendChild(child);
}

 window.addEventListener("DOMContentLoaded", async () => {
    try{
        const res = await axios.get('https://crudcrud.com/api/'+crudcrud+'/inventoryData');
        for(var i=0; i<res.data.length; i++){
            showUser(res.data[i])
            }
        }
    catch(err){
        console.log(err)
    }
})