import pkg from 'bcryptjs';

const { genSalt, hash } = pkg;

// Fonction pour hasher le mot de passe
async function hashPassword(password) {
    const salt = await genSalt(10); // Générer un salt avec 10 rounds
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

// Utiliser la fonction avec un mot de passe fourni en ligne de commande
const password = process.argv[2];
if (!password) {
    console.log('Veuillez fournir un mot de passe en argument.');
    process.exit(1);
}

hashPassword(password).then(hashedPassword => {
    console.log(`Mot de passe haché : ${hashedPassword}`);
}).catch(err => {
    console.error('Erreur lors du hachage du mot de passe :', err);
});
