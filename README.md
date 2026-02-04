# 📚 MINO - Recréer du lien entre lecteurs et librairies

MINO est une application mobile développée en React Native visant à revitaliser le lien social entre les lecteurs et les librairies indépendantes. À une époque où le numérique semble isoler, MINO utilise la technologie pour ramener l'utilisateur vers le physique et l'humain.

# 🚀 Caractéristiques Techniques

Framework : React Native (Cross-platform iOS/Android)
Transpiler : Babel (Configuration optimisée pour le JavaScript moderne)
Cartographie Native : Intégration hybride utilisant les API natives :
📍 Apple Plan pour les utilisateurs iOS.
📍 Google Maps pour les utilisateurs Android.
Avantage : Une performance fluide et une interface familière selon l'OS utilisé.
Accessibilité : Respect des normes WCAG pour une lecture inclusive.

# 🛠 Installation et Lancement

Prérequis
Node.js (v16 ou supérieur)

Watchman (pour macOS)

CocoaPods (pour iOS)

Android Studio / Xcode

## Installation

### Cloner le projet :
Bash
git clone https://github.com/Yukigana44/MINO.git
cd MINO

### Installer les dépendances :
Bash
npm install
 ou
yarn install

### Installer les pods (iOS uniquement) :
Bash
npx pod-install

### Démarrage
Android : npx react-native run-android
iOS : npx react-native run-ios

# 📖 Concept du Projet

Le projet MINO répond à une problématique majeure : Comment la technologie peut-elle servir la culture physique ? 

### Fonctionnalités Clés :
Géolocalisation intelligente : Trouver les librairies et bouquinistes les plus proches de vous.
Médiation culturelle : Accès aux événements, ateliers et clubs de lecture locaux.
Profils personnalisés : Gestion de vos préférences de lecture et interactions avec la communauté.
Sobriété numérique : Une interface pensée pour être légère, efficace et non-addictive.

# 🏗 Structure du Projet (Intégration)

MinoNative
├── src/
│   ├── assets/         # Ressources (Images, icônes, fonts)
│   ├── components/     # Éléments d'interface réutilisables (Boutons, Cards, etc.)
│   ├── navigation/     # Configuration des flux (Stack, Tabs, Drawer)
│   ├── screens/        # Pages principales de l'application
│   │   ├── Home/
│   │   ├── Map/        # Écran de géolocalisation des librairies
│   │   ├── Profile/
│   │   └── ...
│   ├── services/       # Logique métier et appels API (Firebase ou autre)
│   ├── theme/          # Constantes de style (Couleurs, typographies)
│   └── utils/          # Fonctions utilitaires et helpers
├── App.js              # Point d'entrée de l'application
├── app.json            # Configuration Expo / Native
├── babel.config.js     # Configuration Babel
└── package.json        # Dépendances et scripts de lancement


# 🧑‍💻 Auteur
Julie FRUCHARD – M1 Lead Développeur Front-End (ECV Nantes). Projet réalisé dans le cadre du mémoire de fin d'étude 2026.

Note : Ce projet a été développé avec une approche centrée sur l'utilisateur (UX) et une volonté de réduire l'impact écologique du code (Green IT).
