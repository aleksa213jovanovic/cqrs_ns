const app = require('./src/app');
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.listen(8080, () => {
  console.log('Server running on 8080');
});