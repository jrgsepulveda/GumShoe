// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Appointments = require("../models/appointments");
const Contacts = require("../models/contacts");
const Products = require("../models/products")

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  //ADDED BY PAO
  //app.post("/api/home", (req, res) => {
  //  db.User.update(req.body)
  //},
  //** 

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //find all contacts
  app.get("/api/contacts", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Contacts.findAll({
      }).then((dbContacts) => {
        res.json({ dbContacts });
      });
    }
  });

  // POST route for saving a new post
  app.post("/api/contacts", (req, res) => {
    console.log(req.body)
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Contacts.create(req.body).then((dbContacts) => {
        res.json({ dbContacts });
      });
    }
  });

  // DELETE route for deleting posts
  app.delete("/api/contacts/:id", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Contacts.destroy({
        where: {
          id: req.params.id
        }
      }).then((dbContacts) => {
        res.json(dbContacts);
      });
    }
  });

  // PUT route for updating posts
  app.put("/api/contacts", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Contacts.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then((dbContacts) => {
          res.json(dbContacts);
        });
    }
  });

  //find all products
  app.get("/api/products", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Products.findAll({
      }).then((dbProducts) => {
        res.json({ dbProducts });
      });
    }
  });

  // POST route for saving a new products
  app.post("/api/products", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Products.create(req.body).then((dbProducts) => {
        res.json({ dbProducts });
      });
    }
  });

  // DELETE route for deleting products
  app.delete("/api/products/:id", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Products.destroy({
        where: {
          id: req.params.id
        }
      }).then((dbProducts) => {
        res.json(dbProducts);
      });
    }
  });

  // PUT route for updating products
  app.put("/api/products", (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      db.Products.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then((dbProducts) => {
          res.json(dbProducts);
        });
    }
  });
};

// db.Contacts.findAll({
//   include: [db.Post]
// }).then(function(dbContacts) {
//   res.json(dbContacts);
// });

// db.Contacts.findAll({
//   include: [db.Post]
// }).then(function (dbContacts) {
//   res.json(dbContacts);
// });



/*app.get("/api/contacts/:id", function(req, res) {
// Here we add an "include" property to our options in our findOne query
// We set the value to an array of the models we want to include in a left outer join
// In this case, just db.Post
db.Contacts.findOne({
  where: {
    id: req.params.id
  },
  include: [db.Post]
}).then(function(dbContacts) {
  res.json(dbContacts);
});
});

app.post("/api/contacts", function(req, res) {
db.Contacts.create(req.body).then(function(dbContacts) {
  res.json(dbContacts);
});
});

app.delete("/api/contacts/:id", function(req, res) {
db.Contacts.destroy({
  where: {
    id: req.params.id
  }
}).then(function(dbContacts) {
  res.json(dbContacts);
});
});*/

