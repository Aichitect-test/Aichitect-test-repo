const assert = require('assert');
const repo = require('./repository');
const checkout = require('./checkout');
async function test() {
  const db = await repo.init();
  const res = await checkout.processOrder(db, { guestEmail: 'test@test.com', paymentDetails: '123' });
  assert(res.id);
  console.log('Test passed');
}
test().catch(e => { console.error(e); process.exit(1); });