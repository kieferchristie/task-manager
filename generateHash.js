const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Generated hash:', hashedPassword);
}

generateHash().catch(err => console.error('Error generating hash:', err));
