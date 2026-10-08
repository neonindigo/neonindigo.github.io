# neonindigo.github.io

Source for [neonindigo.com](https://neonindigo.com) — a static site hosted on GitHub Pages.

## Pages

| Path | Purpose |
|------|---------|
| `/` | NeonIndigo studio homepage and app catalogue |
| `/vouchervault` | VoucherVault product and preorder page |
| `/privacy` | Privacy policy (GDPR, UK jurisdiction) |
| `/terms` | Terms & conditions |
| `/support` | App support |

## Structure

```
index.html          # Studio homepage
assets/css/
  site.css          # Marketing and product-page styles
  shared.css        # Shared styles for legal/support pages
assets/js/
  site.js           # Release state, reveal motion, and Kit form configuration
assets/images/      # Web-optimised app icons and screenshots
vouchervault/
  index.html        # VoucherVault product page
privacy/index.html
terms/index.html
support/index.html
CNAME               # Custom domain: neonindigo.com
```

## Deployment

Pushed to `master` → automatically deployed via GitHub Pages.

## Kit email forms

The Studio Updates panel is connected to Kit form `10019101`, and the
VoucherVault Updates panel is connected to Kit form `10019146`. Their public
form action URLs live in `kitFormActions` in `assets/js/site.js`. Keep double
opt-in enabled in Kit for both forms.
