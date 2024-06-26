const bcrypt = require('bcrypt');

const password = 'password123';

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log('Generated hash:', hash);
  });
});
