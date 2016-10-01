/**
 * Created by Alex.W on 2016/10/1.
 */

module.exports = {

  checkUser: function(req, res) {
    if(!req.session.me) {
      console.log('not login');

      return res.view('login');
    } else {
      console.log('already login');
      return res.view('dashboard');
    }
  },

  getUser: function(req, res) {
    console.log('Running getUser');

    User.findOne({id: req.session.me}, function(err, user) {
      if(err) {
        res.negotiate(err)
      }

      return res.send(user)
    })
  }
}
