---
sidebar_position: 1
---

# Packages Documentation

This section contains documentation for all packages in the repository. Package README files are automatically synced from their source locations.

## Package Categories

### NPM Packages
NPM packages are located in the `NPM_Package` directory and at the root level (like `Alert_Box`). These packages are published to npm and can be installed using:

```bash
npm install <package-name>
```

### Composer Packages
Composer packages are located in the `COMPOSER_Package` directory. These are PHP packages for Laravel and can be installed using:

```bash
composer require <package-name>
```

## Syncing Package Documentation

To sync package README files to this documentation site, run:

```bash
npm run sync-readmes
```

This script will:
1. Find all README.md files in package directories
2. Copy them to the appropriate documentation folders
3. Add Docusaurus frontmatter for proper display
4. Organize them by package type (NPM or Composer)

## Adding New Packages

When you add a new package:

1. Create your package in the appropriate directory (`NPM_Package` or `COMPOSER_Package`)
2. Add a `README.md` file to your package
3. Run `npm run sync-readmes` to sync it to the documentation
4. The package documentation will automatically appear in the sidebar

## Package Structure

Packages are organized as follows:

- **NPM Packages**: `docs/packages/npm-packages/`
- **Composer Packages**: `docs/packages/composer-packages/`

Each package's README is converted to a Docusaurus markdown document with appropriate frontmatter for navigation and metadata.
