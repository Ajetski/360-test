const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const fs = require('fs');
const path = require('path');

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    fs.writeFileSync(path.join(__dirname, 'temp.js'), `module.exports = { userFunc: () => {\n\t${req.body.code}\n\t}\n}`);
    const {userFunc} = require('./temp.js')
    const response = userFunc();
    console.log("User Code:", req.body.code, ", Response: ", response);
    res.send({
        response
    });
    delete require.cache[require.resolve('./temp.js')];
});

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
});
