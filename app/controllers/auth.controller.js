const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Tickets = db.tickets;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const NewTicket = require("../models/newticket.model");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


exports.registros = (req, res) => {
  //req.session.token = token;
 Tickets.find({}, (err, result)=> {
      if (err) {
         
          return res.status(404).send({ message: "User Not found." });
          
      } else {
         console.log('regreso tickets');
         return res.send(JSON.stringify(result));
          
      }
  })

  
};



exports.newticket = (req, res) => {
  const tickets = new Tickets({
    idticket: req.body.idticket,
    ticketdetails: req.body.ticketdetails,
    customername: req.body.customername,
    date: req.body.date,
    priority: req.body.priority,
  });

  tickets.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      return res.status(200).send({ message: "Registro Agregado." });
          
    }

     });
};



exports.deleteticket = (req, res) => {
  //req.session.token = token;
 Tickets.deleteOne({ idticket: req.body._id }, function(err, obj) {
      if (err) {
         
          return res.status(404).send({ message: "ticket Not found." });
          
      } else {
         console.log('ticket borrado');
         return  res.status(200).send({ message: "borrado" });
          
      }
  })

  
};



exports.updateticket = (req, res) => {
  //req.session.token = token;
 Tickets.updateOne(
          {idticket: req.body.idticket}, 
          {idticket: req.body.idticket, ticketdetails: req.body.ticketdetails, customername: req.body.customername, date: req.body.date, priority: req.body.priority},
  function(err, obj) {
      if (err) {
         
          return res.status(404).send({ message: "No actualizados." });
          
      } else {
         
         return  res.status(200).send({ message: "Actualizados" });
          
      }
  })

  
};
