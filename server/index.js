const express = require('express');
const app = express();

app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.listen(3000);
console.log('serverlistening at 3000');

