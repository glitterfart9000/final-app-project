const { createElement } = require("react");

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

    // figure out how to remove message and add data to table
    let message = document.getElementsByClassName("empty-message");
    message.value.remove();
    let expensesRow = document.getElementById("expensesList");
    let expenseAmtData = document.createElement("td");
    expenseAmtData.value = userAmount;
    expensesRow.appendChild(expenseAmtData);
}



