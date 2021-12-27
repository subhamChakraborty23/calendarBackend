const app = require("./app");

const port = process.env.PORT || 4000;

app.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Server running on port ${port}`);
  } else {
    console.log(`Listening: http://localhost:${port}`);
  }
});
