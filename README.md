# Escape Game - Le Secret du Conservateur

Projet BTS SIO: escape game web en style 3D pixel (raycasting), sur le theme du musee.

## Objectif
Tu es enferme dans un musee. Pour sortir, il faut:
- explorer 3 salles,
- analyser des oeuvres,
- resoudre 3 enigmes pour obtenir 3 fragments,
- assembler le code maitre et deverrouiller la porte principale.

Duree cible: environ 30 minutes.

## Lancement
Aucun build requis.

Option 1 (simple):
- ouvrir `index.html` dans un navigateur moderne.

Option 2 (recommandee):
- lancer un serveur statique local (exemple Python):
```bash
python3 -m http.server 8000
```
- ouvrir [http://localhost:8000](http://localhost:8000)

## Controles
Desktop:
- `ZQSD` / `WASD`: deplacement
- `Fleches` / souris: orientation
- `E`: interagir
- `U`: mode UV
- `J`: carnet
- `M`: son ON/OFF

Mobile:
- boutons tactiles affiches en bas d'ecran

## Structure des enigmes
- Salle I (Renaissance): logique chronologique sur les annees
- Salle II (Impressionnisme): ecart de dates + info artiste
- Salle III (Avant-gardes): lecture UV + classement chronologique
- Porte finale: code maitre = assemblage des 3 fragments

## Fichiers principaux
- `index.html`: structure UI
- `styles.css`: style pixel + overlays + mobile
- `main.js`: moteur raycasting, gameplay, enigmes, audio

## Ressources artistiques et sources
Les fiches d'oeuvres utilisent des references externes (Wikipedia / Wikimedia Commons) avec liens inclus dans le jeu.

Oeuvres integrees dans le gameplay:
- Les Epoux Arnolfini - Jan van Eyck (1434)
- La Cene - Leonard de Vinci (1495-1498)
- L'Ecole d'Athenes - Raphael (1511)
- Impression, soleil levant - Claude Monet (1872)
- Bal du moulin de la Galette - Pierre-Auguste Renoir (1876)
- L'Etoile - Edgar Degas (1878)
- Un dimanche apres-midi a l'Ile de la Grande Jatte - Georges Seurat (1884-1886)
- Le Cri - Edvard Munch (1893)
- Composition VIII - Vassily Kandinsky (1923)

## Notes juridiques
Pour un cadre scolaire, il est recommande de:
- privilegier des reproductions de domaine public / licences ouvertes,
- conserver les credits sources,
- verifier les conditions de reutilisation selon la juridiction et la source.

Le jeu prevoit un fallback visuel local si une image distante ne charge pas.
