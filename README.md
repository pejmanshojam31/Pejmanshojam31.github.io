# pejmanshojam31.github.io

Personal academic site for Pejman Shojaee — mathematical biology and computational oncology.
Live at <https://pejmanshojam31.github.io>.

Plain static HTML with one shared stylesheet. **There is no build step**: edit a file,
commit, push, and GitHub Pages serves it.

## Structure

```
index.html              Home — bio, research focus, selected publications, contact
research.html           Research areas, current and past projects, methods
publications.html       Full publication list, grouped by year, each with a DOI link
cv.html                 CV — education, experience, skills, languages, talks
beyond-research.html    Astrophotography and hiking galleries
404.html                Not-found page (GitHub Pages serves this automatically)

assets/css/style.css    The entire stylesheet. Colours live in the :root block at the top.
assets/js/site.js       Theme toggle, mobile nav, gallery lightbox
assets/favicon.svg      Favicon
assets/img/             profile.jpg, og-card.jpg, hero-*.webp, gallery/, thumbs/

CV.pdf                  Downloadable CV, linked from the header buttons
sitemap.xml             Update this if you add or rename a page
robots.txt

Hobbies.html            ┐
astrophotography.html   ├ redirect stubs pointing at beyond-research.html, kept so old
trail-running.html      ┘ links and search results don't 404. Safe to delete after a year.
```

## Editing

**Text** — open the relevant `.html` file and edit the content inside `<main>`.

**Navigation, header or footer** — these blocks are repeated verbatim in every page
(the cost of having no build step). Change one, then copy the same block into the others.
The only per-page difference is which nav link carries `aria-current="page"`.

**Colours and spacing** — everything is a CSS custom property in the `:root` block at the
top of `assets/css/style.css`. Light and dark palettes are defined separately; change both.

**Adding a publication** — copy an existing `<li class="pub">` block in `publications.html`.
Wrap your own name in `<span class="me">` so it renders bold.

**Adding a photo** — put a wide version in `assets/img/gallery/` and a smaller one in
`assets/img/thumbs/`, then copy an existing `<li>` in `beyond-research.html`. Keep images
under ~200 KB; the originals are far too large to serve directly.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Use a server rather than opening the file directly,
so paths resolve the way they will in production.

## Notes

The original full-resolution photos and the old icon PNGs were removed from the working
tree when the site was rebuilt; they remain in git history and can be restored with
`git checkout <commit> -- <path>`.
