const User = require('../Model/user.model');

exports.user_create = function(req, res ) {
  let user = new User({
    name : req.body.name,
    lastName: req.body.lastName,
    password : req.body.password,
    phone : req.body.phone
  });

  user.save(function (err) {
    if(err) {
      return next(err);
    }
    res.send('User created successfully');
  });
};

exports.user_detail = function(req,res ) {
  User.findById({_id: req.params.id}, function (err, data) {

      if (err) {
        res.send(err)
      } else {
        res.send(data);

      }


  });
};

exports.user_update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
    if (err) return next(err);
    res.send('user udpated.');
  });
};

exports.user_delete = function(req , res ) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if(err) return next(err);
    res.send('Deleted successfully');
  })
}
exports.test = function (req, res) {
  res.send('Greetings from the Test controller!');
};
