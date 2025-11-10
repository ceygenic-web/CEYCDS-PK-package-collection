# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Quick Start

```bash
npm install
npm start
```

The dev server opens at http://localhost:3000 and hot-reloads as you edit content.

## Add Or Update A Package README (Beginner Friendly)

1. **Open the source README you want to change**  
   - npm packages live in folders like `Alert_Box/README.md` or `NPM_Package/<package>/README.md`.  
   - Composer packages live under `COMPOSER_Package/.../<package>/README.md`.  
   Copy/paste your new content into the file and save.

2. **Regenerate the docs from those READMEs**  
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection/docs
   npm run sync-readmes
   ```  
   This copies the README into the Docusaurus docs (`docs/docs/packages/...`) with the correct frontmatter.

3. **Preview the site (optional but recommended)**  
   ```bash
   npm start
   ```  
   Browse to the page you changed and confirm everything looks right. Stop the server with `Ctrl+C`.

4. **Build production assets (optional)**  
   ```bash
   npm run build
   ```

5. **Commit your changes**  
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection
   git status
   git add <edited README> docs/docs/packages/...
   git commit -m "Update README for ..."
   git push origin main
   ```

6. **Deploy to GitHub Pages**  
   ```bash
   cd /Users/nethmih/Desktop/hi/test/package-collection/docs
   npm run build    # skip if already run
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

After GitHub Pages finishes publishing, your changes are live at `https://ceygenic-web.github.io/package-collection/`.
