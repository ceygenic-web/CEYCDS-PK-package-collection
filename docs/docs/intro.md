---
sidebar_position: 1
---

# Package Collection Documentation

Welcome to the Package Collection documentation! This site contains documentation for all packages in the repository.

## Overview

This documentation site automatically syncs README files from packages in the repository and organizes them by package type:

- **NPM Packages**: JavaScript/TypeScript packages published to npm
- **Composer Packages**: PHP packages for Laravel applications

## Getting Started

Browse the packages using the sidebar navigation. Each package has its own documentation page with installation instructions, usage examples, and API reference.

## Syncing Documentation

Package README files are synced automatically. To update the documentation after adding or modifying a package README, run:

```bash
npm run sync-readmes
```

This will sync all package README files to the documentation site.

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
