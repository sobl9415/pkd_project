"use strict";
//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 
Object.defineProperty(exports, "__esModule", { value: true });
//Chart.register(ArcElement, Tooltip, Legend);
// Types
var PromptSync = require("prompt-sync");
var pie_example_2__1_1 = require("./pie_example-2 (1)");
var prompt = PromptSync();
var StandardBudget = {
    income: 0,
    savings: 0,
    rent: 0,
    categories: [
        { name: "others", amount: 0 },
        { name: "food", amount: 0 },
        { name: "nationCard", amount: 0 },
        { name: "snacks", amount: 0 }
    ]
};
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
function menu(x) {
    if (x === 1) {
        console.log("\nl) Login \nc) create account \nq) quit");
    }
    if (x === 2) {
        console.log("");
    }
    if (x === 3) {
        console.log("\ng) generate budget \nc) create your own budget \l) log out");
    }
    var choice = String(prompt("\n Choose your option: "));
    return choice;
}
function login() {
    var username = String(prompt("\nUsername: "));
}
function create_account() {
}
function user_actions() {
    // efter att man loggat in, menu 3
}
// Function to retrive income, spendings and saving goal
function Userinput() {
    // User prompts 
    var income = Number(prompt("What is your income?: "));
    var savings = Number(prompt("What is your saving goal?: "));
    var rent = Number(prompt("What is your rent?: "));
    // antingen returnera direkt eller skapa budgeten direkt
    return [income, savings, rent];
}
function budget_judge(user_data) {
    // const user_data = Userinput(); // Plocka ut promtsen
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remains = income - (savings + rent);
    var UserPercentage = {
        others: 30,
        food: 50,
        nationCard: 15,
        snacks: 5
    };
    if (income > 50000) {
        console.log("GRISCH");
        savings = savings + income * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 25,
            food: 50,
            nationCard: 20,
            snacks: 5
        };
    }
    else if (income > 20000) {
        UserPercentage = {
            others: 15,
            food: 60,
            nationCard: 20,
            snacks: 5
        };
    }
    var others = (remains * UserPercentage.others) / 100;
    var food = (remains * UserPercentage.food) / 100;
    var nationCard = (remains * UserPercentage.nationCard) / 100;
    var snacks = (remains * UserPercentage.nationCard) / 100;
    var budget = {
        income: income,
        savings: savings,
        rent: rent,
        categories: [{ name: "others", amount: others },
            { name: "food", amount: food },
            { name: "nationCard", amount: nationCard },
            { name: "snacks", amount: snacks }]
    };
    console.log(budget);
    return budget;
}
function add_to_budget(remaining_budget, category) {
    console.log("Your remaining budget amount: ", remaining_budget);
    var amount = Number(prompt("Amount to " + category + ": "));
    while (amount > remaining_budget) {
        console.log("That is not reasonable, try again");
        amount = Number(prompt("Amount to " + category + ": "));
    }
    return amount;
}
function add_categories(budget, remaining_budget) {
    while (true) {
        var CustomCategory = prompt("Would you like to add a custom category? (y/n): ");
        if (CustomCategory === "n") {
            break;
        }
        ;
        console.log("Your remaining budget amount: ", remaining_budget);
        var CustomCategoryName = prompt("What is the name of your custom category? ");
        var CustomCategoryAmount = Number(prompt("Amount to ".concat(CustomCategoryName, ": ")));
        budget.categories.push({ name: CustomCategoryName, amount: CustomCategoryAmount });
        remaining_budget -= CustomCategoryAmount; // Subtract custom category amount from remaining budget
    }
    budget.savings += remaining_budget;
    return budget;
}
function make_budget(user_data) {
    //const user_data = Userinput(); // Plocka ut promtsen
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remaining_budget = income - (savings + rent);
    var budget = { income: income, savings: savings, rent: rent, categories: [] };
    var categori = ["food", "nation-spendings", "snacks", "others"];
    var n = 0;
    while (n < categori.length) {
        var amount = add_to_budget(remaining_budget, categori[n]);
        budget.categories.push({ name: categori[n], amount: amount });
        remaining_budget -= amount;
        n += 1;
    }
    budget = add_categories(budget, remaining_budget);
    console.log(budget);
    return budget;
}
function promptChecker() {
}
function choose_budget(user_data) {
    // för menyn, om man vill välja vilken förbestämd budget man vill ha oberoende av inkomst
    //const user_data = Userinput(); // Plocka ut promtsen
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remains = income - (savings + rent);
    // här hade det kanske varit nice att ha någon funktion eller koll så man inte skriver in nåt ogiltigt/orimligt
}
function displayUserBudget(result) {
    // dessa fungerar bara med bestämda kategor;
    var food = result.categories[1].amount;
    var nationCard = result.categories[2].amount;
    var others = result.categories[3].amount;
    console.log("Your income was: ", result.income, 'income:');
    console.log("Your saving goal was: ", result.savings, 'savings:');
    console.log("Your money mapping friend has now created a budget for you");
    console.log("Your recomended budget on the category others is:", others);
    console.log("Your recomended budget on the category food is:", food);
    console.log("Your recomended budget on the category nation card is:", nationCard);
    console.log("Does this budget seem okay or do you want to modify");
}
function make_chart() {
    // funktion som mha chart.js skapar ett fint diagram
}
function displaybudgetchart() {
    // en funktion som displayar chart
}
function main() {
    splash();
    /**
    const choice = menu(1)
    if (choice === "q") {
        return;
    }
    if (choice === "l") {
        // login()
    }
    if (choice === "c") {
        // create_account()
    }
    */
    var user_data = Userinput();
    var choose_budget = prompt("Do you want to use money maps recommended budget? y/n ");
    if (choose_budget === "n") {
        var budget = make_budget(user_data); // skapa din egen budget
        (0, pie_example_2__1_1.plotChart)(budget);
        displayUserBudget(budget);
    }
    else {
        var budget = budget_judge(user_data);
        (0, pie_example_2__1_1.plotChart)(budget);
        displayUserBudget(budget);
    }
    //const budget = budget_judge(user_data)
    //plotChart(budget)
    // make_budget()  
    // make_chart()
    //displayUserBudget(budget)
}
main();
