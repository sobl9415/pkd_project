//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 

//Chart.register(ArcElement, Tooltip, Legend);
// Types

import * as fs from "fs";
import * as PromptSync from "prompt-sync";
import { plotChart } from "./pie_example-2 (1)";

const prompt = PromptSync();
const FILE_PATH = "users.json";

// Budget-typer
type BudgetCategory = {
    name: string | null;
    amount: number;
};

export type UserBudget = {
    income: number;
    savings: number;
    rent: number;
    categories: BudgetCategory[];
};

// Användar-typer
type User = {
    password: string;
    budget: UserBudget
};

type Users = Record<string, User>;

// Exempel, skriv om som type example eller vad det kallas
const StandardBudget: UserBudget = {
    income: 0,
    savings: 0,
    rent: 0,
    categories: [
    {name: "others", amount: 0},
    {name: "food", amount: 0},
    {name: "nationCard", amount: 0},
    {name: "snacks", amount: 0 }]
} 

/**

const users: Users = {
    sofia: { password: "blomstrand" },
    tilda: { password: "larsson" },
    matilde: { password: "wiberg" }
};
 */


// Funktionerna
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend")
}

// kanske ha alla kontot-funktioner i en annan fil?

function openData(): Users {
    const data = fs.readFileSync(FILE_PATH, "utf8"); // "utf8" betyder att filen ska läsas som text (inte binärdata)
    return JSON.parse(data) as Users; // JSON.parse(data) omvandlar JSON-strängen till ett objekt
}
function saveData(users: Users): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), "utf8"); // JSON.stringify(users) konverterar users till en JSON-sträng
}                                                                        // null, 2 används för att formatera JSON-filen med indrag (2 mellanslag per nivå)

function login(): string {
    while (true) {
        let users = openData()
        const username: string = String(prompt("Username: "));
        const password: string = String(prompt("Password: "));

        if (username in users && users[username].password === password) {
            console.log("Login successful!");
            return username;
        } 
        
        console.log("Incorrect username or password");
        const retry = menu(2);
        if (retry === "q") {
            console.log("Quitting..."); 
        }
    }
}

function create_account(): Users {
    let users = openData()
    console.log("New user: ")

    while (true) {
        const newUsername: string = String(prompt("Username: "));

        if (newUsername in users) {
            console.log("Username is already taken")

        } else {
            const newPassword: string = String(prompt("Password: "));
            const startBudget: number = 0;
            users[newUsername] = { password: newPassword, budget: StandardBudget };
            console.log("Account created successfully!");
            saveData(users)
            return users; 
        }
    }
}

// Function to retrive income, spendings and saving goal
function Userinput(): Array<number> {

    const income: number = Number(prompt("What is your income?: "));
    const savings: number = Number(prompt("What is your saving goal?: ")); // felkontroll så det ej är större än income
    const rent: number = Number(prompt("What is your rent?: ")); // samma här

    return [income, savings, rent];
}

function budget_judge(user_data: Array<number>): UserBudget {
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];

    let remains = income - (savings + rent); 

    let UserPercentage = { // Standardprocent
        others: 30,
        food: 50,       
        nationCard: 15,
        snacks: 5
    };

    if (income > 50000) {
        console.log("GRISCH")
        savings = savings + income * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 25, 
            food: 50, 
            nationCard: 20, 
            snacks: 5
        };

    } else if (income > 20000) {
        UserPercentage = { // man kan unna sig lite mer om man tjänar mer än 20k, eventuellt dra av lite direkt till savings
            others: 15, 
            food: 60, 
            nationCard: 20,
            snacks: 5
        };
    }

    const others = (remains * UserPercentage.others) / 100;
    const food = (remains * UserPercentage.food) / 100;
    const nationCard = (remains * UserPercentage.nationCard) / 100;
    const snacks = (remains * UserPercentage.nationCard) / 100;

    
    const budget = {
        income: income, 
        savings: savings, 
        rent: rent,
        categories:
        [{name: "others", amount: others},
        {name: "food", amount: food}, 
        {name: "nationCard", amount: nationCard},
        {name: "snacks", amount: snacks}]
    };
    console.log(budget);
    return budget;
}


function add_to_budget(remaining_budget: number, category: string): number {
    console.log("Your remaining budget amount: ", remaining_budget)
    let amount: number = Number(prompt("Amount to " + category + ": "))
    while (amount > remaining_budget) {
        console.log("That is not reasonable, try again")
        amount = Number(prompt("Amount to " + category + ": "))
    }
    return amount;
}

