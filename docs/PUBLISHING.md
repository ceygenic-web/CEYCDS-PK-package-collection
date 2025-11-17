# Publishing Documentation Guide

This guide explains how to publish the Docusaurus documentation site to GitHub Pages.

## Prerequisites

1. **Node.js** >= 20.0 installed
2. **Git** configured with access to the repository
3. **GitHub repository** set up at `ceygenic-web/CEYCDS-PK-package-collection`

## Quick Publish (Automated - Recommended)

The easiest way to publish is using Docusaurus's built-in deploy command:

```bash
# Navigate to the docs directory
cd docs

# Install dependencies (if not already installed)
npm install

# Build and deploy to GitHub Pages
npm run deploy
```

This command will:
1. Build the static site
2. Create/update the `gh-pages` branch
3. Push the built files to GitHub
4. GitHub Pages will automatically publish the site

**Your site will be live at:** `https://ceygenic-web.github.io/CEYCDS-PK-package-collection/`

## Manual Publishing Steps

If you prefer more control or the automated method doesn't work:

### Step 1: Build the Documentation

```bash
cd docs
npm install  # Only needed first time or after dependency changes
npm run build
```

This creates a `build/` directory with the static site files.

### Step 2: Preview Locally (Optional)

Before publishing, you can preview the built site:

```bash
npm run serve
```

Open http://localhost:3000 to see how it will look.

### Step 3: Deploy to GitHub Pages

#### Option A: Using Git Worktree (Recommended for Manual)

```bash
# From the repository root
cd /Users/nethmih/Documents/Ceygenic/Blog/CEYCDS-PK-package-collection

# Create a worktree for gh-pages branch
git worktree add ../package-collection-gh-pages gh-pages

# Navigate to the worktree
cd ../package-collection-gh-pages

# Remove all files except .git
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy built files
rsync -av --exclude ".git" ../CEYCDS-PK-package-collection/docs/build/ .

# Commit and push
git add .
git commit -m "Deploy updated documentation"
git push origin gh-pages

# Clean up
cd ../CEYCDS-PK-package-collection
git worktree remove ../package-collection-gh-pages
```

#### Option B: Direct Branch Checkout

```bash
# From the repository root
cd /Users/nethmih/Documents/Ceygenic/Blog/CEYCDS-PK-package-collection

# Switch to gh-pages branch (create if it doesn't exist)
git checkout -b gh-pages
# Or if branch exists:
# git checkout gh-pages

# Remove all files except .git
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy built files from docs/build
cp -r docs/build/* .

# Commit and push
git add .
git commit -m "Deploy updated documentation"
git push origin gh-pages

# Switch back to main branch
git checkout main
```

## Setting Up GitHub Pages

1. Go to your repository on GitHub: `https://github.com/ceygenic-web/CEYCDS-PK-package-collection`
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

GitHub will automatically publish your site. It may take a few minutes to become available.

## Development Workflow

### 1. Make Changes

Edit documentation files in:
- `docs/docs/packages/composer-packages/CEYCDS-PK-COMPOSER-003-blog/` (for blog package)

### 2. Preview Locally

```bash
cd docs
npm start
```

This starts a development server at http://localhost:3000 with hot-reload.

### 3. Commit Changes

```bash
# From repository root
git add .
git commit -m "Update blog package documentation"
git push origin main
```

### 4. Publish

```bash
cd docs
npm run deploy
```

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
cd docs
npm run clear  # Clear cache
npm install   # Reinstall dependencies
npm run build # Try building again
```

### GitHub Pages Not Updating

1. Check that the `gh-pages` branch exists and has content
2. Verify GitHub Pages is configured correctly in repository settings
3. Wait a few minutes - GitHub Pages can take 5-10 minutes to update
4. Clear your browser cache or try incognito mode

### Permission Errors

If you get permission errors when deploying:

1. Ensure you have push access to the repository
2. Check your Git credentials are configured correctly
3. Verify the repository URL in `docusaurus.config.ts` matches your actual repository

## Continuous Deployment (Advanced)

For automatic deployment on every push to main, you can set up GitHub Actions:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: docs/package-lock.json
      
      - name: Install dependencies
        run: |
          cd docs
          npm ci
      
      - name: Build
        run: |
          cd docs
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/build
          cname: # Optional: your custom domain
```

This will automatically deploy whenever you push changes to the `docs/` directory.

## Your Published Site

Once deployed, your documentation will be available at:

**https://ceygenic-web.github.io/CEYCDS-PK-package-collection/**

The blog package documentation will be at:

**https://ceygenic-web.github.io/CEYCDS-PK-package-collection/docs/packages/composer-packages/CEYCDS-PK-COMPOSER-003-blog/**

