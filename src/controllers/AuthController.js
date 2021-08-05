const jwt = require('jsonwebtoken');

module.exports = {

    login(req, res, next) {
        const { user, password } = req.body;

        if(user === 'teste' && password === '123') {
            const id = Math.floor(Math.random() * 100) + 1;

            const token = jwt.sign({ id }, 'secretKey', {
                expiresIn: 300,
            });

            return res.status(200).json({
                auth: true,
                token: token,
            });
        }

        res.status(500).send();
    },

    verify(req, res, next) {
        const token = req.headers['x-access-token'];

        if(!token)
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, 'secretKey', (error, decoded) => {
            if(error)
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            
            next();
        });
    },
    
}