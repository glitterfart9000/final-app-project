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

    // clear text boxes
    amountBox.value = "";
    categoryBox.value = "";
    descBox.value = "";
    dateBox.value = "";

    // remove message under 'recent expenses'
    let message = document.getElementById("empty-message");
    if (message = ) {
        message.remove();
    }

    // add table data for 'date'
    let expensesRow = document.getElementById("expenses-body");
    let dateData = document.createElement("td");
    dateData.innerHTML = userDate;
    expensesRow.appendChild(dateData);

    // add table data for 'category'
    let categoryData = document.createElement("td");
    categoryData.innerHTML = userCategory;
    expensesRow.appendChild(categoryData);

    // add table data for 'description'
    let descData = document.createElement("td");
    descData.innerHTML = userDesc;
    expensesRow.appendChild(descData);

    // add table data for 'amount'
    let expenseAmtData = document.createElement("td");
    expenseAmtData.innerHTML = userAmount;
    expensesRow.appendChild(expenseAmtData);
}



