# Le Secret du Conservateur

Escape game réalisé dans le cadre d'un BTS SIO.

Le projet existe désormais sous deux formes :
- une version web locale ;
- une application de bureau pour Windows et macOS.

Le jeu se déroule dans un musée fermé de nuit et suit un fil rouge unique : la « folie perçue par la société » dans l'histoire de l'art.

## Ce que contient le jeu

Le joueur explore trois salles thématiques :
- Salle 1 - Angoisse intérieure
- Salle 2 - Rêve et visions
- Salle 3 - Rupture et scandale

Dans chaque salle, il observe des œuvres, lit des informations sur les artistes, comprend ce qui relie les œuvres entre elles, puis valide une console d'analyse.

Le jeu ne repose pas sur des calculs. Il s'appuie sur la compréhension, l'observation et l'interprétation.

Les trois mots-clés finaux sont :
- `INTERIEUR`
- `IMAGINAIRE`
- `RUPTURE`

## Installation simple depuis GitHub

Si tu veux simplement jouer au jeu sans utiliser VS Code ni lancer de serveur local, il faut passer par la page des releases GitHub.

Étapes :
1. Ouvre la page GitHub du projet.
2. Clique sur `Releases`.
3. Ouvre la dernière release disponible.
4. Télécharge le fichier correspondant à ton ordinateur.
5. Ne télécharge pas `Source code (zip)` ou `Source code (tar.gz)` si tu veux seulement jouer.
6. Si tu vois un fichier technique comme `.yml` ou `.blockmap` dans une ancienne release, ignore-le : il ne sert pas à jouer.

### Quel fichier choisir ?

Pour Windows :
- télécharge le fichier `.exe`.

Pour Mac Intel :
- télécharge le fichier `.dmg` contenant `mac-x64`.

Pour Mac Apple Silicon (M1, M2, M3, etc.) :
- télécharge le fichier `.dmg` contenant `mac-arm64`.

À partir des prochaines releases, la page GitHub ne publiera plus que les vrais fichiers utiles pour jouer :
- le `.exe` Windows ;
- le ou les `.dmg` macOS ;
- les archives de code source automatiques de GitHub, à ignorer pour un joueur.

## Installation sur Windows

1. Télécharge le fichier `.exe` depuis la release.
2. Double-clique sur le fichier téléchargé.
3. Suis les étapes de l'installateur.
4. Lance le jeu depuis le bureau ou le menu Démarrer.

Si Windows affiche un avertissement de sécurité :
1. clique sur `Informations complémentaires` ;
2. puis clique sur `Exécuter quand même`.

## Installation sur macOS

1. Télécharge le fichier `.dmg` adapté à ton Mac.
2. Ouvre le fichier `.dmg`.
3. Glisse l'application dans le dossier `Applications`.
4. Ouvre l'application depuis `Applications`.

Si macOS bloque l'ouverture parce que l'application provient d'un développeur non identifié :
1. ferme le message d'erreur ;
2. va dans `Réglages Système` ;
3. ouvre `Confidentialité et sécurité` ;
4. clique sur `Ouvrir quand même`.

Autre méthode :
- fais un clic droit sur l'application ;
- puis clique sur `Ouvrir`.

## Lancement local de la version web

Si tu veux lancer le projet comme un site web local :

Option simple :
- ouvre `index.html` dans un navigateur moderne.

Option recommandée :
```bash
python3 -m http.server 8000
```

Puis ouvre [http://localhost:8000](http://localhost:8000).

## Contrôles

Clavier :
- `ZQSD` / `WASD` / touches fléchées : se déplacer ;
- `Maj` : courir ;
- `E` : interagir ;
- `E` / `Échap` / `x` : fermer une fenêtre ;
- `J` : ouvrir ou fermer le carnet ;
- `U` : activer ou désactiver le mode UV ;
- `M` : activer ou couper le son.

Sur mobile :
- boutons tactiles en bas de l'écran.

## Objectif pédagogique

Le jeu cherche à montrer que des artistes souvent jugés « fous » par leur époque ont surtout proposé de nouvelles manières de voir, de ressentir et de représenter le monde.

Le joueur doit comprendre que :
- la folie perçue est souvent un regard social ;
- une œuvre troublante n'est pas vide de sens ;
- l'art peut exprimer l'angoisse, le rêve, la rupture et la critique sociale.

## Structure du projet

- `index.html` : structure de l'interface ;
- `styles.css` : styles, HUD et overlays ;
- `main.js` : logique du jeu, collisions, progression, rendu et audio ;
- `assets/artworks/` : reproductions locales des œuvres ;
- `electron/main.js` : fenêtre Electron de l'application de bureau ;
- `.github/workflows/release-desktop.yml` : build automatique Windows et macOS ;
- `guide-professeur.txt` : scénario, solution et lecture pédagogique.

## Faire une release de l'application

Le projet est préparé pour produire :
- un installateur Windows ;
- une application macOS.

Les releases sont automatisées via GitHub Actions.

### Méthode recommandée

1. Modifie le projet.
2. Mets à jour la version dans `package.json`.
3. Crée un tag Git :
```bash
git tag v1.0.0
git push origin main --tags
```
4. GitHub Actions lance automatiquement les builds Windows et macOS.
5. Les fichiers sont ajoutés à la release GitHub.

### Méthode manuelle

Il est aussi possible de lancer le workflow depuis l'onglet `Actions` sur GitHub avec `workflow_dispatch`.

## Lancement et build pour le développement

Prérequis :
- Node.js 20 ou plus récent ;
- npm.

Installation des dépendances :
```bash
npm install
```

Lancer l'application de bureau en local :
```bash
npm run start
```

Construire la version Windows :
```bash
npm run dist:win
```

Construire la version macOS :
```bash
npm run dist:mac
```

Construire toutes les cibles configurées :
```bash
npm run dist
```

## Ressources artistiques

Le projet utilise des références artistiques issues de Wikipedia et de Wikimedia Commons.
Les visuels nécessaires au jeu sont stockés localement dans `assets/artworks/` pour éviter de dépendre du réseau au moment de jouer.

## Remarque importante

Le but du projet n'est pas seulement de « finir un escape game ».
Il vise aussi à faire émerger une lecture de l'art, des artistes et du regard que la société porte sur ce qui la dérange ou la dépasse.
