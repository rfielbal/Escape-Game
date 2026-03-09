# Le Secret du Conservateur

Escape game web realise dans le cadre d'un BTS SIO.

Le projet prend la forme d'un jeu en vue top-down pixel dans lequel le joueur explore un musee ferme de nuit. Le fil rouge du jeu est la notion de "folie percue par la societe" appliquee a plusieurs artistes et courants artistiques.

## Concept

Le joueur ne doit pas seulement trouver un code.
Il doit :
- observer des oeuvres,
- lire des informations sur les artistes,
- comprendre ce qui relie les oeuvres d'une meme salle,
- repondre a une console d'analyse,
- recuperer 3 mots-clefs,
- assembler ces mots pour ouvrir la sortie.

Le but est de montrer que des artistes parfois juges "fous" par leur epoque ont surtout propose de nouvelles manieres de voir, de ressentir et de representer le monde.

## Scenario

Lors d'une visite nocturne, le conservateur du musee enferme le joueur et lui lance un defi :
"Tu ne sortiras pas tant que tu n'auras pas compris l'art que les autres ont refuse de comprendre."

Le joueur traverse 3 salles thematiques. Chaque salle regroupe des artistes autour d'une meme idee, puis une console demande d'identifier ce que leurs oeuvres disent vraiment.

## Salles du jeu

1. Salle 1 - Angoisse interieure
- Artistes : Vincent van Gogh, Edvard Munch, Francisco de Goya
- Mot-clef obtenu : `INTERIEUR`

2. Salle 2 - Reve et visions
- Artistes : Jerome Bosch, Salvador Dali, Rene Magritte
- Mot-clef obtenu : `IMAGINAIRE`

3. Salle 3 - Rupture et scandale
- Artistes : Pablo Picasso, Vassily Kandinsky, Jean-Michel Basquiat
- Mot-clef obtenu : `RUPTURE`

Code final :
- ordre des mots : `INTERIEUR IMAGINAIRE RUPTURE`

## Objectif pedagogique

Le jeu cherche a faire comprendre que :
- la "folie" attribuee a certains artistes vient souvent du regard social pose sur ce qui derange,
- une oeuvre peut exprimer l'angoisse, le reve ou la rupture sans etre absurde,
- les artistes etudies ne sont pas "fous" au sens simpliste du terme ; ils proposent une autre lecture du reel, de l'emotion et de la societe.

## Gameplay

- Exploration libre des salles
- Interaction avec les panneaux, oeuvres et consoles
- Carnet de progression
- Mode UV pour lire certains indices caches
- Code final base sur 3 mots-clefs

## Controles

Clavier :
- `ZQSD` / `WASD` / fleches : se deplacer
- `Maj` : courir
- `E` : interagir
- `E` / `Echap` / `x` : fermer une fenetre d'information
- `J` : ouvrir ou fermer le carnet
- `U` : activer ou desactiver le mode UV
- `M` : activer ou couper le son

Mobile :
- boutons tactiles en bas de l'ecran

## Lancement

Aucun build n'est necessaire.

Option simple :
- ouvrir `index.html` dans un navigateur moderne

Option recommandee :
```bash
python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000)

## Structure du projet

- `index.html` : structure de l'interface
- `styles.css` : styles, HUD, overlays et rendu UI
- `main.js` : logique du jeu, progression, collisions, rendu canvas, audio
- `assets/artworks/` : reproductions locales des oeuvres et visuels utilises dans le jeu

## Ressources artistiques

Le projet utilise des references d'oeuvres issues de Wikipedia et Wikimedia Commons, avec liens sources affiches dans le jeu.

Pour garantir un affichage stable, les images necessaires au jeu sont stockees localement dans `assets/artworks/`.

## Etat actuel du projet

Le projet comprend actuellement :
- une vue top-down pixel jouable
- 3 salles thematiques
- des interactions avec les oeuvres
- des consoles d'analyse
- un carnet
- des effets sonores
- des collisions sur les murs et les objets des salles

## Remarque

Ce projet a une intention a la fois ludique et pedagogique. L'objectif n'est pas seulement de "reussir" l'escape game, mais de comprendre ce que l'on retient des artistes, de leurs oeuvres et du regard que la societe a porte sur eux.
