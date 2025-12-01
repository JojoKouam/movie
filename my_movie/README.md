# 🍿 CinéMathé - Plateforme de Réservation de Cinéma

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

**CinéMathé** est une application web complète (Fullstack) permettant de consulter les films à l'affiche en temps réel, de regarder les bandes-annonces et de simuler la réservation de billets avec un plan de salle interactif.

**[Voir la démo en ligne](https://movie-wine-theta.vercel.app)**

![Aperçu du projet](/public/cinemathe.png)

## Fonctionnalités

###  Utilisateur
- **Authentification sécurisée** (Inscription/Connexion) avec hachage des mots de passe.
- **Catalogue en temps réel** via l'API TMDB (À l'affiche, Prochainement, Mieux notés).
- **Recherche instantanée** de films.
- **Détails complets** : Synopsis, Casting, Bande-annonce (YouTube), Note.
- **Système de Favoris** et de **Notation** .
- **Réservation interactive** : Choix des sièges sur un plan visuel.
- **Historique** : Consultation des billets achetés.

### Administrateur
- **Dashboard Admin** protégé.
- Visualisation du **Chiffre d'affaires** total.
- Liste des derniers inscrits et des dernières réservations.

## Stack Technique

Ce projet utilise les dernières technologies du web moderne :

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router, Server Components).
- **Langage** : TypeScript.
- **Base de données** : PostgreSQL (hébergé sur Vercel) via [Prisma ORM](https://www.prisma.io/).
- **Authentification** : [NextAuth.js v5](https://authjs.dev/) (Credentials Provider).
- **Style** : Tailwind CSS + Heroicons.
- **API Externe** : The Movie Database (TMDB).
- **Validation** : Zod (pour les formulaires).
- **UI** : React Hot Toast (Notifications).

## Installation en local

Si vous souhaitez cloner et lancer ce projet sur votre machine :
1. **Cloner le dépôt**
```bash
git clone https://github.com/JojoKouam/movie.git
cd my_movie    
```
2. **Installer les dépendances**

 ```bash
   npm install
   ```
   
3. **Configurer les variables d'environnement**
Renommez .env.example en .env (ou créez-le) et ajoutez :

DATABASE_URL="file:./dev.db" 
TMDB_API_KEY="votre_cle_api_tmdb"
AUTH_SECRET="une_phrase_secrete_aleatoire"
AUTH_TRUST_HOST=true

4. **Initialiser la Base de Données**
```bash
npx prisma migrate dev --name init
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```
