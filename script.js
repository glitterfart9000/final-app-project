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

    createExpenseRow(userAmount, userCategory, userDesc, userDate, idNum);

    // save to local storage
    localStorage.setItem("exp" + idNum, userAmount);
    localStorage.setItem("cat" + idNum, userCategory);
    localStorage.setItem("des" + idNum, userDesc);
    localStorage.setItem("dat" + idNum, userDate);
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
    deleteButton.addEventListener("click", removeTask)
    deleteButton.classList.add("button");
    deleteButton.innerText = "Delete";
    newExpenseRow.appendChild(deleteButton);

    // add to table
    tableBody.appendChild(newExpenseRow);

}


function removeRow(event) {
    // get id of button
    let expenseId = event.target.id;

    // get id number from button id
    let idNum = expenseId.substring(8);

    // get expense row by id
    let expenseRow = document.getElementById("row" + idNum);

    // remove the expense row from table
    expenseRow.remove();
}

function loadRows() {
    // get each task from local storage
    for (let i = 0; i < localStorage.length; i++){
        let key0 = localStorage.key(i);
        let key1 = localStorage.key(i+1);
        let key2 = localStorage.key(i+2);
        let key3 = localStorage.key(i+3);
        let amount = localStorage.getItem(key0);
        let category = localStorage.getItem(key1);
        let desc = localStorage.getItem(key2);
        let date = localStorage.getItem(key3);
        // create task divs for each task
        createExpenseRow(amount, category, desc, date, key0.substring(3));
    }
}

loadRows();