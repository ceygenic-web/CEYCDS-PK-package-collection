---
sidebar_position: 1
title: "CEYGENIC NPM Package Template"
description: "Documentation for CEYCDS-PK-000-NPMPackageTemplate NPM package"
---

# CEYGENIC NPM Package Template

Use this repo to create new NPM packages at Ceygenic.

## Naming Convention

All Ceygenic NPM packages must follow this naming convention:

- **Scope**: Use `@ceygenic/` as the package scope
- **Format**: `@ceygenic/<package-name>`
- **Package Name Rules**:
  - Use lowercase letters, numbers, and hyphens only
  - Use kebab-case (e.g., `alert-box`, `logger-utils`, `api-client`)
  - Keep names descriptive and concise
  - Avoid abbreviations unless widely understood

**Examples:**
- `@ceygenic/alert-box`
- `@ceygenic/logger`
- `@ceygenic/api-client`
- `@ceygenic/form-validator`

## Package Types

This template can be used to create various types of NPM packages:

1. **Utility Libraries**: Helper functions, utilities, and common utilities (e.g., `@ceygenic/logger`, `@ceygenic/form-validator`)
2. **UI Components**: Reusable UI components and widgets (e.g., `@ceygenic/alert-box`, `@ceygenic/modal`)
3. **API Clients**: SDKs and API wrappers for external services
4. **Type Definitions**: TypeScript type definitions and interfaces
5. **Build Tools**: Development tools, build scripts, and bundlers
6. **Configuration Packages**: Shared configuration files (ESLint, Prettier, etc.)

## Basic File Structure

This template provides the following basic file structure:

```
template/
├── package.json          # Package metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── README.md             # Package documentation (this file)
├── src/
│   ├── index.ts          # Main entry point - export your public API here
│   └── lib/              # Library modules
│       └── Example.ts    # Example module (delete or rename as needed)
└── tests/                # Test files
    └── example.spec.ts   # Example test file (delete or rename as needed)
```

**Build Output:**
- `dist/` - Generated build files (automatically created when running `npm run build`)
  - `index.cjs` - CommonJS build
  - `index.js` - ES Module build
  - `index.global.js` - IIFE build for browser
  - `index.d.ts` - TypeScript type definitions

**Additional Files:**
If you need additional files or directories for your package, create them as needed. Common additions include:

- `.gitignore` - Git ignore rules
- `.npmignore` - NPM publish ignore rules
- `LICENSE` - License file (MIT recommended)
- `src/types/` - TypeScript type definitions directory
- `src/utils/` - Utility functions directory
- `src/config/` - Configuration files
- `examples/` - Usage examples
- `docs/` - Additional documentation

## Prerequisites

Before using this template, ensure you have the following installed and configured:

- **Node.js**: Version 18.x or higher ([Download Node.js](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: Latest version ([Download Git](https://git-scm.com/downloads))
- **GitHub Account**: Access to the Ceygenic GitHub organization
- **TypeScript Knowledge**: Basic understanding of TypeScript (recommended)
- **Code Editor**: VS Code or any modern IDE with TypeScript support

**Verify your setup:**
```bash
node --version    # Should be v18.x or higher
npm --version     # Should be 9.x or higher
git --version     # Should be installed
```

## How to use this template

1) Create Repository
   - On the GitHub repository page, click the green **"Use this template"** button (located at the top - right of the repository)
   - Select **"Create a new repository"**
   - Name the new repository using the format: `CEYCDS-PK-NPM-xxx-<repo-name>`
     - Replace `xxx` with the package number and `<repo-name>` with your package name.
   - Clone your newly created repository:
   ```
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2) Set your package name and metadata
   - Open `package.json` and edit:
     - `name`: use scope `@ceygenic/<package-name>` (use kebab-case, e.g., `@ceygenic/alert-box`)
     - `version`: start with `0.1.0`
     - `description`, `author`

3) Implement your code
   - Edit `src/index.ts` and files in `src/lib/`.
   - Export your public API from `src/index.ts`.

4) Install and build
```
npm install
npm run build
```

5) Test (optional but recommended)
```
npm test
```
   - Uses Vitest + JSDOM. Add your own tests under `tests/`.
   - Do unit testing: create files like `tests/<feature>.spec.ts` and import from `src/`.
     Write focused tests for each exported function.
   - **Note**: If you need custom Vitest configuration, create a `vitest.config.ts` file in the root directory.

6) Verify your package
   - Build the package: `npm run build`
   - Check that `dist/` folder contains all expected files
   - Test the build locally by importing it in a test project:
   ```
   npm link  # In your package directory
   npm link @ceygenic/your-package-name  # In your test project
   ```

7) Publish to npm (when ready)
   ```
   npm login
   npm publish --access public
   ```
   - Ensure you're logged into npm with access to the `@ceygenic` scope
   - Make sure version number in `package.json` follows SemVer
   - Only the `dist/` folder and essential files will be published (configured in `package.json` `files` field)

## Documentation Links

### Essential Documentation
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **npm**: [npm Documentation](https://docs.npmjs.com/)
- **Vitest**: [Vitest Documentation](https://vitest.dev/)
- **tsup**: [tsup Documentation](https://tsup.egoist.dev/)

### Ceygenic Resources
- **NPM Package Creation Guide**: [Ceygenic NPM Package Creation Guide](https://docs.google.com/document/d/1ZdtURFh-bV_QL8IT9qT0iiXl7w8CurZXnf6zipvboK8/edit?usp=sharing)


## Troubleshooting

### Common Issues

**Build fails with "Cannot find module"**
- Ensure all dependencies are installed: `npm install`
- Check that TypeScript imports are correct in `src/index.ts`

**Tests fail or Vitest not found**
- Run `npm install` to ensure Vitest is installed
- Check that test files are in the `tests/` directory with `.spec.ts` extension

**Package name already exists**
- Verify the package name isn't already taken on npm
- Consider a more specific name if needed

**Build output missing files**
- Run `npm run clean` then `npm run build`
- Check `package.json` `files` field includes `dist`

**Global name not working in browser**
- Ensure you updated the `--global-name` flag in the build script
- Rebuild after changing: `npm run build`

