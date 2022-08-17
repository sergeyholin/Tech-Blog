const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


// Login to dashboard as a user------------------------------------------------------------------- 
// router.get('/profile', withAuth, async (req, res) => {
//   router.get('/', async (req, res) => {
//     // 
//     if (!req.session.logged_in) {
//       res.redirect('/login');
//       return;
//     }
//     // 
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blog }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// --------------------------
// router.get('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const blog = blogData.get({ plain: true });

//     // res.status(200).json(blogData);
//     res.render('blog', {
//       blog,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// ---------------------------------------------------------------------------------------
// Display  create new blog page----------------------------------------------------------
router.get('/new', (req, res) => {

  res.render('newBlog');
});
// Create Blog-----------------------------------------------------------------------------
router.post('/new', withAuth, async (req, res) => {
  // router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
    // res.render('newBlog');
  } catch (err) {
    res.status(400).json(err);
  }
});
// Update Blog--------------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    res.status(200).json(await Blog.update(req.body, {
    where: {
      id: req.params.id,
      // user_id: req.session.user_id,
    }
    }));

  } catch (err) {
    console.log(err);
    res.status(500);
  }
});
// Delete Blog-----------------------------------------------------------------------------------
// router.delete('/:id', withAuth, async (req, res) => {
  router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      // console.log("ERROR")
      return;
    }
// console.log("ERROR")
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ---------------------------------------------------------------------------------------------------
module.exports = router;