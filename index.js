import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://my-first-web-app-216d7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shopingListIEl = document.getElementById("shopping-list")
const shopingListInDB = ref(database, "ShopingList")

onValue(shopingListInDB, function(snapshot) {
    
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
        let itemKeys = Object.keys(snapshot.val())
        let isDuplicate = false
        clearShopingLisEl()
        for(let i = 0; i < itemArray.length; i++){
   
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1] 
            
            appendItemToShoppingListEl(currentItem)
           

        }
    
    }
    else{
        shopingListIEl.innerHTML = "No Items here....Yet"
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let warningMessage = ""
    
    if(inputValue ==="" ){
        alert("Enter a value first")
        return false
    }
    else{
        push(shopingListInDB, inputValue) 
    }
    clearInputFieldEl()
    
})
function clearShopingLisEl(){
    shopingListIEl.innerHTML = ""
}
function clearInputFieldEl(){
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = ""
    
    
    //shopingListIEl.innerHTML += `<li> ${itemValue}</li>`
    
        newEl = document.createElement("li")
        newEl.textContent = itemValue
        shopingListIEl.append(newEl)


     newEl.addEventListener("click", function(){
        let removeItem =  ref(database, `ShopingList/${itemID}`)
        remove(removeItem)
     })
} 
