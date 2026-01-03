const fs = require('fs');

// not loading in production environment, workaround
let data = fs.readFileSync('./dist/index.html', 'utf8');
data = data.replace('baseURL:"/"', 'baseURL:"./"');
data = data.replaceAll('src="/', 'src="./');
data = data.replaceAll('href="/', 'href="./');
fs.writeFileSync('./dist/index.html', data);
