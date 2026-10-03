# MUSSA static site

Always-on informational site for the **Makerere University School of Statistics Association (MUSSA)** — School of Statistics and Planning, Makerere University.

Use this site between elections to explain who MUSSA is, how students subscribe, and how the Online Voting System works when polls open.

## Hosts

| Host | Serves |
|------|--------|
| [https://mussaelections.com](https://mussaelections.com) | This static site |
| [https://vote.mussaelections.com](https://vote.mussaelections.com) | MUSSA Online Voting System (OVS) |

Booth CTAs on this site point to `https://vote.mussaelections.com/auth/voter-login/`.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — brand, about MUSSA, election teaser, membership nudge |
| `elections.html` | Voter guide aligned with mussa-ovs |
| `join.html` | Subscribe & support via class representatives |

## Local preview

Open any HTML file in a browser, or from this folder:

```bash
# Python
python -m http.server 8080

# Node
npx --yes serve -l 8080
```

Then visit `http://localhost:8080`.

## Links config

Edit the `SITE` object at the top of [`js/main.js`](js/main.js):

```js
const SITE = {
  votingBoothUrl: "https://vote.mussaelections.com/auth/voter-login/",
  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
    whatsapp: "#",
    youtube: "#",
  },
};
```

`votingBoothUrl` is already set for production. Social URLs remain placeholders until you provide the live profiles. Links marked `data-voting-booth` and `data-social="…"` pick up these values automatically.

## Assets

- Logo: `assets/images/mussa_logo.png` (from mussa-ovs)
- Social icons: `assets/icons/*.svg`
- Styles: `css/styles.css`
- Behaviour: `js/main.js` (nav, scroll reveal, link wiring)

No build step required.
