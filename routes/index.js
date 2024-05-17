router.get('/my-articles', authenticate, async (req, res) => {
    const user = req.user;
    const articles = await Article.find({ author: user._id });
    res.render('myArticles', { articles });
});

router.get('/articles', async (req, res) => {
    const articles = await Article.find();
    res.render('articleList', { articles });
});