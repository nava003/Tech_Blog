const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signlogin', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        });

        if(!userData) {
            res.status(400).json({ message: 'Incorrect username! Please try again.'});
            return;
        }

        const validPW = await userData.checkPassword(req.body.password);

        if (!validPW) {
            res.status(400).json({ message: 'Incorrect password! Please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.isSoftDeleted;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;