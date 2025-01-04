# Application app-my-recommandations


### Etape de configuration de base de l'environnement de l'application ###

Initialiser le projet Node.jset installer les dépendances  

Configurer le serveur Express  

Organiser la structure du projet  

Créer les fichiers frontend  

# Initialisation de Git
echo "# app-my-recommandations" >> README.md

git init

git add README.md

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/Jery2022/app-my-recommandations.git

git push -u origin main

# Test et Validation des routes

Utilisez Postman ou votre outil préféré pour tester les nouvelles routes API. 

Voici un exemple de tests à faire pour les routes des tâches :

1- Créer une tâche : Envoyez une requête POST à /api/tasks avec le corps de la requête contenant les informations de la tâche.

2- Obtenir toutes les tâches : Envoyez une requête GET à /api/tasks.

3- Mettre à jour une tâche : Envoyez une requête PUT à /api/tasks/:id avec le corps de la requête contenant les champs à mettre à jour.

4- Supprimer une tâche : Envoyez une requête DELETE à /api/tasks/:id.