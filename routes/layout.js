module.exports = function(req, res){
  res.cookie('current_user', req.session.current_user, { maxAge: 900000, httpOnly: false});
  res.render('layout', { title: 'Lexington' });
};