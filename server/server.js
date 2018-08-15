const express = require('express') //install
const fs = require('fs')//built-in
const path = require('path') //built-in

const pathPublic = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(pathPublic)) //configure express to use the path to public

















//configure the server
app.listen(port, () => {
  console.log(`Server up and listening on ${port}`);
})
