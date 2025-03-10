//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 

//Chart.register(ArcElement, Tooltip, Legend);
// Types


// kvar att göra
// 1) Fixa så att man inte behöver skriva in inkomst, hyra osv om man gjort det en gång redan
// - gjort en lösning till detta, ni får testa och se vad ni tycker
// 2) Fixa så att budgeten kan sparas ner i jsonfilen, när man lägger till ytterligare kategorier. 
//    I add_categories måste dem sparas ner till rätt användare in i json. 
// 3) Om någon siffra i json är 0, så finns ingen tidigare budget, ska ej skrivas ut alla kategorier nollade. En nollad budget skapas
//    när användaren skapas. 
// - fixat tror jag, lade till att om inkomsten är 0 så finns ingen budget
// kanske ha alla kontot-funktioner i en annan fil?

import * as fs from "fs";
import * as PromptSync from "prompt-sync";
import { plotChart } from "./pie_example-2 (1)";

const prompt = PromptSync();
const FILE_PATH = "users.json";

// Data definitions
/**
 * A {BudgetCategory} is a record of a string and a number.
 * The string represents the name of the category, and the number represents the 
 * amount in the category. 
 */

/**
 * A {UserBudget} is a record of numbers and an array of BudgeCategory.
 * The numbers represents the amount in income, saving-goal and rent of a user. 
 * The BudgetCategory[] represents the other categories and their amounts.
 */

/**
 * A {User} is a record of a string and a UserBudget.
 * The string represents the username of the user, 
 * and the UserBudget is the latest budget created by the user.
 */

/**
 * {Users} is a record containing a string and a User. 
 * The Users represents the different User in the JSON file.
 * The string represents the username of the user.
 */

// Types
type BudgetCategory = {
    name: string;
    amount: number;
};

export type UserBudget = {
    income: number;
    savings: number;
    rent: number;
    categories: BudgetCategory[];
};

// User-types
type User = {
    password: string;
    budget: UserBudget;
};

//type Users = {
//    username : User
//}

//type Users

type Users = {
    [key: string]: User;
};

//let users: Users = {};


//Standard budget object for a user, initializing all values to 0
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



// Functions
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend")
}

/**
 * Opens the JSON file and retreives the created users.
 */
function openData(): Users {
    const data = fs.readFileSync(FILE_PATH, "utf8"); // "utf8" betyder att filen ska läsas som text (inte binärdata)
    return JSON.parse(data) as Users; // JSON.parse(data) omvandlar JSON-strängen till ett objekt
}

/**
 * Function to save user-data in the JSON file 
 */
function saveData(users: Users): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), "utf8");
}


/**
 * Allows the user to login to the program. The user enter their username and password 
 * 
 * @return {string | void } - If username and password is correct, the username is returned 
 *  - If incorrect, the user is prompted to quit or retry
 */
export function login(username: string, password: string): string | void {
    let users = openData()
    
    if (username in users && users[username].password === password) {   
        console.log("Login successful!");   
        return username;   
    } else {
        console.log("Incorrect username or password");
        return;
   }
}


/**
 * Creates account and an empty budget for new user.
 * @returns {string} the username of the new user
 */
export function create_account(username: string, password: string): string | void {
    let users = openData()    
    console.log("Creating new user...")
    
    if (username in users) {
        console.log("Username is already taken")
        return;
    } else {   
        users[username] = { password: password, budget: StandardBudget };
        console.log("\nAccount created successfully!");   
        saveData(users)
        return username; 
    }   
}


/** 
* Function to retrive income, spendings and saving goal
*/
export function Userinput(): Array<number> {

    const income: number = Number(prompt("What is your income?: "));
    const savings: number = Number(prompt("What is your saving goal?: ")); // felkontroll så det ej är större än income
    const rent: number = Number(prompt("What is your rent?: ")); // samma här

    return [income, savings, rent];
}


/**
 * Creates a budget from users income, rent and saving-goal based on percentages.
 * 
 * @param {Array} user_data - an array with info of the users income, rent and saving-goal
 * @returns {UserBudget} the new generated budget 
 */
