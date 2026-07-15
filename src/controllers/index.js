export const showHomePage  = (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};
