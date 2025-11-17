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

    // add new row
    let newExpenseRow = document.createElement("tr");
    let tableBody = document.getElementById("expensesList");

    // add table data for 'date'
    let dateData = document.createElement("td");
    dateData.innerHTML = userDate;
    newExpenseRow.appendChild(dateData);

    // add table data for 'category'
    let categoryData = document.createElement("td");
    categoryData.innerHTML = userCategory;
    newExpenseRow.appendChild(categoryData);

    // add table data for 'description'
    let descData = document.createElement("td");
    descData.innerHTML = userDesc;
    newExpenseRow.appendChild(descData);

    // add table data for 'amount'
    let expenseAmtData = document.createElement("td");
    expenseAmtData.innerHTML = userAmount;
    newExpenseRow.appendChild(expenseAmtData);
    
    tableBody.appendChild(newExpenseRow);
}