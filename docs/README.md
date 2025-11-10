# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Quick Start

```bash
npm install
npm start
```

The dev server opens at http://localhost:3000 and hot-reloads as you edit content.

## Keep The Docs Updated 

1. **Add or edit a README**
   - npm package? Update any folder under `NPM_Package/`.
   - Composer package? Edit the README inside `COMPOSER_Package/`.
   - If it’s a brand-new package docs page, just copy/paste the README file into the right folder and save.

2. **Sync the docs with one command**
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection/docs
   npm run sync-readmes
   ```
   This copies every README into Docusaurus (`docs/docs/packages/...`).

3. **Preview (optional)**
   ```bash
   npm start
   ```
   Open http://localhost:3000 to check the new page. Press `Ctrl+C` to stop.

4. **Commit the changes**
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection
   git add .
   git commit -m "Update package docs"
   git push origin main
   ```

5. **Deploy the live site**
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection/docs
   npm run build

   cd /Users/nethmih/Desktop/hi/test/package-collection
   git worktree add ../package-collection-gh-pages gh-pages
   cd /Users/nethmih/Desktop/hi/test/package-collection-gh-pages
   find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
   rsync -av --exclude ".git" ../package-collection/docs/build/ .
   git add .
   git commit -m "Deploy updated site"
   git push origin gh-pages
   cd /Users/nethmih/Desktop/hi/test/package-collection
   git worktree remove ../package-collection-gh-pages
   ```

When GitHub Pages finishes publishing, the site updates at `https://ceygenic-web.github.io/CEYCDS-PK-package-collection/`.
