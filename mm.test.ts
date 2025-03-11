//Test cases 
import { create_account, budget_judge, add_to_budget, make_budget, view_budget, login, UserBudget } from './main'

//create_account() - tests ensuring function handles successful account creation
test('Create a new account', () => {
    const example_user = {username: "test_user", password: "test_password"} // to run this test, remove the test_user from users.json
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
  const example_user = { username: "test_user1", password: "test_password" };  
  const result = login(example_user.username, example_user.password);  // account has been created and exits in the users.json
  expect(result).toBe("test_user1");
});

test('Login with incorrect username or password', () => {
  const example_user = { username: "test_user2", password: "incorrect_password" }  // 
  const result = login(example_user.username, example_user.password);
  expect(result).toBe(undefined); 
});

//budget_judge
test('Creates budget from given Userinput, lower than 20000', () => {   
    const result = budget_judge([10000, 2000, 3000]); 
    expect(result).toEqual({
        income: 10000,
        savings: 2000,
        rent: 3000,
        categories: [
          { name: 'Others', amount: 1500 },
          { name: 'Food', amount: 2000 },
          { name: 'NationCard', amount: 750 },
          { name: 'Snacks', amount: 250 }
        ]
      });
})

test('Creates budget from given user input, with income greater than 20000', () => {   
  const result = budget_judge([25000, 5000, 3000]); 
  expect(result).toEqual({                                                                                                       
    income: 25000,
    savings: 8400,
    rent: 3000,
    categories: [
      { name: 'Others', amount: 2720 },
      { name: 'Food', amount: 4760 },
      { name: 'NationCard', amount: 2720 },
      { name: 'Snacks', amount: 680 }
    ]
  });
});

test('Very high income over 50000', () => {   
  const result = budget_judge([60000, 10000, 10000]); 
  expect(result).toEqual({
    income: 60000,
    savings: 22000,
    rent: 10000,
    categories: [
      { name: 'Others', amount: 9800 },
      { name: 'Food', amount: 9800 },
      { name: 'NationCard', amount: 7000 },
      { name: 'Snacks', amount: 1400 }
    ]
  });
});