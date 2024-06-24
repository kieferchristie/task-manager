const bcrypt = require('bcrypt');

async function testBcrypt() {
  const password = 'password123';
  const hashedPassword = '$2b$10$GlJSp45qs8L0PtireM48VOJO6YvpezFqKil4HT80FROV8IyrjUhe.'; // New hash from generateHash.js

  // Compare the plaintext password with the stored hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password match status (manual test):', isMatch);
}

testBcrypt().catch(err => console.error('Error in bcrypt test:', err));
