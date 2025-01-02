import express, { json } from 'express';
import { connect } from 'mongoose';

const app = express();
const port = 3000;

// Middleware pour analyser le corps des requêtes en JSON
app.use(json());

// Connexion à la base de données MongoDB
connect('mongodb://localhost:27017/gestion_recommandations')
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB', err);
    });

// Route de base
/*
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'application de gestion de suivi de recommandations de réunion !');
});
*/

app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html'); });

// Utiliser les routes 
const userRoutes = require('./routes/userRoutes'); 
const meetingRoutes = require('./routes/meetingRoutes'); 
const recommendationRoutes = require('./routes/recommendationRoutes'); 

app.use('/api', userRoutes); 
app.use('/api', meetingRoutes); 
app.use('/api', recommendationRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
