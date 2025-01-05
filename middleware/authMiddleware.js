import pkg from 'jsonwebtoken';

const { verify } = pkg;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Accès refusé. Token manquant.');
    }
    try {
        const decoded = verify(token, 'votre-secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Token invalide.');
    }
};

export default authMiddleware;
