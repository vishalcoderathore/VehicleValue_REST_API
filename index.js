let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let vehicleAPI = require('./api/vehicleValue');

app.use(vehicleAPI);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
