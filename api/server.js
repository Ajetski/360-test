const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    return res.send({
        response: eval('(function() { ' + req.body.code + ' }())')
    })
});

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
});
