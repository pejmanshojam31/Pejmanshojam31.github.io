# pejmanshojam31.github.io

Personal site for Pejman Shojaee — systems medicine, multi-omics, AI and mathematical biology.
Live at <https://pejmanshojam31.github.io>.

Plain static HTML with one shared stylesheet. **There is no build step**: edit a file,
commit, push, and GitHub Pages serves it.

## Structure

```
index.html              Home — positioning, about, research threads, AI teaser,
                        solutions teaser, selected publications, contact
research.html           Research areas, current and past projects, methods
ai.html                 AI & machine learning — applied ML in biomedicine,
                        research software & AI engineering, working principles
solutions.html          Solutions — the problems solved, split into two tracks:
                        health-tech teams, and research groups & clinicians
publications.html       Full publication list, grouped by year, each with a DOI link
cv.html                 CV — education, experience, skills, languages, talks
beyond-research.html    Astrophotography and hiking galleries
404.html                Not-found page (GitHub Pages serves this automatically)

assets/css/style.css    The entire stylesheet. Design tokens live in :root at the top.
assets/js/site.js       Theme toggle, mobile nav, gallery lightbox
assets/favicon.svg      Favicon
assets/img/             profile.jpg, og-card.jpg, hero-*.webp, gallery/, thumbs/

sitemap.xml             Update this if you add or rename a page
robots.txt

Hobbies.html            ┐
astrophotography.html   ├ redirect stubs pointing at beyond-research.html, kept so old
trail-running.html      ┘ links and search results don't 404. Safe to delete after a year.
```

## Design system

Editorial / scientific: a serif display face over a neutral sans, mono for labels,
warm paper and ink, and a single vermillion accent used sparingly.

- **Newsreader** — all headings, `.lede`, `.pub__title`, `.tl__what`, big numerals
- **Inter** — body copy
- **IBM Plex Mono** — `.label`, `.nav a`, `.btn`, `.tag`, `.chip` context, `.fact__l`

Colours are CSS custom properties in the `:root` block at the top of `style.css`.
There are three palettes to keep in sync: bare `:root` (light), the
`prefers-color-scheme: dark` block, and `:root[data-theme="dark"]` for the toggle.
Change a colour in all three.

Layout components worth knowing:

| Class | What it does |
| --- | --- |
| `.split` | Two columns — a sticky mono label in a left rail, content on the right |
| `.label` | Mono uppercase kicker with a small accent square |
| `.index` | The numbered editorial list (`01`, `02`, …) used on Home, Research and AI |
| `.solution` + `.spec` | Solutions page: problem on the left, Approach / You get / Typical on the right |
| `.factbar` | Thin band of large numerals under a hero |
| `.band` | Full-width dark contact block that closes most pages |
| `.card`, `.timeline`, `.pub`, `.gallery` | Cards, CV timeline, publications, photo grid |

## Editing

**Text** — open the relevant `.html` file and edit the content inside `<main>`.

**Navigation, header or footer** — these blocks are repeated verbatim in every page
(the cost of having no build step). Change one, then copy the same block into the others.
The only per-page difference is which nav link carries `aria-current="page"`.

**Adding a publication** — copy an existing `<li class="pub">` block in `publications.html`.
Wrap your own name in `<span class="me">` so it renders bold.

**Adding a solution** — copy an `<article class="solution">` block in `solutions.html`
and keep the `Problem NN` / `Question NN` numbering sequential.

**Adding a photo** — put a wide version in `assets/img/gallery/` and a smaller one in
`assets/img/thumbs/`, then copy an existing `<li>` in `beyond-research.html`. Keep images
under ~200 KB; the originals are far too large to serve directly.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Use a server rather than opening the file directly,
so paths resolve the way they will in production.

## Visitor counter

The site uses **GoatCounter**, a cookieless counter. Nothing is shown on the page;
the numbers are visible only to you, at <https://pejpej.goatcounter.com> behind your
login. Every page in both languages carries this in its `<head>`:

```html
<script data-goatcounter="https://pejpej.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

It is emitted by the build script from `GOATCOUNTER_CODE`; blank that value and the
script disappears from every page.

**Excluding your own visits.** Open this link once in each browser and on each
device you use:

<https://pejmanshojam31.github.io/?skipgc>

A short confirmation appears and that browser stops being counted. To undo it and
be counted again, open <https://pejmanshojam31.github.io/?skipgc=off>.

The flag is stored in `localStorage` under the site's origin, so it has to be set on
the live site — setting it on `localhost` does not carry over. It is per browser and
per device, and clearing site data resets it. Private/incognito windows cannot store
it, and the confirmation says so.

The flag is applied by the inline script in each page's `<head>`, which runs before
the counter script, so even the visit that sets it is not counted. Equivalent to
running `localStorage.setItem('skipgc', 't')` in the console, but usable on a phone.

GoatCounter sets no cookies and stores no personal data, so under GDPR it needs no
consent banner — which matters for a site run from Germany. Google Analytics was
deliberately not used: it sets cookies and its EU use is legally contested.

The three old redirect stubs (`Hobbies.html`, `astrophotography.html`,
`trail-running.html`) carry no counter on purpose — they bounce immediately to
`beyond-research.html`, which does count.

## The CV

There is **no CV PDF on the site**. `cv.html` (and `de/cv.html`) is the CV, and the
CV page has a *Print / save as PDF* button that uses the browser's own print dialog;
the print rules at the bottom of `style.css` strip the header, footer, buttons and
contact band so the printed output is clean.

This is deliberate. A CV PDF carries a personal-data block — home address, phone —
that should not sit on a public, indexed page. Keeping the CV as HTML means there is
no file to leak and nothing to keep in sync.

## Notes

The original full-resolution photos and the old icon PNGs were removed from the working
tree when the site was rebuilt; they remain in git history and can be restored with
`git checkout <commit> -- <path>`.