function add_categories(budget: UserBudget, remaining_budget: number): UserBudget {
    while (true) {
        const CustomCategory = prompt("Would you like to add a custom category? (y/n): ");
            if (CustomCategory === "n") {
                break
            };
        console.log("Your remaining budget amount: ", remaining_budget)
        const CustomCategoryName = prompt("What is the name of your custom category? ");
        const CustomCategoryAmount = Number(prompt(`Amount to ${CustomCategoryName}: `));
        budget.categories.push({name: CustomCategoryName, amount: CustomCategoryAmount });
        remaining_budget -= CustomCategoryAmount;  // Subtract custom category amount from remaining budget
    } 
    budget.savings += remaining_budget
    return budget
}


function make_budget(user_data: Array<number>): UserBudget {
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];
    let remaining_budget: number = income - (savings + rent); 
    
    let budget: UserBudget = {income: income, savings: savings, rent: rent, categories: []}

    const category = ["food", "nation-spendings", "snacks", "others"]
    let n = 0;
    while (n < category.length) {
        const amount = add_to_budget(remaining_budget, category[n])
        budget.categories.push({name: category[n], amount: amount})
        remaining_budget -= amount
        n +=1;
    }

    budget = add_categories(budget, remaining_budget)

    console.log(budget);
    return budget;
}

function displayUserBudget(result: UserBudget) {
    // dessa fungerar bara med bestämda kategor;
    const food = result.categories[1].amount;
    const nationCard = result.categories[2].amount;
    const others = result.categories[3].amount;
    console.log("Your income was: ", result.income, 'income:' ); 
    console.log("Your saving goal was: ", result.savings, 'savings:' );
    console.log("Your money mapping friend has now created a budget for you");
    console.log("Your recomended budget on the category others is:", others);
    console.log("Your recomended budget on the category food is:", food);
    console.log("Your recomended budget on the category nation card is:", nationCard);
    //console.log("Does this budget seem okay or do you want to modify");
}

function menu(x: number): string {
    if (x === 1) {
        console.log("\nl) Login \nc) Create account \nq) Quit")
    }
    if (x === 2) {
        console.log("\nr) Retry \nq) Quit")
    }
    if (x === 3) {
        console.log("\ng) Generate budget \nc) Create your own budget \nv) View earlier budgets \nl) Log out")
    }
    const choice: string = String(prompt("\nChoose your option: "))
    return choice
}

function view_budget(username: string, user_data: Array<number>) {
    let users = openData();

    if (username in users && users[username].budget) {
        const userBudget: UserBudget = users[username].budget;
        console.log("Your budget:", userBudget);
    } else {
        console.log("User not found or no budget has been created");
    }
    user_actions(username, user_data)
}


function user_actions(username: string, user_data: Array<number>) {
    console.log("Welcome!");
    const choice = menu(3);
    if (choice === "g") {
        const budget = budget_judge(user_data)
        plotChart(budget)
        displayUserBudget(budget)
        //saveData(users)
    }

    if (choice === "c") {
        let users = openData();
        const budget = make_budget(user_data)
        displayUserBudget(budget)
        const is_budget: string = String(prompt("This is your budget. Doo you want to modify? (y/n): "));

        if (is_budget === "n") {
            users[username].budget = budget;
            saveData(users)
            plotChart(budget)
            displayUserBudget(budget)
        } else {
            const modified_budget = make_budget(user_data);
            users[username].budget = modified_budget;
            saveData(users);
            plotChart(modified_budget)
        }

    }
    if (choice === "l") {
        console.log("logging out...")
        main();
    }
    if (choice === "v") {
        view_budget(username, user_data)
    }
}

function main() {
    splash()

    const choice = menu(1)
    if (choice === "q") {
        console.log("quitting....")
        return;
    }
    if (choice === "l") {
        const username = login()
        if (username) {
            let user_data = Userinput()
            user_actions(username, user_data); // Om inloggningen lyckas, skicka användaren till user_actions()
        }
    }

    if (choice === "c") {
        const create = create_account();
        if (create) { // om vi ska gå vidare eller ej, if true
            let user_data = Userinput()
            user_actions("", user_data);
        }
    }

   

    /**
    let user_data = Userinput() 
    const choose_budget: string | null = prompt("Do you want to use money maps recommended budget? y/n ")
    if (choose_budget === "n") {
        const budget = make_budget(user_data) // skapa din egen budget
        plotChart(budget)
        displayUserBudget(budget)
    }
    else {
        const budget = budget_judge(user_data)
        plotChart(budget)
        displayUserBudget(budget)

    }
     */
    
    //const budget = budget_judge(user_data)
    //plotChart(budget)
    // make_budget()  
    // make_chart()
    //displayUserBudget(budget)
}

main();



/**
function choose_budget(user_data: Array<number>) {
    // för menyn, om man vill välja vilken förbestämd budget man vill ha oberoende av inkomst
    //const user_data = Userinput(); // Plocka ut promtsen
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];
    let remains = income - (savings + rent); 
}
 */

