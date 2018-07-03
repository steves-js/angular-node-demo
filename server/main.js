
const express = require('express');

// Project APIs
const itemRoutes = require('./item/item.routes');

const app = express();
app.use('/item', itemRoutes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));