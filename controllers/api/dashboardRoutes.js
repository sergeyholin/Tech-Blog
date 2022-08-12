const router = require('express').Router();
const { Blog } = require('../../models');
// const withAuth = require('../../utils/auth');

// Create Blog-----------------------------------------------------------------------------
// router.post('/', withAuth, async (req, res) => {
  router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
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
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get One Blog----------------------------------------------------------------------------------
// router.get('/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findOne({
//     where: {
//       id: req.params.id,
//       // user_id: req.session.user_id,
//     },
//     });

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Get all blogs---------------------------------------------------------------------------------
// router.get('/', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//     // include: {model: Product}
//   });

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// ----------------------------------------------------------------------------------------------
module.exports = router;