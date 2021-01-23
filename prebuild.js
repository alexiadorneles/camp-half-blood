const path = require('path');
console.log('dirname is', __dirname);
console.log('path: ', path.resolve('/'))
const { exec } = require("child_process")
exec('ls', (err, stdout, stderr) => {
  console.log('LS result: ')
  console.error('Error ', err);
  console.error('Stdout Error ', stderr)
  console.log('Message ', stdout)
})