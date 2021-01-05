const plays = require("../_mock_/plays.json");
const invoices = require('../_mock_/invoices.json');

const { statement } = require('../statement.js')


test('test main function', () => {
  
let expResult = 
`Statement for Nissen 
Hamlet: $400.00 (20 seats)
Othello: $500.00 (40 seats)
As You Like It: $357.00 (19 seats)
As You Like It: $468.00 (21 seats)
Amount owed is $1,725.00
You earned 17 credits
`

  expect(statement(invoices[0], plays)).toBe(expResult); 


})
