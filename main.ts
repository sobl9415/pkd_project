// test
// test queen bjuuu

//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 

//Chart.register(ArcElement, Tooltip, Legend);
// Types

import * as PromptSync from "prompt-sync";

import { plotChart } from "./pie_example-2 (1)";


const prompt = PromptSync(); 

// type CatagoryBudget = Record<string, number> //record consisting of the catagory and how much money 

type BudgetCategory = {
    name: string;
    amount: number;
};

type UserBudget = {
    income: number;
    savings: number;
    rent: number;
    categories: BudgetCategory[];
};

const StandardBudget: UserBudget = {
    income: 0,
    savings: 0,
    rent: 0,
    categories: [
    {name: "others", amount: 0},
    {name: "food", amount: 0},
    {name: "nationCard", amount: 0}]
    // remains: number
} 

function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend")
}

function menu() {
    // function för att skapa meny när man kan logga in, när vi skapar användare osv
    // här kan vi kalla på choose budget om ett alterantiv är att välja budgetfördekning själv
}

// Function to retrive income, spendigns and saving goal
function Userinput(): Array<number> {
    // User prompts 
    const income: number = Number(prompt("What is your income?: "));
    const savings: number = Number(prompt("What is your saving goal?: "));
    const rent: number = Number(prompt("What is your rent?: "));

    // antingen returnera direkt eller skapa budgeten direkt
    return [income, savings, rent];
}

function budget_judge(user_data: Array<number>): UserBudget {
    // const user_data = Userinput(); // Plocka ut promtsen
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];

    let remains = income - (savings + rent); 

    let UserPercentage = { // Standardprocent
        others: 30,
        food: 50,       
        nationCard: 20
    };

    if (income > 50000) {
        savings = savings + income * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 25, 
            food: 50, 
            nationCard: 25 
        };

    } else if (income > 20000) {
        UserPercentage = { // man kan unna sig lite mer om man tjänar mer än 20k, eventuellt dra av lite direkt till savings
            others: 15, 
            food: 60, 
            nationCard: 25
        };
    }

    const others = (remains * UserPercentage.others) / 100;
    const food = (remains * UserPercentage.food) / 100;
    const nationCard = (remains * UserPercentage.nationCard) / 100;

    
    const budget = {
        income: income, 
        savings: savings, 
        rent: rent,
        categories:
        [{name: "others", amount: others},
        {name: "food", amount: food}, 
        {name: "nationCard", amount: nationCard}]
    };
    console.log(budget);
    return budget;
}

function make_budget(user_data: Array<number>): UserBudget {
    //const user_data = Userinput(); // Plocka ut promtsen
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];
    let remains = income - (savings + rent); 

    // någon funktion eller koll så man inte skriver in nåt ogiltigt/orimligt
    console.log("Your remains after rent and savings", remains)
    const foodBudget: number = Number(prompt("How much of your remaining income will go to food?: ")) 
    const othersBudget: number = Number(prompt("How much of your remaining will go to other spending?: "))
    const nationCardBudget: number = Number(prompt("How much of your remaining budget will go to nation-spendning?: "))
    // Ifall användaren vill lägga till egen kategori?? en while loop som sparar ner om det är fler kategorier

    const food = foodBudget;
    const others = othersBudget;
    const nationCard = nationCardBudget;

    // denna funkar bara för bestämda kategorier
    const budget = {
        income: income, 
        savings: savings, 
        rent: rent,
        categories:
        [{name: "others", amount: others},
        {name: "food", amount: food}, 
        {name: "nationCard", amount: nationCard}]
    };

    return budget
}

function choose_budget(user_data: Array<number>) {
    // för menyn, om man vill välja vilken förbestämd budget man vill ha oberoende av inkomst
    //const user_data = Userinput(); // Plocka ut promtsen
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];
    let remains = income - (savings + rent); 
    // här hade det kanske varit nice att ha någon funktion eller koll så man inte skriver in nåt ogiltigt/orimligt
}


function displayUserBudget(result: UserBudget) {
    //const result = budget_judge(budget);
    // dessa fungerar bara med bestämda kategorier
    const others = result.categories[0].amount
    const food = result.categories[1].amount
    const nationCard = result.categories[2].amount
    console.log("Your income was: ", result.income, 'income:' ) 
    console.log("Your saving goal was: ", result.savings, 'savings:' )
    console.log("Your money mapping friend has now created a budget for you")
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
    splash()
    menu()
    let user_data = Userinput() 
    const choose_budget: string | null = prompt("Do you want to use money maps recommended budget? y/n ")
    if (choose_budget === "n") {
        const budget = make_budget(user_data) // skapa din egen budget
        displayUserBudget(budget)
    }
    else {
        const budget = budget_judge(user_data)
        displayUserBudget(budget)
    }
  
    plotChart(budget)
    // make_budget()  
    // make_chart()
    //displayUserBudget(budget)
}

main();

