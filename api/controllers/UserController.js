/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  signup : function(req, res) {
    console.log("BBQ");

    var Passwords = require('machinepack-passwords');

    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty:10
    }).exec({
      error: function(err) {
        console.log("first part" + err);
        return res.negotiate(err)
      },
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            console.log("second part" + err);

            return res.negotiate(err)
          },
          success: function(gravatarUrl) {
            User.create({
              name:req.param('name'),
              email:req.param('email'),
              password:encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if(err) {
                console.log("last Error: " + err);
                return res.negotiate(err)
              }

              console.log("New User add: ");
              return res.json({
                id: newUser.id
              })
            })
          }
        })
      }
    })
  },

  login : function(req,res) {
    User.findOne({
      email: req.param('email')
    },function foundUser(err, user) {
      if(err) {
        return res.negotiate(err)
      }
      if(!user) {
        return res.notFound();
      }

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function(err) {
          console.log('passworderror');
          return res.negotiate(err)
        },
        incorrect: function() {
          console.log("Password incorrect");
          return res.notFound();
        },
        success: function() {
          req.session.me = user.id;

          console.log('SUCCESS');
          return res.ok()
        }
      })
    })
  },

  logout : function(req,res) {
    User.findOne({
      id: req.session.me
    }, function (err, user) {
      if(err) {
        return res.negotiate(err)
      }
      if(!user) {
        return res.notFound();
      }

      req.session.me = null;

      return res.redirect('/')
    })
  }


};
