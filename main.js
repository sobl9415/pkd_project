"use strict";
// test
// test queen bjuuu
Object.defineProperty(exports, "__esModule", { value: true });
var auto_1 = require("chart.js/auto");
auto_1.Chart.register(auto_1.ArcElement, auto_1.Tooltip, auto_1.Legend);
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
//let person = ["sofia", UserBudget] // name, income, budget
function menu() {
    // function för att skapa meny när man kan logga in, när vi skapar användare osv
}
// Function to retrive income, spendigns and saving goal
function Userinput() {
    // User prompts 
    var income = Number(prompt("What is your income?: "));
    var savings = Number(prompt("What is your saving goal?: "));
    var rent = Number(prompt("What is your rent and other fixed expences?: "));
    // antingen returnera direkt eller skapa budgeten direkt
    return [income, savings, rent];
}
function budget_judge() {
    var user_data = Userinput(); // Plocka ut promtsen
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remains = income - (savings + rent);
    var UserPercentage = {
        others: 10,
        food: 19,
        nationCard: 2
    };
    if (income > 50000) {
        savings = savings + income * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 10,
            food: 8,
            nationCard: 1
        };
    }
    else if (income > 20000) {
        UserPercentage = {
            others: 15,
            food: 25,
            nationCard: 5
        };
    }
    var others = (remains * UserPercentage.others) / 100;
    var food = (remains * UserPercentage.food) / 100;
    var nationCard = (remains * UserPercentage.nationCard) / 100;
    return {
        income: income,
        savings: savings,
        rent: rent,
        remains: remains,
        others: others,
        food: food,
        nationCard: nationCard
    };
}
function displayUserBudget(UserBudget) {
    var result = budget_judge;
    console.log("Your income was: ", result[0], 'income:');
    console.log("Your saving goal was: ", result[1], 'savings:');
    console.log("Your money mapping friend has now created a budget for you");
    console.log("Your recomended budget on the category others is:", result[4], 'others');
    console.log("Your recomended budget on the category food is:", result[5], 'food');
    console.log("Your recomended budget on the category nation card is:", result[6], 'nationCard');
    console.log("Does this budget seem okay or do you want to modify");
}
function make_chart() {
    // funktion som mha chart.js skapar ett fint diagram
}
function displaybudgetchart() {
    // en funktion som dis
}
function main() {
    splash();
    menu();
    //input = Userinput() 
    //make_budget() // 
    make_chart();
    displaybudgetchart();
}
