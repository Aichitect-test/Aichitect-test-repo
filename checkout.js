const crypto = require('crypto');
async function processOrder(repo, { guestEmail, paymentDetails }) {
  if (!guestEmail || !guestEmail.includes('@')) throw new Error('Invalid email');
  const id = crypto.randomUUID();
  const hash = crypto.createHash('sha256').update(guestEmail).digest('hex');
  await repo.save(id, hash, 'SUCCESS');
  console.log(`Audit: Order ${id} processed`);
  return { id };
}
module.exports = { processOrder };