const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/season/2025',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  
  res.on('data', (d) => {
    const data = JSON.parse(d);
    console.log('Season Info:');
    console.log(JSON.stringify(data.seasonInfo, null, 2));
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
