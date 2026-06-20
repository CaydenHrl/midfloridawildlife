# Mid-Florida Wildlife Services — Website

Plain HTML/CSS/JS site for Mid-Florida Wildlife Services. No build step, no frameworks — just open `index.html` or serve the folder with any static server.

## Structure

```
index.html        Home — hero, services, testimonials, about, service area, Q&A
services.html     Full service detail pages (rats, bats, squirrels, opossums, raccoons)
about.html        About / team
gallery.html      Before & after photo gallery (locked placeholder slots)
contact.html      Contact form + direct contact info
css/style.css     All styles
js/main.js        Mobile nav, accordion behavior, animal info modal
images/           Real brand assets, animal stock photos, and locked placeholder slots
CNAME             GitHub Pages custom domain config
```

Note: there is no separate Q&A page anymore — the FAQ accordion now lives at the bottom of `index.html`, right above the footer.

## How the "locked image slots" work

Every image area on the site (service photos, gallery shots, the family photo, the logo) is wrapped in a fixed-size frame using the `.img-slot` or `.logo-slot` CSS classes. These frames have a locked aspect ratio and use `object-fit: cover` (or `contain` for logos), which means:

**To swap in a real photo, just replace the file at the same path/filename.** You don't need to resize, crop, or touch any HTML or CSS — whatever image you drop in will automatically fill the frame at the correct size. A portrait photo, a landscape photo, a huge photo, a tiny photo — all of them snap into the same locked shape.

Slots currently waiting on real photos:
- `images/family-pic.png` — family photo on the About section (home page) and About page
- `images/gallery-truck.png`, `gallery-before-attic.png`, `gallery-after-attic.png`, `gallery-technician.png`, `gallery-before-vent.png`, `gallery-after-vent.png`, `gallery-exclusion-work.png`, `gallery-team.png` — the 8 gallery slots

Each currently shows a generated placeholder graphic with a label like "Drop in: family-pic.png" so it's obvious which file to replace and exactly where it will land.

## Image credits / asset notes

These are the business's real brand assets, used directly:

- `logo-full.png` — squirrel mascot + wordmark lockup (header, footer)
- `squirrel-mascot.png` — squirrel mascot alone, transparent background (homepage hero)
- `eviction-notice.png` — the "Eviction Notice" cartoon graphic (homepage hero)
- `wordmark.png` — text-only logo, available if needed elsewhere
- `no-animals-row.png` — the rat/squirrel/raccoon/opossum/bat/dinosaur "not welcome" icon strip, centered under the mascot in the hero and used as a divider on the services page
- `rat-photo.png`, `bat-photo.png`, `squirrel-photo.png`, `opossum-photo.png`, `raccoon-photo.png` — real stock photography matched to each animal

If you ever get higher-resolution or re-exported versions of the logo/mascot/eviction-notice/wordmark, just drop them in with the same filenames — same locked-slot behavior applies.

## The animal info modal

On the **Services page**, clicking anywhere on a service card (rats, bats, squirrels, opossums, raccoons) opens a full-screen popup with the complete writeup for that animal — the original, detailed copy (including things like the bat "cuddle ball" social-bonding note), full risk list, any legal note, and quick Call/Free Inspection buttons. The popup is sized to fit the screen without internal scrolling.

The **Home page** cards are simpler: clicking a photo or "Learn more →" just navigates to that animal's section on the Services page, same as a normal link.

All modal wording lives in a small data object in `js/main.js` (search for `animalData`) — editing the text there is all that's needed, no HTML changes required.

## Before launch — to-do list

1. **Real photos for About and Gallery.** See the locked-slot list above — swap in real files with the same names whenever your parents send photos.
2. **Contact form.** `contact.html` currently posts to a placeholder Formspree URL. Create a free Formspree account, make a form, and replace `REPLACE_WITH_REAL_FORMSPREE_ID` in the form's `action` attribute with the real endpoint.
3. **Q&A content.** The FAQ accordion at the bottom of `index.html` is drafted — have the business owners review and adjust before launch.
4. **Service area details.** Confirm the listed counties (Marion, Sumter, Lake, Citrus) are accurate.
5. **Scrolling ticker text.** The yellow ticker at the very top of every page has a few drafted lines — edit the `.ticker-item` text (same markup repeated near the top of each HTML file) if you want different wording. Update it in all five files to keep them in sync.

## Deploying on GitHub Pages with the custom domain

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**, and set the source to deploy from the `main` branch (root).
3. The `CNAME` file in this repo already contains `midfloridawildlife.com` — GitHub Pages will pick this up automatically.
4. At the domain registrar (wherever midfloridawildlife.com is managed — currently pointed at Squarespace), update DNS once the new site is approved:
   - Add **A records** for the apex domain pointing to GitHub Pages' IP addresses (current list: see GitHub's "Managing a custom domain" docs, as these can change).
   - Add a **CNAME record** for `www` pointing to `<yourusername>.github.io`.
5. Don't make DNS changes until the design is approved — the current live site stays untouched until you're ready to switch over.
