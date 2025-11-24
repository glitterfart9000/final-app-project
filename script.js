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
    // line 37 ai
    localStorage.setItem("row" + idNum, idNum);

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
    deleteButton.addEventListener("click", removeRow)
    deleteButton.classList.add("button");
    deleteButton.innerText = "Delete";
    newExpenseRow.appendChild(deleteButton);
    deleteButton.id = "dlt" + idNum;
    // add to table
    tableBody.appendChild(newExpenseRow);

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
        // line 120 ai
        continue;
        }
        // line 123 ai
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

loadRows();