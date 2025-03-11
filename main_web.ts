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

// User-types
type UserBudget = {
    income: number;
    savings: number;
    rent: number;
    categories: BudgetCategory[];
};

type User = {
    password: string;
    budget: UserBudget;
};

type Users = {
    [key: string]: User;
};

const Chart = (window as any).Chart;
let myChart: any = null; // Skapa en variabel för diagrammet

function createChart(budget: UserBudget): void {

    let labelsToAdd = []
    let amountsToAdd = []
  
    labelsToAdd.push("Savings", "Rent")
    amountsToAdd.push(budget.savings, budget.rent)
  
  
    for (let i = 0; i < budget.categories.length; i = i+1) {
      const current_name = budget.categories[i].name
      const current_amount = budget.categories[i].amount
      labelsToAdd.push(current_name);
      amountsToAdd.push(current_amount);
    }
  
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
    // Om diagrammet redan finns, gör ingenting
    if (myChart) {
        return;
    }
  
    // Skapa och lagra diagrammet
    myChart = new Chart(ctx, { 
        type: 'doughnut',
        data: { 
            labels: labelsToAdd,
            datasets: [{
                label: 'Amount',
                data: amountsToAdd,
                backgroundColor: ["lightcoral", "mistyrose", "pink", "lavender", "peachpuff", "lightblue", "palegreen"],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, 
        }
    });

    setTimeout(function () {
        console.log("Program continues...");
        return;  // Anropa nästa steg istället för att prompt() körs direkt
    }, 5000);
    
  }

function openData(): Users {
    const storedData = localStorage.getItem("userData"); // Försök att hämta sparad data från localStorage
    const parsedData = JSON.parse(storedData!); // Om det finns data, omvandla den från JSON till ett objekt
    return parsedData;
}

function saveData(users: Users) {
    try {
        const jsonData = JSON.stringify(users, null, 2);
        localStorage.setItem("userData", jsonData); // Spara JSON-strängen i localStorage
        console.log("Data saved successfully!");
        //console.log("Saved data:", jsonData); // Logga den sparade datan för att verifiera
    } catch (error) {
        console.error("Error saving data", error);
    }
}


//Standard budget object for a user, initializing all values to 0
const StandardBudget: UserBudget = {
    income: 0,
    savings: 0,
    rent: 0,
    categories: [
    {name: "Others", amount: 0},
    {name: "Food", amount: 0},
    {name: "NationCard", amount: 0},
    {name: "Snacks", amount: 0 }]
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
 * Allows the user to login to the program. The user enter their username and password. 
 * @return {string | void } - If username and password is correct, the username is returned. 
 * If incorrect void is returned and the main function calls login() again.
 */
function login(username: string, password: string): string | void {
    let users: Users | null = openData()
    
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
 * @returns {string | void } the username of the new user, or void if taken username was chosen. 
 */
function create_account(username: string, password: string): string | void {
    let users = openData()    
    console.log("Creating new user...")
    
    if (username in users!) {
        console.log("Username is already taken")
        return undefined;
    } else {   
        users![username] = { password: password, budget: StandardBudget };
        console.log("\nAccount created successfully!");   
        saveData(users!)
        return username; 
    }   
}


/** 
* Function to retrive income, spendings and saving goal
*/
function Userinput(): Array<number> {

    const income: number = Number(prompt("What is your income?"));
    const savings: number = Number(prompt("What is your saving goal?")); 
    const rent: number = Number(prompt("What is your rent?")); 

    return [income, savings, rent];
}


/**
 * Creates a budget from users income, rent and saving-goal based on percentages.
 * @param {Array} user_data - an array with info of the users income, rent and saving-goal
 * @returns {UserBudget} the new generated budget 
 */
function budget_judge(user_data: Array<number>): UserBudget {
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
        savings += remains * 0.30; // ta bort en del av inkomst direkt till savings
        remains = income - (savings + rent); 
        UserPercentage = {
            others: 35, 
            food: 35, 
            nationCard: 25, 
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
    console.log(remains)
    console.log(UserPercentage)
    const others = (remains * UserPercentage.others) / 100;
    const food = (remains * UserPercentage.food) / 100;
    const nationCard = (remains * UserPercentage.nationCard) / 100;
    const snacks = (remains * UserPercentage.snacks) / 100;
    
    const budget = {
        income: income, 
        savings: savings, 
        rent: rent,
        categories:
        [{name: "Others", amount: others},
        {name: "Food", amount: food}, 
        {name: "NationCard", amount: nationCard},
        {name: "Snacks", amount: snacks}]
    };
    console.log(budget);
    return budget;
}

/**
 * Function to add money from the categories created from the remaining budget.
 * @param {number} remaining_budget - The remaining amount of income to be used for th
 * @param {string} category - The category that money will be added to. 
 * @returns {number} amount - The amount to be added to the category
 */
function add_to_budget(remaining_budget: number, category: string): number {
    console.log("Your remaining budget amount (after rent and savings): ", remaining_budget)
    let amount: number = Number(prompt(`Remainging budget: ${remaining_budget}\nAmount to ${category}: `))
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
        console.log(`Category ${category_name} added!\n`)
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
function make_budget(user_data: Array<number>, categories: Array<string>): UserBudget {
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
    let output = ""
    if (x === 1) {
        output = ("\nl) Login \nc) Create account \nq) Quit")
    }
    if (x === 2) {
        output = ("\nr) Retry \nq) Quit")
    }
    if (x === 3) {
        output = ("\ng) Generate budget \nc) Create your own budget \nv) View earlier budget \nl) Log out")
    }
    const choice: string = String(prompt(`${output}\nChoose your option: `)).trim().toLowerCase();
    return choice
}

/**
 * Function that views earlier budget created by a user.
 * Either shows the earlier budget or consoles that "no budget has been created yet".
 * If no budget has been created, the function ca
 * lls on user_action, so one can be created. 
 * @param {string} username - The username of the user that is logged in
 * @returns {void} 
 */
function view_budget(username: string): void {
    let users = openData();
    if (username in users && users[username].budget.income != 0) { 
        const userBudget: UserBudget = users[username].budget;
        console.log("Your budget:", userBudget);
        createChart(userBudget)
    } else {
        console.log("No budget has been created yet");
    }
    return user_actions(username)
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
        createChart(budget)
    }

    if (choice === "c") {
        let users: Users = openData();
        const user_data = Userinput()
        let categories = users[username].budget.categories.map(category => category.name);
        let budget = make_budget(user_data, categories)
        createChart(budget)
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
        createChart(budget)
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
            if (created_user) { 
                break 
            } 
        }
        user_actions(created_user);
    }  
}
//main()