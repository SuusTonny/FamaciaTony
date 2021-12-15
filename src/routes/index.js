const express = require('express');
const router = express.Router();
const passport = require('passport');
const MEDI= require('../models/medicina');
const PRODU= require('../models/productos');

router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/signup', (req, res, next) => {
  res.render('signup');
});
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 
router.get('/signin', (req, res, next) => {
  res.render('signin');
});
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});
router.get('/editar-medicina/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const editar_m = await MEDI.findById(id);
  res.render('editar-medicina',{editar_m});

});
router.post('/editar-medicina/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await MEDI.updateOne({_id:id},req.body);
  res.redirect('/medicina');
});
router.get('/delete_m/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await MEDI.remove({_id:id});
   res.redirect('/medicina');
});
router.get('/medicina',isAuthenticated, async(req, res, next) => {
  const medi = await MEDI.find();
  res.render('medicina', {medi} );
});
router.post('/agregar-medicina',isAuthenticated,async(req,res,next)=>{
  const medi =new MEDI(req.body);
  await medi.save();
  res.redirect('/medicina');
});
router.get('/agregar-medicina',isAuthenticated, async(req, res, next) => {
  res.render('agregar-medicina');
});
router.get('/productos',isAuthenticated, async(req, res, next) => {
  const produ = await PRODU.find();
  res.render('productos', {produ} );
});
router.post('/agregar-producto',isAuthenticated,async(req,res,next)=>{
  const produ =new PRODU(req.body);
  await produ.save();
  res.redirect('/productos');
});

router.get('/agregar-producto',isAuthenticated, async(req, res, next) => {
  res.render('agregar-producto');
});

router.get('/editar-producto/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const editar_p = await PRODU.findById(id);
  res.render('editar-producto',{editar_p});

});

router.post('/editar-producto/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await PRODU.updateOne({_id:id},req.body);
  res.redirect('/productos');
});

router.get('/delete_p/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await PRODU.remove({_id:id});
   res.redirect('/productos');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;