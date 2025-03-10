//Test cases 
import { create_account, budget_judge, add_to_budget, make_budget, view_budget, login, UserBudget } from './main.ts'

//create_account() - tests ensuring function handles successful account creation
test('Create a new account', () => {
    const example_user = {username: "test_user", password: "test_password"} 
    const result = create_account(example_user.username, example_user.password);
    expect(result).toBe(example_user.username);
})

test('Try to create an account with a taken password', () => {
    const example_user = {username: "sofia", password: "blomstrand"}
    const result = create_account(example_user.username, example_user.password);
    expect(result).toBe(undefined);
})


//login() - ensure correct validation of username and password
test('Login with correct username and password', () => {   
  const example_user = { username: "test_user", password: "testPassword" };  
  const result = login(example_user.username, example_user.password);  // Assuming the login function accepts username and password as arguments
  expect(result).toBe("testUser");
});

test('Login with incorrect username or password', () => {
  const example_user = { username: "test_user", password: "wrongpassword" }  
  const result = login(example_user.username, example_user.password);
  expect(result).toBe(undefined); 
});


//add_to_budget()

//test('', () => {
//  
//});



//budget_judge
test('Creates budget from given Userinput', () => {   
    const result = budget_judge([10000, 2000, 3000]);
    expect(result).toBe({
        income: 10000,
        savings: 2000,
        rent: 3000,
        categories: [
          { name: 'others', amount: 1500 },
          { name: 'food', amount: 2000 },
          { name: 'nationCard', amount: 750 },
          { name: 'snacks', amount: 750 }
        ]
      });
})

test('Creates budget from given user input, with income greater than 20000', () => {   
  const result = budget_judge([25000, 5000, 3000]);
  expect(result).toBe({
      income: 25000,
      savings: 7000,  
      rent: 3000,
      categories: [
        { name: 'others', amount: 3200 },
        { name: 'food', amount: 4200 }, 
        { name: 'nationCard', amount: 2400 }, 
        { name: 'snacks', amount: 1200 } 
      ]
  });
});

test('Very high income over 50000', () => {   
  const result = budget_judge([1000000, 500, 1000]);
  expect(result).toBe({
      income: 1000000,
      savings: 200500,  
      rent: 1000,
      categories: [
        { name: 'others', amount: 199800 }, 
        { name: 'food', amount: 349725 }, 
        { name: 'nationCard', amount: 199700 }, 
        { name: 'snacks', amount: 99900 }
      ]
  });
});