
# Password Manager Application

Cette application est un gestionnaire de mots de passe simple, permettant aux utilisateurs d'ajouter, modifier et supprimer des mots de passe pour différents services. Les mots de passe sont chiffrés avant d'être stockés dans une base de données PostgreSQL.

## Technologies utilisées

- **Next.js** : Framework React utilisé pour la partie front-end et les routes API.
- **Prisma** : ORM (Object-Relational Mapper) utilisé pour interagir avec la base de données PostgreSQL.
- **PostgreSQL** : Base de données relationnelle pour stocker les mots de passe.
- **bcryptjs** : Bibliothèque utilisée pour chiffrer les mots de passe avant de les stocker.
- **Axios** : Client HTTP utilisé pour les requêtes vers les API.
- **Docker** : Conteneurisation de l'application et de la base de données.

## Fonctionnalités

- Ajouter un mot de passe pour un service donné (service, nom d'utilisateur et mot de passe).
- Modifier un mot de passe existant.
- Supprimer un mot de passe.
- Les mots de passe sont chiffrés à l'aide de `bcryptjs` avant d'être stockés dans la base de données.

## Instructions de lancement de l'application

### Prérequis

- **Node.js** : Assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez télécharger Node.js [ici](https://nodejs.org/).
- **Docker** : Assurez-vous d'avoir Docker installé et configuré. Vous pouvez télécharger Docker [ici](https://www.docker.com/products/docker-desktop).

### Installation des dépendances

1. Clonez le dépôt :
   \`\`\`bash
   git clone <URL_DU_DEPOT>
   cd password-manager
   \`\`\`

2. Installez les dépendances Node.js :
   \`\`\`bash
   npm install
   \`\`\`

3. Installez Prisma :
   \`\`\`bash
   npx prisma generate
   \`\`\`

### Configuration de l'environnement

1. Créez un fichier `.env` à la racine du projet et ajoutez la configuration de la base de données PostgreSQL :
   \`\`\`
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase"
   \`\`\`

### Lancer l'application avec Docker

1. **Démarrer PostgreSQL** avec Docker :
   \`\`\`bash
   docker run --name bdd_test -e POSTGRES_PASSWORD=password -p 5432:5432 postgres
   \`\`\`

2. **Lancer les migrations Prisma** pour initialiser la base de données :
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

3. **Lancer l'application** :
   \`\`\`bash
   npm run dev
   \`\`\`

4. Accédez à l'application dans votre navigateur à l'adresse : `http://localhost:3000`.

### Fonctionnalités API

Les routes API suivantes sont disponibles pour interagir avec l'application :

- **GET `/api/passwords`** : Récupère la liste des mots de passe.
- **POST `/api/passwords`** : Ajoute un nouveau mot de passe. Attends un objet JSON avec `service`, `username`, et `password`.
- **PUT `/api/passwords/[id]`** : Met à jour un mot de passe existant. Attends un objet JSON avec `service`, `username`, et `password`.
- **DELETE `/api/passwords/[id]`** : Supprime un mot de passe via son `id`.

### Chiffrement des mots de passe

Les mots de passe sont chiffrés avant d'être stockés dans la base de données à l'aide de la bibliothèque **bcryptjs**. Les mots de passe ne sont jamais stockés en clair, et chaque modification entraîne un nouveau hachage.

## Notes supplémentaires

- **Sécurité** : L'application utilise `bcryptjs` pour assurer la sécurité des mots de passe. Cependant, assurez-vous que votre fichier `.env` (contenant les informations de connexion à la base de données) est correctement sécurisé.
- **Gestion des erreurs** : Assurez-vous que le conteneur PostgreSQL est bien lancé avant de démarrer l'application. Vous pouvez vérifier l'état du conteneur avec la commande :
  \`\`\`bash
  docker ps
  \`\`\`
