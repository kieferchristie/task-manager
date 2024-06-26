const bcrypt = require('bcrypt');

const password = 'password123';
const hashedPassword = '$2b$10$.dk20W75gF4rce6Ty95LmeuLpzqBWZuxrYA1li4sKXCGFwdL/Okei'; // Replace with the actual hash

bcrypt.compare(password, hashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log('Password match status (manual test):', isMatch);
});