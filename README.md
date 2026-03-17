# Portfolio — Matteo Campemenoso · BTS SIO SLAM 2026

Portfolio professionnel réalisé dans le cadre du **BTS SIO option SLAM** au lycée Paul Claudel, Laon.

---

## Voir le site en ligne

> Lien GitHub Pages : `https://<ton-pseudo-github>.github.io/portfolio`

---

## Structure du projet

```
portfolio/
├── index.html        ← page principale (tout le contenu)
├── style.css         ← mise en page et apparence
├── main.js           ← tous les comportements interactifs
├── Images/           ← captures d'écran des projets
│   ├── getsmegot v1.png … v5.png
│   ├── velolaon.png
│   └── …
└── docs/             ← PDF téléchargeables (cahiers des charges)
```

---

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| HTML5 | Structure et contenu |
| CSS3 | Mise en page, animations, responsive |
| JavaScript (Vanilla) | Interactivité (sans framework) |

Aucune dépendance externe — tout fonctionne en statique.

---

## Fonctionnalités du site

### Carrousel de projets
Chaque carte projet contient un diaporama avec navigation ← →, points cliquables, défilement automatique (4,5 s) et swipe tactile sur mobile.

### Modales de détail
Un clic sur "Détail du projet" ouvre une fenêtre avec captures d'écran, stack technique, tableau des fonctionnalités et localisation sur carte. Fermeture via ✕, clic en dehors ou touche Échap.

### Lightbox
Cliquer sur une image l'affiche en plein écran avec navigation au clavier (← →, Échap).

### Filtre projets
Trier les projets par catégorie (Tout / Web / Application) en un clic.

### Texte animé (Typewriter)
Le titre de la page simule une machine à écrire en défilant plusieurs textes.

### Navigation active au scroll
Le lien de navigation correspondant à la section visible est automatiquement mis en surbrillance.

---

## Projets présentés

| # | Projet | Stack | Contexte |
|---|---|---|---|
| 01 | **GestMeGot** | PHP · MySQL · MVC | Projet solo en classe |
| 02 | **VéloLaon** | PHP · MySQL · Leaflet.js · AJAX | Projet d'équipe |
| 03 | **Le Monde est Vache** | HTML · CSS · JS · PHP · MySQL | Projet d'équipe |
| 04 | **ChatBot Immo** | JavaScript · EmailJS | Stage 1ère année |
| 05 | **Trace moi si tu peux** | C# · WinForms · JSON | Stage 2ème année |

---

## Mettre en ligne (GitHub Pages)

```bash
# 1. Initialiser le dépôt git (une seule fois)
git init
git add .
git commit -m "Premier commit — portfolio BTS SIO"

# 2. Lier à GitHub
git remote add origin https://github.com/<ton-pseudo>/<nom-du-repo>.git
git branch -M main
git push -u origin main

# 3. Activer GitHub Pages
# → Sur GitHub : Settings > Pages > Source : "Deploy from branch" > main > / (root)
# Le site est accessible à : https://<ton-pseudo>.github.io/<nom-du-repo>
```

---

## Auteur

**Matteo Campemenoso** — BTS SIO SLAM, Lycée Paul Claudel, Laon — Session 2026
