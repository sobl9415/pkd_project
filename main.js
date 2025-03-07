"use strict";
//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.create_account = create_account;
exports.Userinput = Userinput;
exports.budget_judge = budget_judge;
exports.add_to_budget = add_to_budget;
exports.make_budget = make_budget;
exports.view_budget = view_budget;
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
var fs = require("fs");
var PromptSync = require("prompt-sync");
var pie_example_2__1_1 = require("./pie_example-2 (1)");
var prompt = PromptSync();
var FILE_PATH = "users.json";
//let users: Users = {};
// Exempel, skriv om som type example eller vad det kallas
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
/**

const users: Users = {
    sofia: { password: "blomstrand" },
    tilda: { password: "larsson" },
    matilde: { password: "wiberg" }
};
 */
// Functions
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
/**
 * Opens the JSON file and retreives the created users.
 */
function openData() {
    var data = fs.readFileSync(FILE_PATH, "utf8"); // "utf8" betyder att filen ska läsas som text (inte binärdata)
    return JSON.parse(data); // JSON.parse(data) omvandlar JSON-strängen till ett objekt
}
/**
 * Function to save user-data in the JSON file
 */
function saveData(users) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), "utf8");
}
/**
 * Allows the user to login to the program. The user enter their username and password
 *
 *
 * @return {string | void } - If username and password is correct, the username is returned
 *  - If incorrect, the user is prompted to quit or retry
 */
function login() {
    while (true) {
        var users = openData();
        var username = String(prompt("Username: "));
        var password = String(prompt("Password: "));
        if (username in users && users[username].password === password) {
            console.log("Login successful!");
            return username;
        }
        console.log("Incorrect username or password");
        var retry = menu(2);
        if (retry === "q") {
            console.log("Quitting...");
            return;
        }
    }
}
/**
 * Creates account and an empty budget for new user.
 * @returns {string} the username of the new user
 */
function create_account() {
    var users = openData(); // det gör däremot användarnamnet tror jag
    console.log("New user: ");
    while (true) {
        var newUsername = String(prompt("Username: "));
        if (newUsername in users) {
            console.log("Username is already taken");
        }
        else {
            var newPassword = String(prompt("Password: "));
            var startBudget = 0;
            users[newUsername] = { password: newPassword, budget: StandardBudget };
            console.log("Account created successfully!");
            saveData(users);
            return newUsername;
        }
    }
}
/**
* Function to retrive income, spendings and saving goal
*/
function Userinput() {
    var income = Number(prompt("What is your income?: "));
    var savings = Number(prompt("What is your saving goal?: ")); // felkontroll så det ej är större än income
    var rent = Number(prompt("What is your rent?: ")); // samma här
    return [income, savings, rent];
}
/**
 * Creates a budget from users income, rent and saving-goal based on percentages.
 * @param {Array} user_data - an array with info of the users income, rent and saving-goal
 * @returns {UserBudget} the new generated budget
 */
