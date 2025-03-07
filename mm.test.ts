//Test cases 
import { create_account, budget_judge, add_to_budget, make_budget, view_budget } from './main.ts'

//create_account() - tests ensuring function handles successful account creation
test('When account already exists', () => {   
    
    const result = create_account();
    expect(result).toBe("newUser");
})

//test('When account already exists', () => {    
//    expect().toBe();
//})


//login()
//ensure correct validation of username and password

//budget_judge
//test if budget categories are correctly calculated 

//add_to_budget()
//

//make_budget
//

//view_budget() 
//

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

test('Very high income over 40000', () => {   
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