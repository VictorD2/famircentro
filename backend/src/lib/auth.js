module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/Login');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    typePetition(req, res, next) {
        const datos = JSON.stringify(req.headers);
        const respuesta = datos.search("cors");
        if (respuesta === -1) return res.redirect('/');
        return next();
    },

    isAdmin(req, res, next) {
        if (req.user.Rango == "user") return res.redirect('/');

        return next();
    }
}