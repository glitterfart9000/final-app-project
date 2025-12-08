function addExpense() {
    // gets amount of $ the user entered
    let amountBox = document.getElementById("amount");
    let userAmount = amountBox.value;

    // gets category user selected
    let categoryBox = document.getElementById("category");
    let userCategory = categoryBox.value;

    // gets description user entered
    let descBox = document.getElementById("description");
    let userDesc = descBox.value;

    // gets date user selected
    let dateBox = document.getElementById("date");
    let userDate = dateBox.value;

    // check if any values are empty
    if (userAmount == "" || userCategory == "" || userDesc == "" || userDate == ""){
        alert("Please fill out the empty fields.");
        return;
    }

    // clear text boxes
    amountBox.value = "";
    categoryBox.value = "";
    descBox.value = "";
    dateBox.value = "";

    let expensesRow = document.getElementById("expenses-body");
    if (expensesRow) {
        expensesRow.remove();
    }

    let idNum = generateIdNum();
    // ai
    localStorage.setItem("row" + idNum, idNum);

    // save to local storage
    localStorage.setItem("exp" + idNum, userAmount);
    localStorage.setItem("cat" + idNum, userCategory);
    localStorage.setItem("des" + idNum, userDesc);
    localStorage.setItem("dat" + idNum, userDate);

    createExpenseRow(userAmount, userCategory, userDesc, userDate, idNum);
}

function generateIdNum() {
    // iterate through local storage
    // check for first available id number
    let idNum = 0;
    while (localStorage.getItem("row" + idNum) != null) {
        idNum++;
    }
    return idNum;
}

let totalSpent = 0.0;

function createExpenseRow(userAmount, userCategory, userDesc, userDate, idNum) {
    // add new row
    let newExpenseRow = document.createElement("tr");
    newExpenseRow.id = "row" + idNum;
    let tableBody = document.getElementById("expensesList");

    // add table data for 'date'
    let dateData = document.createElement("td");
    dateData.id = "dat" + idNum
    dateData.innerText = userDate;
    newExpenseRow.appendChild(dateData);

    // add table data for 'category'
    let categoryData = document.createElement("td");
    categoryData.id = "cat" + idNum;
    categoryData.innerText = userCategory;
    newExpenseRow.appendChild(categoryData);

    // add table data for 'description'
    let descData = document.createElement("td");
    descData.id = "des" + idNum;
    descData.innerText = userDesc;
    newExpenseRow.appendChild(descData);

    // add table data for 'amount'
    let expenseAmtData = document.createElement("td");
    expenseAmtData.id = "exp" + idNum;
    expenseAmtData.innerText = userAmount;
    newExpenseRow.appendChild(expenseAmtData);

    // add delete button
    let deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", removeRow)
    deleteButton.classList.add("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = "dlt" + idNum;
    newExpenseRow.appendChild(deleteButton);
    // add to table
    tableBody.appendChild(newExpenseRow);

    // update total spent
    let totalSpentBox = document.getElementById("totalAmount");
    let spent = parseFloat(localStorage.getItem("exp" + idNum));
    totalSpent += spent;
    totalSpentBox.innerHTML = ("$" + totalSpent.toFixed(2));

    // add category row
    if (userCategory == "Food"){
        addCategoryRow(0);
    }
    else if (userCategory == "Transport"){
        addCategoryRow(1);
    }
    else if (userCategory == "Entertainment"){
        addCategoryRow(2);
    }
    else if (userCategory == "Shopping"){
        addCategoryRow(3);
    }
    else if (userCategory == "Utilities"){
        addCategoryRow(4);
    }
    else if (userCategory == "Other"){
        addCategoryRow(5);
    }
}

function removeRow(event) {
    // get id of button
    let expenseId = event.target.id;

    // get id number from button id
    let idNum = expenseId.substring(3);

    // get expense row by id
    let expenseRow = document.getElementById("row" + idNum);

    // remove the expense row from table
    expenseRow.remove();
    localStorage.removeItem(expenseRow.id);
}

function loadRows() {
    // get each task from local storage
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if (document.getElementById("row" + key.substring(3))){
        // ai
        continue;
        }
        // ai
        if (key.startsWith("row")) {
            let amount = localStorage.getItem("exp" + key.substring(3));
            let category = localStorage.getItem("cat" + key.substring(3));
            let desc = localStorage.getItem("des" + key.substring(3));
            let date = localStorage.getItem("dat" + key.substring(3));
            if (amount && category && desc && date) {
                // create expense rows for each expense
                createExpenseRow(amount, category, desc, date, key.substring(3));
            }
        }
    }
}

let categoryTable = document.createElement("table");

function addCategoryRow(category) {
    // make headers for each category
    let categoryTableHead = document.createElement("thead");
    let categoryHeader = document.createElement("th");
    let newCategoryRow = document.createElement("tr");
    let categoryBreakdown = document.getElementById("breakdown");
    categoryBreakdown.appendChild(categoryTable);
    let expenseTotals = spendingAmounts();

    // append the new appropiate header to the table
    if (category == 0){
        categoryHeader.innerText= "Food";
        categoryHeader.classList.add("category-heading");
        newCategoryRow.appendChild(categoryHeader);
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
    else if (category == 1){
        categoryHeader.innerText= "Transport";
        categoryHeader.classList.add("category-heading");
        newCategoryRow.appendChild(categoryHeader);
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
    else if (category == 2){
        categoryHeader.innerText= "Entertainment";
        categoryHeader.classList.add("category-heading");
        newCategoryRow.appendChild(categoryHeader);
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
    else if (category == 3){
        categoryHeader.innerText= "Shopping";
        categoryHeader.classList.add("category-heading");
        newCategoryRow.appendChild(categoryHeader);
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
    else if (category == 4){
        categoryHeader.innerText= "Utilities";
        newCategoryRow.appendChild(categoryHeader);
        categoryHeader.classList.add("category-heading");
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
    else if (category == 5){
        categoryHeader.innerText= "Other";
        categoryHeader.classList.add("category-heading");
        newCategoryRow.appendChild(categoryHeader);
        categoryTableHead.appendChild(newCategoryRow);
        categoryTable.appendChild(categoryTableHead);
    }
}

function spendingAmounts(){
    let categoryArr = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < localStorage.length / 5; i++){
        let expKey = "exp" + i;
        let catKey = "cat" + i;
        let storageExpense = parseFloat(localStorage.getItem(expKey));
        let storageCategory = localStorage.getItem(catKey);
        if (storageCategory == "Food"){
            categoryArr[0] += storageExpense;
        }
        else if (storageCategory == "Transport"){
            categoryArr[1] += storageExpense;
        }
        else if (storageCategory == "Entertainment"){
            categoryArr[2] += storageExpense;
        }
        else if (storageCategory == "Shopping"){
            categoryArr[3] += storageExpense;
        }
        else if (storageCategory == "Utilities"){
            categoryArr[4] += storageExpense;
        }
        else if (storageCategory == "Other"){
            categoryArr[5] += storageExpense;
        }
    }
    return categoryArr;
}

loadRows();