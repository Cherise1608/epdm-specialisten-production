# EPDM Website -- Style Reference

## Skrifttyper (Google Fonts)

| Skrifttype | Bruges til | Vægte indlæst |
|---|---|---|
| **Inter** | Brødtekst (body) | 300, 400, 500, 600, 700 |
| **Playfair Display** | Overskrifter / dekorative elementer | 400, 600, 700 (+ italic 400) |
| **Bodoni Moda** | Tal / `.number-font` klassen | 400, 600 |

## Font-weights brugt i CSS

| Værdi | Navn | Tailwind-klasse |
|---|---|---|
| 200 | Extra Light | `font-extralight` |
| 300 | Light | `font-light` |
| 400 | Normal | `font-normal` |
| 500 | Medium | `font-medium` |
| 600 | Semi Bold | `font-semibold` |
| 700 | Bold | `font-bold` |
| 800 | Extra Bold | `font-extrabold` |
| 900 | Black | `font-black` |

## Primære farver (hex-koder)

| Farve | Hex | Bruges til |
|---|---|---|
| Næsten sort (tekst) | `#1a1a1a` | Body tekst, primær tekstfarve |
| Mørk body tekst | `#1a202c` | Body color (sat i HTML inline) |
| Dyb sort overlay | `#242424` | Baggrunde |
| Sort 90% opacity | `#000000e6` | Mørke overlays |
| Varm beige | `#fbf0df` | Lys baggrund |
| Guld/sand | `#f3d5a3` | Accent-baggrund |
| Hvid | `#fff` | Tekst på mørke baggrunde |
| Hvid 60% opacity | `#fff9` | Semi-transparent hvid |

## Accent/brand-farver (Tailwind color-mix)

| Farve | Kontekst |
|---|---|
| **Pink/Magenta** (`--color-pink-500`, `#f6339a`) | Primær accent, hover-effekter, shadows |
| **Slate mørk** (`--color-slate-900`) | Mørke baggrunde, overlays |
| **Blue** (`--color-blue-600` / `--color-blue-700`) | Links, CTA-knapper, shadows |
| **Green** (`--color-green-50` / `--color-green-100`) | Status/success-indikatorer |
| **Neutral/Gray** (`--color-neutral-800`/`900`) | Sekundære baggrunde |

## Font-størrelser (Tailwind skala)

| Klasse | Brug |
|---|---|
| `text-xs` | Småtekst, labels |
| `text-sm` | Sekundær tekst |
| `text-base` | Standard brødtekst |
| `text-lg` | Fremhævet brødtekst |
| `text-xl` | Små overskrifter |
| `text-2xl` | Mellemstore overskrifter |
| `text-3xl` | Store overskrifter |
| `text-4xl` | Sektionsoverskrifter |
| `text-5xl` | Hero-tekst |
| `text-6xl` | Stor display-tekst |
| `text-7xl` | Ekstra stor display |
| `text-8xl` | Maksimal display |
| `9px` / `10px` | Special-størrelser (fine print) |
