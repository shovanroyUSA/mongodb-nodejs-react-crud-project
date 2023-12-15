const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const cors = require("cors");

const app = express();
// Enable CORS
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://shovanbd:[password]@cluster0.cjtyo4z.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// app.listen(3001, () => {
//   console.log(`Server is running on port 3001`);
// });
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
