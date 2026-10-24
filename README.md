# WanderWise — Travel Recommendation Web Application

A responsive HTML/CSS/JavaScript project for the Coursera Travel Recommendation final assignment.

## Features
- Three working pages: Home (`index.html`), About Us (`about.html`), Contact Us (`contact.html`)
- Navigation bar on all pages, search field, Search and Clear buttons
- Search recommendations for **beach**, **temple**, **Japan**, **Indonesia**, **country**, and individual place names
- At least two image cards for beach, temple, and Japan/country searches
- Contact form with HTML required-field validation and a `mailto:` email draft (requires configuring destination email)
- Responsive layout, image alt text, URL query support and photo fallbacks

## Important setup: contact email

In `script.js`, set:

```js
const CONTACT_EMAIL = 'you@example.com';
```

to **an email address you choose to display publicly**. Because this is a purely static GitHub Pages site, the contact form prepares a message in the visitor's email application; it **does not send automatically or store data**. Do not commit personal secrets, passwords, or credentials.

## Quick local test

Open `index.html` in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 and search for `beach`, `temple`, and `Japan`.

## Publish on GitHub Pages

1. Create a new **public** GitHub repository called `travel-recommendation-app`.
2. Upload **the files inside this folder to the repository ROOT**, including `index.html`, `about.html`, `contact.html`, `style.css`, `script.js`, and the `assets/` directory. Don't upload just the ZIP.
3. Open **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Select **main** and **/(root)**, then **Save**.
5. Your site should become available at `https://YOUR-USERNAME.github.io/travel-recommendation-app/`.

Note: an existing repo with this name should be reused rather than overwritten blindly. GitHub Pages might take several minutes to publish. Use **Settings → Pages → Visit site** for the actual live URL.

## Recommended Coursera screenshots

1. GitHub repository showing the URL and source files.
2. Home hero/introduction, plus navigation with Home/About Us/Contact Us.
3. About page mission section and team roles.
4. Contact page form with required fields.
5. Search `beach` and screenshot both result image cards.
6. Search `temple` and screenshot both result image cards.
7. Search `Japan` and screenshot both result image cards.
8. Demonstrate Clear resetting results.
9. Browser displaying the *published* GitHub Pages URL.

**Submit two distinct URLs:** the actual public GitHub repository URL and actual live GitHub Pages URL, both beginning with `https://`.

## Images

The site uses publicly accessible Unsplash photo URLs as a visual enhancement. Local original SVG illustrations in `assets/` provide a working offline fallback when photo hosting is inaccessible. For photography attribution and license information see [Unsplash License](https://unsplash.com/license); local SVG illustrations were created for this project.
