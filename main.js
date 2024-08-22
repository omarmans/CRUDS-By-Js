
//get total
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let Count=document.getElementById("count")
let category=document.getElementById("category")
let inputsOfInputs=document.querySelectorAll('.inputs input')
function GetTotal(){
      console.log('in progress')
   if(price.value!=''){
         total.innerHTML=+price.value+ +taxes.value+ +ads.value- +discount.value
         total.style.background='green'
      }else{
         total.style.background='#a00d02'
         total.innerHTML=''
   }
}
// ##################
// ##################
// ##################
// ##################

// create product
let submit=document.getElementById("submit")
let DataOfProducts=[]
let tbody=document.getElementById("tbody")
//i used to (some) to force the CreateBtn to be disabled
inputsOfInputs.forEach(input => {
    input.addEventListener('input', () => {
        let isEmpty = Array.from(inputsOfInputs).some(input => input.value.trim() === "");
        submit.disabled = isEmpty;
    });
});
submit.addEventListener("click",()=>{
    //get count`s value
    let countvalue = +Count.value;
    //check if the countvalue is valid or not
        if (isNaN(countvalue) || countvalue <= 0) {
        alert('Please enter a valid number in the Count field.');
        return;
        }

        //loop on countvalue to create Rows same the value of counvalue
    for (let i = 0; i < countvalue; i++) { 
        // Create new row
        let newRow = document.createElement("tr");
        
        //store product value
        let product = {
            id: DataOfProducts.length + 1,
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value,
        }
        //push product to array
        DataOfProducts.push(product);
        CreateBtns(product)
        
      
    }

    // Save data to local storage
    localStorage.setItem("products", JSON.stringify(DataOfProducts));

    // Clear inputs after the loop finishes
    inputsOfInputs.forEach(input => {
        input.value = '';
    });
    total.innerHTML = '';
    submit.disabled = true;
    Count.value = '';  // Reset Count after submission
});


   



//save local storage
if (localStorage.getItem("products") != null) {
    DataOfProducts = JSON.parse(localStorage.getItem("products"));
    DataOfProducts.forEach(product =>CreateBtns(product));
} else {
    DataOfProducts = [];
}

//searchMethod
let search=document.querySelector("#search")
let btnsearch=document.querySelectorAll(".btnsearch button ")
let Rows=document.querySelectorAll("tbody tr ")
//getButtons
function toggleButtons(searchValue) {
    btnsearch.forEach(btn => btn.disabled = searchValue === '');
}
search.addEventListener("input",()=>{
    let searchValue = search.value.toLowerCase().trim();
    toggleButtons(searchValue)
    //search by title
btnsearch[0].addEventListener("click",()=>{
Rows.forEach(row=>{
              let titleCell = row.querySelector("td:nth-child(2)");

if(titleCell){  //check if there is a cell with this index
    titleCell.textContent.toLowerCase().includes(searchValue)?  row.style.display = 'table-row' :row.style.display = 'none';
}
// search by Category
btnsearch[1].addEventListener("click",()=>{
                  let CategoryCell = row.querySelector("td:nth-child(8)");

if(CategoryCell){  //check if there is a cell with this index
    CategoryCell.textContent.toLowerCase().includes(searchValue)?  row.style.display = 'table-row' :row.style.display = 'none';
}
})

}
)
})

//search by all
    Rows.forEach(row=>row.textContent.includes(searchValue)?row.style.display='table-row':row.style.display='none')
})



//delete all
let delete_all=document.querySelector(".delete_all")
if(DataOfProducts.length<=0){
    delete_all.style.display='none'
}else{
    delete_all.style.display='block'
    delete_all.textContent=`(${DataOfProducts.length}) Delete All`

delete_all.addEventListener("click",()=>{
    localStorage.clear()
})
}



//Create Update and Delete Buttons
function CreateBtns(product){
        let newRow = document.createElement("tr");
          Object.values(product).forEach(value => {
        let newCell = document.createElement("td");
        newCell.textContent = value;
        newRow.appendChild(newCell);
    });

        let updateCell = document.createElement("td");
        let updateBTN = document.createElement("button");
        updateBTN.textContent = "Update";
        updateCell.appendChild(updateBTN);
        newRow.appendChild(updateCell);
        
        // Create DeleteBtn
        let deleteCell = document.createElement("td");
        let deleteBTN = document.createElement("button");
        deleteBTN.textContent = "Delete";
        deleteCell.appendChild(deleteBTN);
        newRow.appendChild(deleteCell);
        tbody.appendChild(newRow);

        //Update
        updateBTN.addEventListener("click", () => {
            title.value = product.title;
            price.value = product.price;
            taxes.value = product.taxes;
            ads.value = product.ads;
            discount.value = product.discount;
            category.value = product.category;
            GetTotal();

            // حذف المنتج من القائمة و`localStorage` لتحديثه بعد التعديل
            tbody.removeChild(newRow);
            DataOfProducts = DataOfProducts.filter(item => item.id !== product.id);
            localStorage.setItem("products", JSON.stringify(DataOfProducts));
        });

        // Delete
        deleteBTN.addEventListener("click", () => {
            tbody.removeChild(newRow);
            DataOfProducts = DataOfProducts.filter(item => item.id !== product.id); //retutn  all, not the main one 
            localStorage.setItem("products", JSON.stringify(DataOfProducts));
        });

}








