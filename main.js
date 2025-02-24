"use strict";
// test
Object.defineProperty(exports, "__esModule", { value: true });
var auto_1 = require("chart.js/auto");
auto_1.Chart.register(auto_1.ArcElement, auto_1.Tooltip, auto_1.Legend);
//let person = ["sofia", UserBudget] // name, income, budget
function budget_judge() {
    // if (income > 20000) {
    // procentsats är detta
    //}
    // if (income > 50000) {
    // procent sats
    //} else {
    // dra summa direkt till savings
    // sedan procentsats
}
// hej hej test
var test = 1;
// Function to retrive income, spendigns and saving goal
function Userinput() {
    // User prompts 
    var income = prompt("What is your income?:");
    var savings = prompt("What is your saving goal?:");
    var rent = prompt("What is your rent and other fixed expences?:");
    // Recomended 
    //const remains = income - (savings + rent); 
    var UserPercentage = {
        others: 10,
        food: 19,
        nationCard: 2
    };
    //const others = (remains * UserPercentage.others) /100;
    //const food = (remains * UserPercentage.food) /100;
    //const nationCard = (remains * UserPercentage.nationCard) /100;
    /**
        return {
            income,
            savings,
            rent,
            remains,
            others,
            food,
            nationCard
        }
        */
    return;
}
/**
function displayUserBudget(UserBudget: UserBudget) {
   console.log("Your income was: ", income, 'income:' )
   console.log("Your saving goal was: ", income, 'income:' )
   console.log("Your money mapping friend has now created a budget for you")

}
*/
// hej
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
function main() {
    splash();
    Userinput();
}
