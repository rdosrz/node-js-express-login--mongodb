const express = require('express');
const router = express.Router();




router.get("/", (req, res) => {
  
  res.redirect('http://localhost:8080/api/test/user');
  //res.render("index", { title: "First Web Node" });
});

router.get("/dashboard", (req, res) => {
 
  //res.redirect('http://localhost:8080/api/test/user');
  res.render("dashboard", { data: req.body.username, title: "About First Node Website" });
});

router.get("/login", (req, res) => {

  res.render("login", { title: "About First Node Website" });
});

module.exports = router;