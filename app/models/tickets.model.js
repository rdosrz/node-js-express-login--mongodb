const mongoose = require("mongoose");

const Tickets = mongoose.model(
  "Tickets",
  new mongoose.Schema({
    idticket: String,
    ticketdetails: String,
    customername: String,
    date: String,
    priority: String
  })
);

module.exports = Tickets;