function budget_judge(user_data) {
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remains = income - (savings + rent);
    var UserPercentage = {
        others: 30,
        food: 40,
        nationCard: 15,
        snacks: 5
    };
    if (income > 50000) {
        console.log("GRISCH");
        savings += remains * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 25,
            food: 30,
            nationCard: 20,
            snacks: 5
        };
    }
    else if (income > 20000) {
        savings += remains * 0.20; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent);
        UserPercentage = {
            others: 20,
            food: 35,
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
/**
 * Function to add money from the categories created from the remaining budget
 * @param {number} remaining_budget - The remaining amount of income to be used for th
 * @param {string} category - The category that money will be added to.
 * @returns {number} amount - The amount to be added to the category
 */
function add_to_budget(remaining_budget, category) {
    console.log("Your remaining budget amount (after rent and savings): ", remaining_budget);
    var amount = Number(prompt("Amount to ".concat(category, ": ")));
    while (amount > remaining_budget) {
        console.log("That is not reasonable, try again");
        amount = Number(prompt("Amount to ".concat(category, ": ")));
    }
    return amount;
}
/**
 * Allows the user to add categories to their budget.
 * @param {UserBudget} budget - the users budget before
 * @param {number} remaining_budget - the remaining amount of income to be used for th
 * @returns {UserBudget} the updated budget with the new categories
 */
function add_categories(budget, remaining_budget) {
    while (true) {
        var if_category = prompt("Would you like to add a custom category? (y/n): "); //.trim().toLowerCase();
        if (if_category === "n") {
            break;
        }
        ;
        var category_name = prompt("What is the name of your custom category? ");
        var amount = add_to_budget(remaining_budget, category_name);
        budget.categories.push({ name: category_name, amount: amount });
        remaining_budget -= amount; // Subtract custom category amount from remaining budget
    }
    budget.savings += remaining_budget;
    return budget;
}
/**
 * Creates a budget for the user based on their entered amounts and added categories
 * @param {Array} user_data an array with info of the users income, savings ans rent
 * @param {Array} categories an array with the names of the users budget categories
 * @returns {UserBudget} the created budget
 */
function make_budget(user_data, categories) {
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remaining_budget = income - (savings + rent);
    var budget = { income: income, savings: savings, rent: rent, categories: [] };
    var n = 0;
    while (n < categories.length) {
        var amount = add_to_budget(remaining_budget, categories[n]);
        budget.categories.push({ name: categories[n], amount: amount });
        remaining_budget -= amount;
        n += 1;
    }
    budget = add_categories(budget, remaining_budget);
    console.log(budget);
    return budget;
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
    //console.log("Does this budget seem okay or do you want to modify");
}
/**
 * Function to decide which of the possible menus will be shown
 * @param {number} x the number of the menu
 * @returns {string} - returns the option in the menu that is shown, chosen by the user.
 * Invariant: Anything other than a single-digit string of the options chosen
 */
function menu(x) {
    if (x === 1) {
        console.log("\nl) Login \nc) Create account \nq) Quit");
    }
    if (x === 2) {
        console.log("\nr) Retry \nq) Quit");
    }
    if (x === 3) {
        console.log("\ng) Generate budget \nc) Create your own budget \nv) View earlier budgets \nl) Log out");
    }
    var choice = String(prompt("\nChoose your option: ")).trim().toLowerCase();
    return choice;
}
/**
 * Function that views earlier budgets created by a user.
 * Either shows the earlier budget or consoles that "no budget has been created yet".
 * If no budget has been created, the function calls on user_action, so one can be created.
 * @param {string} username - The username of the user that is logged in
 * @returns {void}
 */
function view_budget(username) {
    var users = openData();
    if (username in users && users[username].budget.income != 0) { // kollar nu så att income inte är noll
        // här kanske vi kan ta bort 
        var userBudget = users[username].budget;
        console.log("Your budget:", userBudget);
    }
    else {
        console.log("No budget has been created yet");
    }
    user_actions(username);
}
/**
 * This functions contains the user actions on menu(3), where the options are
 * "g" (generate budget) "c": create budget, "v": view budget, "l": log ut.
 * @param {string} username - The username of the user that is logged in
 * @returns {void}
 */
function user_actions(username) {
    console.log("\nWelcome!");
    var choice = menu(3);
    if (choice === "g") {
        var users = openData();
        var user_data = Userinput();
        var budget = budget_judge(user_data);
        var is_budget = String(prompt("This is your budget. Do you want to modify it? (y/n): ")).trim().toLowerCase();
        if (is_budget === "y") {
            var categories = users[username].budget.categories.map(function (category) { return category.name; });
            budget = make_budget(user_data, categories);
        }
        users[username].budget = budget; // Uppdatera användarens budget
        saveData(users);
        (0, pie_example_2__1_1.plotChart)(budget);
        //displayUserBudget(budget)
    }
    if (choice === "c") {
        var users = openData();
        var user_data = Userinput();
        var categories = users[username].budget.categories.map(function (category) { return category.name; });
        var budget = make_budget(user_data, categories);
        //displayUserBudget(budget)
        console.log(budget);
        var is_budget = String(prompt("This is your budget. Do you want to modify it? (y/n): ")).trim().toLowerCase();
        if (is_budget === "y") {
            users[username].budget = budget;
            categories = users[username].budget.categories.map(function (category) { return category.name; });
            console.log(categories);
            budget = make_budget(user_data, categories); //displayUserBudget(budget)
        }
        users[username].budget = budget; // när man lägger till kategorier fuckar det lite med att spara ner budgeten, får kolla på det
        saveData(users);
        (0, pie_example_2__1_1.plotChart)(budget);
    }
    if (choice === "l") {
        console.log("logging out...");
        main();
    }
    if (choice === "v") {
        view_budget(username);
    }
}
/**
 * Main function, controlls the program
 */
function main() {
    splash();
    var choice = menu(1);
    if (choice === "q") {
        console.log("quitting....");
        return;
    }
    if (choice === "l") {
        var username = login();
        if (username) {
            var users = openData();
            //let user_data = Userinput()
            user_actions(username); // Om inloggningen lyckas, skicka användaren till user_actions()
        }
        else {
            main(); // börjar om om man quittar sin inloggning istället för att fortsätta loopa/stänga ner helt
        }
    }
    if (choice === "c") {
        var username = create_account();
        if (username) { // om vi ska gå vidare eller ej, if true
            //let user_data = Userinput()
            user_actions(username); // hur blir det med tomma strängen i user_actions sen? Uppdatering: ändrade till username
        }
    }
}
main();
