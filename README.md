# StackPodium

Static site for https://stackpodium.com, served by GitHub Pages from the root of `main`.

The HTML in the root is generated. Do not edit it by hand.

- `src/data.html` holds the rankings, prices and all translated text (inside its `<script>` block).
- `src/pages.js` holds the sponsor and privacy pages. Sponsorship mail is the `SPONSOR_EMAIL` constant and launch rates are `SPONSOR_PRICES` in that file. Change the constant and rebuild to move sponsor mail onto a stackpodium.com address.
- `src/build.js` generates every page, the sitemap, `robots.txt` and `llms.txt`.

To rebuild into a clean folder and copy the result to the repository root:

    node src/build.js src/data.html /tmp/site stackpodium.com && cp -r /tmp/site/. .

The newsletter form does not store addresses. It sends people to the URL in `src/newsletter.js` (beehiiv's hosted subscribe page). That file is the only place to change the destination, including a later swap to a beehiiv embed form.
