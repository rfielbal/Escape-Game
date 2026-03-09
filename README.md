# Le Secret du Conservateur

Escape game realise dans le cadre d'un BTS SIO.

Le projet existe maintenant sous deux formes :
- une version web locale
- une version application desktop pour Windows et macOS

Le jeu se deroule dans un musee ferme de nuit et suit un fil rouge unique : la "folie percue par la societe" dans l'histoire de l'art.

## Ce que contient le jeu

Le joueur explore 3 salles thematiques :
- Salle 1 - Angoisse interieure
- Salle 2 - Reve et visions
- Salle 3 - Rupture et scandale

Dans chaque salle, il observe des oeuvres, lit des informations sur les artistes, comprend ce qui relie les oeuvres entre elles, puis valide une console d'analyse.

Le jeu ne repose pas sur des calculs. Il repose sur la comprehension, l'observation et l'interpretation.

Les 3 mots-clefs finaux sont :
- `INTERIEUR`
- `IMAGINAIRE`
- `RUPTURE`

## Installation simple depuis GitHub

Si tu veux simplement jouer au jeu sans utiliser VS Code ni lancer de serveur local, il faut passer par la page des releases GitHub.

Etapes :
1. Ouvre la page GitHub du projet.
2. Clique sur `Releases`.
3. Ouvre la derniere release disponible.
4. Telecharge le fichier qui correspond a ton ordinateur.
5. Ne telecharge pas `Source code (zip)` ou `Source code (tar.gz)` si tu veux seulement jouer.

### Quel fichier choisir ?

Pour Windows :
- telecharger le fichier `.exe`

Pour Mac Intel :
- telecharger le fichier `.dmg` contenant `mac-x64`

Pour Mac Apple Silicon (M1, M2, M3, etc.) :
- telecharger le fichier `.dmg` contenant `mac-arm64`

## Installation sur Windows

1. Telecharge le fichier `.exe` depuis la release.
2. Double-clique sur le fichier telecharge.
3. Suis les etapes de l'installateur.
4. Lance le jeu depuis le bureau ou le menu demarrer.

## Installation sur macOS

1. Telecharge le fichier `.dmg` adapte a ton Mac.
2. Ouvre le fichier `.dmg`.
3. Glisse l'application dans le dossier `Applications`.
4. Ouvre l'application depuis `Applications`.

Si macOS bloque l'ouverture car l'application vient d'un developpeur non identifie :
1. ferme le message d'erreur
2. va dans `Reglages Systeme`
3. ouvre `Confidentialite et securite`
4. clique sur `Ouvrir quand meme`

Autre methode :
- clic droit sur l'application
- puis `Ouvrir`

## Lancement local de la version web

Si tu veux lancer le projet comme un site web local :

Option simple :
- ouvrir `index.html` dans un navigateur moderne

Option recommandee :
```bash
python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000)

## Controles

Clavier :
- `ZQSD` / `WASD` / fleches : se deplacer
- `Maj` : courir
- `E` : interagir
- `E` / `Echap` / `x` : fermer une fenetre
- `J` : ouvrir ou fermer le carnet
- `U` : activer ou desactiver le mode UV
- `M` : activer ou couper le son

Mobile :
- boutons tactiles en bas de l'ecran

## Objectif pedagogique

Le jeu cherche a montrer que des artistes souvent juges "fous" par leur epoque ont surtout propose de nouvelles manieres de voir, de ressentir et de representer le monde.

Le joueur doit comprendre que :
- la folie percue est souvent un regard social,
- une oeuvre troublante n'est pas vide de sens,
- l'art peut exprimer l'angoisse, le reve, la rupture et la critique sociale.

## Structure du projet

- `index.html` : structure de l'interface
- `styles.css` : styles, HUD et overlays
- `main.js` : logique du jeu, collisions, progression, rendu et audio
- `assets/artworks/` : reproductions locales des oeuvres
- `electron/main.js` : fenetre desktop Electron
- `.github/workflows/release-desktop.yml` : build automatique Windows et macOS
- `guide-professeur.txt` : scenario, solution et lecture pedagogique

## Faire une release desktop

Le projet est prepare pour produire :
- un installateur Windows
- une application macOS

Les releases sont automatisees via GitHub Actions.

### Methode recommandee

1. Modifier le projet
2. Mettre a jour la version dans `package.json`
3. Creer un tag Git :
```bash
git tag v1.0.0
git push origin main --tags
```
4. GitHub Actions lance automatiquement les builds Windows et macOS
5. Les fichiers sont ajoutes a la release GitHub

### Methode manuelle

Il est aussi possible de lancer le workflow depuis l'onglet `Actions` sur GitHub avec `workflow_dispatch`.

## Lancement et build pour le developpement

Prerequis :
- Node.js 20 ou plus recent
- npm

Installation des dependances :
```bash
npm install
```

Lancer l'application desktop en local :
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

Construire toutes les cibles configurees :
```bash
npm run dist
```

## Ressources artistiques

Le projet utilise des references artistiques issues de Wikipedia et Wikimedia Commons.
Les visuels necessaires au jeu sont stockes localement dans `assets/artworks/` pour eviter de dependre du reseau au moment de jouer.

## Remarque importante

Le but du projet n'est pas seulement de "finir un escape game".
Le but est de faire emerger une lecture de l'art, des artistes et du regard que la societe porte sur ce qui la derange ou la depasse.
