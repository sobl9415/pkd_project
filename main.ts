// test


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
    nationCard: number
} 

let person = ["sofia", UserBudget] // name, income, budget

const income = person[1].income;

function budget_judge() {
    if (income > 20000) {
        if (income > 50000) {
            // procentsats
        }
    // annan procentsats
    } else {
    // dra summa direkt till savings
    // sedan procentsats
    }
}

// Function to retrive income, spendigns and saving goal
function Userinput(): UserBudget {
    // User prompts 
    const income = prompt("What is your income?:");
    const savings = prompt("What is your saving goal?:");
    const rent = prompt("What is your rent and other fixed expences?:");


    // någonstans här får vi kalla på budget_judge(), kanske istället för UserPercentage?
    
    // Recomended 
    const remains = income - (savings + rent); 

    const UserPercentage = {
        others: 10,
        food: 19,       
        nationCard: 2
    };

    const others = (remains * UserPercentage.others) /100;
    const food = (remains * UserPercentage.food) /100;
    const nationCard = (remains * UserPercentage.nationCard) /100;

    return {
        income, 
        savings, 
        rent, 
        remains,
        others,
        food, 
        nationCard
    }
    
   return;
}
 
function displayUserBudget(UserBudget: UserBudget) {
    console.log("Your income was: ", income, 'income:' )
    console.log("Your saving goal was: ", savings, 'savings:' )
    console.log("Your money mapping friend has now created a budget for you")
    console.log("Your recomended budget on the category others is:", others, 'others');
    console.log("Your recomended budget on the category food is:", food, 'food');
    console.log("Your recomended budget on the category nation card is:", nationCard, 'nationCard');
    console.log("Does this budget seem okay or do you want to modify");
    }

function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend")
}

function main() {
    splash()
    Userinput()
}