export function budget_judge(user_data: Array<number>): UserBudget {
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];

    let remains = income - (savings + rent); 

    let UserPercentage = { // Standardprocent
        others: 30,
        food: 40,       
        nationCard: 15,
        snacks: 5
    };

    if (income > 50000) {
        console.log("GRISCH")
        savings += remains * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent); 
        UserPercentage = {
            others: 25, 
            food: 30, 
            nationCard: 20, 
            snacks: 5
        };

    } else if (income > 20000) {
        savings += remains * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = { // man kan unna sig lite mer om man tjänar mer än 20k, eventuellt dra av lite direkt till savings
            others: 20, 
            food: 35, 
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

/**
 * Function to add money from the categories created from the remaining budget
 * 
 * @param {number} remaining_budget - The remaining amount of income to be used for th
 * @param {string} category - The category that money will be added to. 
 * @returns {number} amount - The amount to be added to the category
 */
export function add_to_budget(remaining_budget: number, category: string): number {
    console.log("Your remaining budget amount (after rent and savings): ", remaining_budget)
    let amount: number = Number(prompt(`Amount to ${category}: `))
    while (amount > remaining_budget) {
        console.log("That is not reasonable, try again")
        amount = Number(prompt(`Amount to ${category}: `))
    }
    return amount;
}

/**
 * Allows the user to add categories to their budget.
 * @param {UserBudget} budget - the users budget before 
 * @param {number} remaining_budget - the remaining amount of income to be used for th 
 * @returns {UserBudget} the updated budget with the new categories
 */
function add_categories(budget: UserBudget, remaining_budget: number): UserBudget {
    while (true) {
        const if_category = prompt("Would you like to add a custom category? (y/n): ") //.trim().toLowerCase();
            if (if_category === "n") {
                break
            };
        const category_name = prompt("What is the name of your custom category? ");
        const amount = add_to_budget(remaining_budget, category_name!)
        budget.categories.push({name: category_name!, amount: amount });
        remaining_budget -= amount;  // Subtract custom category amount from remaining budget
    } 
    budget.savings += remaining_budget
    return budget
}

/**
 * Creates a budget for the user based on their entered amounts and added categories
 * @param {Array} user_data an array with info of the users income, savings ans rent
 * @param {Array} categories an array with the names of the users budget categories
 * @returns {UserBudget} the created budget
 */
export function make_budget(user_data: Array<number>, categories: Array<string>): UserBudget {
    const income = user_data[0];
    let savings = user_data[1];
    const rent = user_data[2];
    let remaining_budget: number = income - (savings + rent); 
    
    let budget: UserBudget = {income: income, savings: savings, rent: rent, categories: []}

    let n = 0;
    while (n < categories.length) {
        const amount = add_to_budget(remaining_budget, categories[n])
        budget.categories.push({name: categories[n], amount: amount})
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
/**
 * Function to decide which of the possible menus will be shown
 * @param {number} x the number of the menu
 * @returns {string} - returns the option in the menu that is shown, chosen by the user.
 * Invariant: Anything other than a single-digit string of the options chosen
 */
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
    const choice: string = String(prompt("\nChoose your option: ")).trim().toLowerCase();
    return choice
}

/**
 * Function that views earlier budgets created by a user.
 * Either shows the earlier budget or consoles that "no budget has been created yet".
 * If no budget has been created, the function calls on user_action, so one can be created. 
 * @param {string} username - The username of the user that is logged in
 * @returns {void} 
 */
export function view_budget(username: string): void {
    let users = openData();
    if (username in users && users[username].budget.income != 0) { // kollar nu så att income inte är noll
        // här kanske vi kan ta bort 
        const userBudget: UserBudget = users[username].budget;
        console.log("Your budget:", userBudget);
    } else {
        console.log("No budget has been created yet");
    }
    user_actions(username)
}

/**
 * This functions contains the user actions on menu(3), where the options are 
 * "g" (generate budget) "c": create budget, "v": view budget, "l": log ut.
 * @param {string} username - The username of the user that is logged in 
 * @returns {void}
 */
function user_actions(username: string): void {
    console.log("\nWelcome!");
    const choice = menu(3);
    if (choice === "g") {
        let users: Users = openData()
        const user_data = Userinput()
        let budget = budget_judge(user_data)
        const is_budget: string = String(prompt("This is your budget. Do you want to modify it? (y/n): ")).trim().toLowerCase();
        if (is_budget === "y") {
            let categories: Array<string> = users[username].budget.categories.map(category => category.name);
            budget = make_budget(user_data, categories);
        }
        users[username].budget = budget; // Uppdatera användarens budget
        saveData(users);    
        plotChart(budget)
        //displayUserBudget(budget)
    }

    if (choice === "c") {
        let users: Users = openData();
        const user_data = Userinput()
        let categories = users[username].budget.categories.map(category => category.name);
        let budget = make_budget(user_data, categories)
        //displayUserBudget(budget)
        console.log(budget)
        const is_budget: string = String(prompt("This is your budget. Do you want to modify it? (y/n): ")).trim().toLowerCase();
        if (is_budget === "y") {
            users[username].budget = budget;
            categories = users[username].budget.categories.map(category => category.name);
            console.log(categories)
            budget = make_budget(user_data, categories); //displayUserBudget(budget)
        }
        users[username].budget = budget; // när man lägger till kategorier fuckar det lite med att spara ner budgeten, får kolla på det
        saveData(users)
        plotChart(budget)
}
    if (choice === "l") {
        console.log("logging out...")
        main();
    }
    if (choice === "v") {
        view_budget(username)
    }
}

/**
 * Main function controlling flow of the program
 * Initial menu and handles user choice from following:
 * - "q":Exits the program.
 * - "l": Allows user to log in and proceeds to the user actions menu
 * - "c": Allows user to create a new account. If successful, proceeds to the user actions menu.
 *
 * @returns {void} - does not return any value 
 */
function main() {
    splash()

    const choice = menu(1)
    if (choice === "q") {
        console.log("quitting....")
        return;
    }

    if (choice === "l") {
        let logged_in_user: string | void = ""
        while (true) {
            const username: string = String(prompt("Username: "));
            const password: string = String(prompt("Password: "));
            logged_in_user = login(username, password)
            if (username === logged_in_user) {
                break // Om inloggningen lyckas, skicka användaren till user_actions()
            } else {
                const retry = menu(2)
                if (retry === "q") {
                    return main()
                }
            }
        }
        user_actions(logged_in_user);
    }

    if (choice === "c") {
        console.log("New user:\n")
        let created_user: string | void = ""
        while (true) {
            const username: string = String(prompt("Username: "));
            const password: string = String(prompt("Password: "));
            created_user = create_account(username, password);
            if (created_user) { // om vi ska gå vidare eller ej, if true
                break 
            } 
        }
        user_actions(created_user);
    }  
}
main()