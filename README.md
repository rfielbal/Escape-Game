# Escape Game - Le Secret du Conservateur

Projet BTS SIO: escape game web en vue top-down pixel, centre sur la question
`"folie percue par la societe"` dans l'histoire de l'art.

## Concept pedagogique
Le joueur ne cherche plus des chiffres.
Il doit:
- observer des oeuvres,
- lire leur contexte social,
- comprendre les points communs entre artistes,
- extraire 3 mots-clefs de comprehension.

La sortie s'ouvre avec ces 3 mots dans le bon ordre.

## Salles thematiques
1. **Angoisse interieure**
   - Van Gogh, Munch, Goya
   - mot-clef: `INTERIEUR`
2. **Reve et visions**
   - Bosch, Dali, Magritte
   - mot-clef: `IMAGINAIRE`
3. **Rupture et scandale**
   - Picasso, Kandinsky, Basquiat
   - mot-clef: `RUPTURE`

## Lancement
Aucun build requis.

Option simple:
- ouvrir `index.html` dans un navigateur moderne.

Option recommandee:
```bash
python3 -m http.server 8000
```
Puis ouvrir [http://localhost:8000](http://localhost:8000)

## Controles
Desktop:
- `ZQSD` / `WASD` / fleches: deplacement
- `E`: interagir
- `J`: carnet
- `U`: mode UV
- `M`: son ON/OFF

Mobile:
- boutons tactiles affiches en bas

## Fichiers principaux
- `index.html`: interface du jeu
- `styles.css`: style pixel, overlays, barre d'actions
- `main.js`: moteur top-down, progression, enigmes, audio

## Ressources externes
Les fiches d'oeuvres utilisent des liens externes (Wikipedia / Wikimedia Commons).
Un fallback visuel local est prevu si une image distante ne charge pas.

## Note juridique
Pour rester propre meme en contexte academique:
- conserver les credits des sources,
- privilegier les reproductions libres ou domaine public,
- verifier les conditions de reutilisation de chaque source.
