# Table Thérapeutique — page de réservation

Page one-page Next.js pour réserver le combo promotionnel (Sandwich + Yaourt + Mignardises, 2 000 FCFA) du samedi 12 septembre 2026 à Fidjrossè, Cotonou. Le formulaire ne stocke rien : il assemble une réservation transmise par WhatsApp.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

`npm run build` produit le build de production (aucune erreur ni warning TypeScript).

## Remplacer la photo du combo

Aucune photo montrant le combo complet (sandwich + yaourt + mignardises ensemble) n'était disponible dans `assets-source/` au moment de la génération : `public/combo-hero.webp` est donc un aplat de couleur du thème avec le nom du produit, en attendant la vraie photo.

Pour la remplacer :

1. Dépose la ou les nouvelles photos dans `assets-source/`.
2. Ouvre `scripts/prepare-images.mjs` et mets à jour l'objet `SOURCES` avec les noms de fichiers à utiliser pour `hero`, `sandwich`, `yaourt`, `mignardises` et `og`.
3. Relance :
   ```bash
   npm run prepare-images
   ```
   Le script régénère les fichiers dans `public/` (recadrage automatique centré sur le sujet, format WebP, ≤ 250 Ko pour le hero et ≤ 100 Ko pour les cartes) et met à jour `lib/image-manifest.ts` (dimensions, texte alternatif, `blurDataURL`).

## Changer le prix, la date ou le numéro WhatsApp

Tout est centralisé dans [`lib/offer.ts`](lib/offer.ts) :

- `PRIX` — prix du combo.
- `PRIX_HABITUEL` — laisser `null` tant qu'aucun prix barré n'est communiqué ; renseigner un nombre (ex. `2500`) pour afficher automatiquement un prix barré à côté du prix promo dans le bandeau.
- `DATE_EVENEMENT_ISO` / `DATE_EVENEMENT_LABEL` — date de l'événement (le compte à rebours et le message WhatsApp en dépendent).
- `LIEU` — lieu affiché partout sur la page.
- `WHATSAPP_NUMERO_E164` / `WHATSAPP_NUMERO_AFFICHAGE` — numéro WhatsApp du commerce.

## Activer le webhook de commande (optionnel)

Sans base de données, chaque réservation valide construit une URL WhatsApp pré-remplie. Si tu veux en garder une trace (ex. Google Sheets via Zapier/Make), définis la variable d'environnement `ORDER_WEBHOOK_URL` (voir `.env.example`) : la Server Action ([`app/actions.ts`](app/actions.ts)) enverra alors un `POST` JSON `{ nom, telephone, quantite, total, horodatage }` vers cette URL. L'appel est protégé par un `try/catch` : si le webhook échoue ou n'est pas défini, la réservation aboutit quand même pour le visiteur.

## Presets de couleur

Trois ambiances sont définies dans [`lib/theme.ts`](lib/theme.ts) : `comptoir-frais` (actif), `braise-du-soir`, `affiche-marche`. Pour changer, modifie la constante `ACTIVE_PRESET`.

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le projet sur [vercel.com/new](https://vercel.com/new) (framework détecté automatiquement : Next.js).
3. Définir les variables d'environnement du projet si besoin :
   - `NEXT_PUBLIC_SITE_URL` — URL publique du site (utilisée pour les métadonnées Open Graph et le JSON-LD).
   - `ORDER_WEBHOOK_URL` — optionnel, voir ci-dessus.
4. Déployer.

## Stack

Next.js (App Router) · TypeScript · React · Tailwind CSS · `motion` · `lucide-react` · `zod` · `clsx` + `tailwind-merge`. Les composants d'animation (`TextEffect`, `AnimatedNumber`, `InView`) proviennent de [motion-primitives](https://github.com/ibelick/motion-primitives) et sont copiés (pas installés en dépendance) dans `components/motion-primitives/`.
