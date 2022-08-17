const router = require('express').Router();
const { Blog, User } = require('../models');
// const withAuth = require('../utils/auth');

// ==============================================================================================
// Login to dashboard as a user------------------------------------------------------------------ 
// router.get('/profile', withAuth, async (req, res) => {
  router.get('/api/dashboard', async (req, res) => {
    // 
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    // 
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// View one blog  with user data in Dashboard-------------------------------------------------------
router.get('/api/dashboard/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    // res.status(200).json(blogData);
    res.render('blog', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// ===============================================================================================
// View all blogs with user data on the Homepage-------------------------------------------------
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// View one blog in the Homepage with an ability to comment-----------------------------------------
router.get('/comment/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    // res.status(200).json(blogData);
    res.render('comment', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Signup-------------------------------------------------------------------------------------------
router.get('/signup', (req, res) => {

  res.render('signup');
});
// Login--------------------------------------------------------------------------------------------
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/dashboard/');
    return;
  }

  res.render('login');
});
// -------------------------------------------------------------------------------------------------
module.exports = router;
