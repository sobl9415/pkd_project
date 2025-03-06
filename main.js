"use strict";
//import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'; 
Object.defineProperty(exports, "__esModule", { value: true });
//Chart.register(ArcElement, Tooltip, Legend);
// Types
// kvar att göra
// 1) Fixa så att man inte behöver skriva in inkomst, hyra osv om man gjort det en gång redan
// 2) Fixa så att budgeten kan sparas ner i jsonfilen, när man lägger till ytterligare kategorier. 
//    I add_categories måste dem sparas ner till rätt användare in i json. 
// 3) Om någon siffra i json är 0, så finns ingen tidigare budget, ska ej skrivas ut alla kategorier nollade. En nollad budget skapas
//    när användaren skapas. 
var fs = require("fs");
var PromptSync = require("prompt-sync");
var pie_example_2__1_1 = require("./pie_example-2 (1)");
var prompt = PromptSync();
var FILE_PATH = "users.json";
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
// Funktionerna
function splash() {
    console.log("Welcome to MONEY MAP, your money mapping friend");
}
// kanske ha alla kontot-funktioner i en annan fil?
function openData() {
    var data = fs.readFileSync(FILE_PATH, "utf8"); // "utf8" betyder att filen ska läsas som text (inte binärdata)
    return JSON.parse(data); // JSON.parse(data) omvandlar JSON-strängen till ett objekt
}
function saveData(users) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), "utf8"); // null, 2 används för att formatera JSON-filen med indrag (2 mellanslag per nivå)
        console.log("Data saved successfully!");
    }
    catch (error) {
        console.error("Error saving data:", error);
    }
}
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
        }
    }
}
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
function user_info() {
    // typ om man skulle få en lista på information 
}
// Function to retrive income, spendings and saving goal
function Userinput() {
    var income = Number(prompt("What is your income?: "));
    var savings = Number(prompt("What is your saving goal?: ")); // felkontroll så det ej är större än income
    var rent = Number(prompt("What is your rent?: ")); // samma här
    return [income, savings, rent];
}
function budget_judge(user_data) {
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
        var CustomCategory = prompt("Would you like to add a custom category? (y/n): ").trim().toLowerCase();
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
    var income = user_data[0];
    var savings = user_data[1];
    var rent = user_data[2];
    var remaining_budget = income - (savings + rent);
    var budget = { income: income, savings: savings, rent: rent, categories: [] };
    var category = ["food", "nation-spendings", "snacks", "others"];
    var n = 0;
    while (n < category.length) {
        var amount = add_to_budget(remaining_budget, category[n]);
        budget.categories.push({ name: category[n], amount: amount });
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
function view_budget(username) {
    var users = openData();
    if (username in users && users[username].budget) { // and userbudget någon siffra = 0
        var userBudget = users[username].budget;
        console.log("Your budget:", userBudget);
    }
    else {
        console.log("User not found or no budget has been created");
    }
    user_actions(username);
}
function user_actions(username) {
    console.log("\nWelcome!");
    var choice = menu(3);
    if (choice === "g") {
        var user_data = Userinput();
        var users = openData();
        var budget = budget_judge(user_data);
        console.log(username);
        users[username].budget = budget; // Uppdatera användarens budget
        saveData(users);
        (0, pie_example_2__1_1.plotChart)(budget);
        displayUserBudget(budget);
    }
    if (choice === "c") {
        var users = openData();
        var user_data = Userinput();
        var budget = make_budget(user_data);
        displayUserBudget(budget);
        var is_budget = String(prompt("This is your budget. Do you want to modify it? (y/n): ")).trim().toLowerCase();
        if (is_budget === "n") {
            users[username].budget = budget; // när man lägger till kategorier fuckar det lite med att spara ner budgeten, får kolla på det
            saveData(users);
            (0, pie_example_2__1_1.plotChart)(budget);
            displayUserBudget(budget);
        }
        else {
            var modified_budget = make_budget(user_data);
            users[username].budget = modified_budget;
            saveData(users);
            (0, pie_example_2__1_1.plotChart)(modified_budget);
        }
    }
    if (choice === "l") {
        console.log("logging out...");
        main();
    }
    if (choice === "v") {
        view_budget(username);
    }
}
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
            // här kan man kolla om personen redan har income osv? fast vad händer om personens inkomst ändras?
            //if (users.username.budget) {}
            //let user_data = Userinput()
            user_actions(username); // Om inloggningen lyckas, skicka användaren till user_actions()
        }
    }
    if (choice === "c") {
        var username = create_account();
        if (username) { // om vi ska gå vidare eller ej, if true
            //let user_data = Userinput()
            user_actions(username); // hur blir det med tomma strängen i user_actions sen? Uppdatering: ändrade till username
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
