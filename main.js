"use strict";
// test
// test queen bjuuu
Object.defineProperty(exports, "__esModule", { value: true });
//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 
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
    // remains: number
};
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
function menu() {
    // function för att skapa meny när man kan logga in, när vi skapar användare osv
    // här kan vi kalla på choose budget om ett alterantiv är att välja budgetfördekning själv
}
// Function to retrive income, spendigns and saving goal
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
function make_budget(user_data) {
    //const user_data = Userinput(); // Plocka ut promtsen
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remains = income - (savings + rent);
    // någon funktion eller koll så man inte skriver in nåt ogiltigt/orimligt
    console.log("Your remains after rent and savings", remains);
    var foodBudget = Number(prompt("How much of your remaining income will go to food?: "));
    var othersBudget = Number(prompt("How much of your remaining will go to other spending?: "));
    var nationCardBudget = Number(prompt("How much of your remaining budget will go to nation-spendning?: "));
    var snacksBudget = Number(prompt("How much of your remaining budget will go to nation-spendning?: "));
    // Ifall användaren vill lägga till egen kategori?? en while loop som sparar ner om det är fler kategorier
    var food = foodBudget;
    var others = othersBudget;
    var nationCard = nationCardBudget;
    var snacks = snacksBudget;
    // denna funkar bara för bestämda kategorier
    var budget = {
        income: income,
        savings: savings,
        rent: rent,
        categories: [{ name: "others", amount: others },
            { name: "food", amount: food },
            { name: "nationCard", amount: nationCard },
            { name: "snacks", amount: snacks }]
    };
    return budget;
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
    //const result = budget_judge(budget);
    // dessa fungerar bara med bestämda kategorier
    var others = result.categories[0].amount;
    var food = result.categories[1].amount;
    var nationCard = result.categories[2].amount;
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
    menu();
    var user_data = Userinput();
    var choose_budget = prompt("Do you want to use money maps recommended budget? y/n ");
    if (choose_budget === "n") {
        var budget_1 = make_budget(user_data); // skapa din egen budget
        displayUserBudget(budget_1);
    }
    else {
        var budget_2 = budget_judge(user_data);
        displayUserBudget(budget_2);
    }
    var budget = budget_judge(user_data);
    (0, pie_example_2__1_1.plotChart)(budget);
    // make_budget()  
    // make_chart()
    //displayUserBudget(budget)
}
main();
