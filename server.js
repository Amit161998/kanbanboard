const path = require("path");
const express = require("express");
const app = express();
console.log(__dirname)

app.use(express.static(__dirname + '/dist/kanbanBoard'));
app.get('/*', function (req, res) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname + '/dist/kanbanBoard'));
});
// Start the app by listening on the default Heroku port
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});
