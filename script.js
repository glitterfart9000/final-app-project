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
    // user data
    let expenseTotals = spendingAmounts();
    let categoryBreakdown = document.getElementById("breakdown");
    let categorySpentDiv = document.createElement("div");
    categorySpentDiv.classList.add("categorySpentDiv");
    // ai
    let categoryData = document.createElement("span");
    let amountData = document.createElement("span");

    if (category == 0){
        if (!document.getElementById("Food")){
            categoryData.innerText = "Food";
            amountData.innerText = expenseTotals[0];
            categorySpentDiv.id = "Food";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
    }
    else if (category == 1){
        if (!document.getElementById("Transport")){
            categoryData.innerText = "Transport";
            amountData.innerText = expenseTotals[1];
            categorySpentDiv.id = "Transport";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
    }
    else if (category == 2){
        if (!document.getElementById("Entertainment")){
            categoryData.innerText = "Entertainment";
            amountData.innerText = expenseTotals[2];
            categorySpentDiv.id = "Entertainment";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
    }
    else if (category == 3){
        if (!document.getElementById("Shopping")){
            categoryData.innerText = "Shopping";
            amountData.innerText = expenseTotals[3];
            categorySpentDiv.id = "Shopping";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
    }
    else if (category == 4){
        if (!document.getElementById("Utilities")){
            categoryData.innerText = "Utilities";
            amountData.innerText = expenseTotals[4];
            categorySpentDiv.id = "Utilities";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
    }
    else if (category == 5){
        if (!document.getElementById("Other")){
            categoryData.innerText = "Other";
            amountData.innerText = expenseTotals[5];
            categorySpentDiv.id = "Other";
            categorySpentDiv.appendChild(categoryData);
            categorySpentDiv.appendChild(amountData);
            categoryBreakdown.appendChild(categorySpentDiv);
        }
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