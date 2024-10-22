# Utiliser l'image officielle de Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["npm", "start"]
