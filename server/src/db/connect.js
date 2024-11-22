const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://sgowrish15:admin@cluster0.zubff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017