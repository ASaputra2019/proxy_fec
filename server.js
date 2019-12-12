const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var proxy = require('http-proxy-middleware');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', proxy ({
  target:'http://localhost:3000',
  router: {
    '/reviews': 'http://localhost:3002',
    '/images': 'http://localhost:3007',
    '/reservation': 'http://localhost:3001',
    '/gallery': 'http://localhost:3005'
  },
  changeOrigin: true
}))

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
