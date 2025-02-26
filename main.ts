// test
// test queen bjuuu

import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 

Chart.register(ArcElement, Tooltip, Legend);
// Types
type CatagoryBudget = Record<string, number> //record consisting of the catagory and how much money 

type UserBudget = {
    income: number,
    savings: number,
    others: number,
    food: number,
    rent: number,
    nationCard: number,
    remains: number
} 

function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend")
}

//let person = ["sofia", UserBudget] // name, income, budget

function menu() {
    // function för att skapa meny när man kan logga in, när vi skapar användare osv
    // här kan vi kalla på choose budget om ett alterantiv är att välja budgetfördekning själv
}

// Function to retrive income, spendigns and saving goal
function Userinput(): UserBudget | Array<number> {
    // User prompts 
    const income: number = Number(prompt("What is your income?: "));
    const savings: number = Number(prompt("What is your saving goal?: "));
    const rent: number = Number(prompt("What is your rent and other fixed expences?: "));

    // antingen returnera direkt eller skapa budgeten direkt
    return [income, savings, rent];
}

function budget_judge(): UserBudget {
    const user_data = Userinput(); // Plocka ut promtsen
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];

    let remains = income - (savings + rent); 

    let UserPercentage = { // Standardprocent
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

    } else if (income > 20000) {
        UserPercentage = { // man kan unna sig lite mer om man tjänar mer än 20k, eventuellt dra av lite direkt till savings
            others: 15, 
            food: 25, 
            nationCard: 5 
        };
    }

    const others = (remains * UserPercentage.others) / 100;
    const food = (remains * UserPercentage.food) / 100;
    const nationCard = (remains * UserPercentage.nationCard) / 100;

    return {
        income, 
        savings, 
        rent, 
        remains,
        others,
        food, 
        nationCard
    };
}

function make_budget() {
    // skapa en egen budget
    // behövs denna eller kan vi utveckla budget_judge?
}

function choose_budget() {
    // för menyn, om man vill välja vilken förbestämd budget man vill ha oberoende av inkomst
}


function displayUserBudget() {
    const result = budget_judge();
    console.log("Your income was: ", result.income, 'income:' ) 
    console.log("Your saving goal was: ", result.savings, 'savings:' )
    console.log("Your money mapping friend has now created a budget for you")
    console.log("Your recomended budget on the category others is:", result.others, 'others');
    console.log("Your recomended budget on the category food is:", result.food, 'food');
    console.log("Your recomended budget on the category nation card is:", result.nationCard, 'nationCard');
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
    let input = Userinput() 
    make_budget()  
    make_chart()
    displaybudgetchart()
}

