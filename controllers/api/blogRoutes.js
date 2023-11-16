const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['comment_message, date_created, user_id']
                }
            ]
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
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

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            {
                blog_title: req.body.blog_title,
                blog_message: req.body.blog_message
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );

        if (!updatedBlog) {
            res.status(404).json({ message: 'No blog post found with this id!' });
        }

        res.status(200).json(updatedBlog);

    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!deletedBlog) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(deletedBlog);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;