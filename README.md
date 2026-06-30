# La Foulée Tullésaine 2026 — site officiel

Mini-site one-page de la course solidaire Octobre Rose de Sainte-Tulle (5e édition, **dimanche 11 octobre 2026**).
Réalisé et offert par **SOL·IA** dans le cadre du partenariat web officiel.

## Structure
- `index.html` — page unique (hero, sens/Octobre Rose, courses, parcours, ambiance, infos, partenaires, CTA, footer)
- `css/style.css` + `css/style.min.css` — design tokens, thème dark/rose/or
- `js/main.js` + `js/main.min.js` — nav, menu mobile, compte à rebours, count-up, reveal au scroll
- `assets/` — logo officiel, photo de départ, logos partenaires, logo SOL·IA, favicons, OG image
- `robots.txt`, `sitemap.xml`, `.htaccess`

## Charte
Direction « hybride sport premium » : base sombre cinématique (#140910), accent rose Octobre Rose (#F0589B), touche or SOL·IA (#E6C667). Typographies Bricolage Grotesque (titres) + Manrope (corps).

## Programme officiel 2026 (source : billetterie Miles Republic)
- Course 10 km — départ 09:00 — 15 €
- Randonnée 3 km (marche) — départ 10:45 — 8 €
- Course enfants 1 km — départ 11:15 — gratuit
- Course 2 km — départ 11:30 — gratuit
- Relais famille 2 km — départ 11:50 — 6 €

Inscription : tous les CTA pointent vers `https://www.sportips.fr/` (la billetterie sera sur Sportips). Le programme/tarifs ci-dessus vient du listing Miles Republic, mais l'inscription se fera sur Sportips.

Visuels intégrés : hero + galerie + CTA final = 3 vraies photos des éditions précédentes (`hero.jpg`, `start-2024.jpg`, `start-familles.jpg`). Parcours = vraie carte satellite du tracé 10 km avec points kilométriques (`parcours-map.jpg`).

## ⚠️ À mettre à jour avant mise en ligne
0. **Retirer le `noindex`** : le `<meta name="robots" content="noindex,nofollow">` dans `index.html` bloque l'indexation de la preview GitHub Pages. **À supprimer impérativement avant la prod** sur le domaine final, sinon le site ne sera jamais référencé.
1. **Lien Sportips exact** : remplacer `https://www.sportips.fr/` par l'URL directe de la billetterie 2026 (ex. `https://sportips.fr/inscription/TUL26`) une fois ouverte. Chercher `sportips.fr` dans `index.html`.
2. **Domaine** : `canonical`, OG, `sitemap.xml`, `robots.txt` utilisent le placeholder `https://www.fouleetullesaine.fr/`. Adapter au domaine réel.
3. **Photos** (optionnel) : 3 photos en place. En ajouter d'autres enrichirait la galerie (grille prévue pour s'étendre).

## Build
Après toute modif CSS/JS, re-minifier :
```python
import re
css=re.sub(r'/\*.*?\*/','',open('css/style.css').read(),flags=re.DOTALL)
css=re.sub(r'[ \t]+',' ',css); css=re.sub(r'\s*([{};:,>~])\s*',r'\1',css)
css=re.sub(r'\s*\{\s*','{',css); css=re.sub(r';\}','}',css); css=re.sub(r'\n+','',css).strip()
open('css/style.min.css','w').write(css)
```
Puis bump `?v=` dans `index.html`.

## Contacts organisateurs
- New Wave — Marie Pizzala · 06 13 80 03 11 · contact@newwave04.fr
- ADLV — Jean-Luc Bou · 06 69 50 72 47 · athletismedlvstet@gmail.com
- Bénéficiaire : association La Vista 04 Sud (Manosque)
