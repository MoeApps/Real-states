import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('index.js: GET /');
  res.render('pages/Home',{ user: (req.session.user === undefined ? "" : req.session.user)});
});

router.get('/aboutus', function (req, res, next) {
  console.log('index.js: GET /');
  res.render('pages/aboutus',{ user: (req.session.user === undefined ? "" : req.session.user)});
});
router.get('/contactus', function (req, res, next) {
  console.log('index.js: GET /');
  res.render('pages/contactus',{ user: (req.session.user === undefined ? "" : req.session.user)});
});
export default router;