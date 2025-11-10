const fs = require('fs');
const path = require('path');

// Paths
const workspaceRoot = path.join(__dirname, '../../../..');
const npmPackagesDir = path.join(workspaceRoot, 'NPM_Package');
const composerPackagesDir = path.join(workspaceRoot, 'COMPOSER_Package');
const alertBoxDir = path.join(workspaceRoot, 'Alert_Box');
const npmDocsDir = path.join(__dirname, '../packages/npm-packages');
const composerDocsDir = path.join(__dirname, '../packages/composer-packages');

// Create docs directories if they don't exist
[npmDocsDir, composerDocsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

/**
 * Convert package directory name to a readable document name
 */
function getDocName(packageDir) {
  // Convert kebab-case or snake_case to Title Case
  return packageDir
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Copy README file and add Docusaurus frontmatter
 */
function copyReadmeWithFrontmatter(srcPath, destPath, packageName, packageType) {
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  README not found: ${srcPath}`);
    return false;
  }

  const readmeContent = fs.readFileSync(srcPath, 'utf8');
  
  // Extract title from first heading if it exists
  const titleMatch = readmeContent.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : getDocName(packageName);
  
  // Create frontmatter (escape quotes in title if needed)
  const escapedTitle = title.replace(/"/g, '\\"');
  const frontmatter = `---
sidebar_position: 1
title: "${escapedTitle}"
description: "Documentation for ${packageName} ${packageType} package"
---\n\n`;
  
  // Combine frontmatter with README content
  const docContent = frontmatter + readmeContent;
  
  // Write to destination
  fs.writeFileSync(destPath, docContent, 'utf8');
  console.log(`✅ Copied: ${packageName} -> ${path.basename(destPath)}`);
  return true;
}

/**
 * Sync NPM packages
 */
function syncNpmPackages() {
  console.log('\n📦 Syncing NPM Packages...');
  console.log('─────────────────────────────────────────');
  
  let count = 0;
  
  // Sync packages from NPM_Package directory
  if (fs.existsSync(npmPackagesDir)) {
    const packages = fs.readdirSync(npmPackagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !name.startsWith('.') && name !== 'node_modules' && name !== 'temp');
    
    packages.forEach(pkg => {
      const readmePath = path.join(npmPackagesDir, pkg, 'README.md');
      const docPath = path.join(npmDocsDir, `${pkg}.md`);
      
      if (copyReadmeWithFrontmatter(readmePath, docPath, pkg, 'NPM')) {
        count++;
      }
    });
  } else {
    console.log(`⚠️  NPM packages directory not found: ${npmPackagesDir}`);
  }
  
  // Sync Alert_Box package from root if it exists and has package.json (NPM package)
  if (fs.existsSync(alertBoxDir)) {
    const packageJsonPath = path.join(alertBoxDir, 'package.json');
    const readmePath = path.join(alertBoxDir, 'README.md');
    
    // Only include if it has package.json (indicating it's an NPM package)
    if (fs.existsSync(packageJsonPath) && fs.existsSync(readmePath)) {
      const docPath = path.join(npmDocsDir, 'Alert_Box.md');
      if (copyReadmeWithFrontmatter(readmePath, docPath, 'Alert_Box', 'NPM')) {
        count++;
      }
    }
  }
  
  console.log(`\n✅ Synced ${count} NPM package(s)\n`);
}

/**
 * Sync Composer packages
 */
function syncComposerPackages() {
  console.log('\n📦 Syncing Composer Packages...');
  console.log('─────────────────────────────────────────');
  
  if (!fs.existsSync(composerPackagesDir)) {
    console.log(`⚠️  Composer packages directory not found: ${composerPackagesDir}`);
    return;
  }
  
  const packages = [];
  
  // Get direct packages (like package-01, CEYPK-PackageTemplate)
  const directPackages = fs.readdirSync(composerPackagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => 
      !name.startsWith('.') && 
      name !== 'node_modules' && 
      name !== 'vendor' &&
      name !== 'project' &&
      name !== 'project_tmp' &&
      !name.includes(' copy')
    );
  
  directPackages.forEach(pkg => {
    const readmePath = path.join(composerPackagesDir, pkg, 'README.md');
    if (fs.existsSync(readmePath)) {
      packages.push({
        name: pkg,
        path: readmePath,
        docName: pkg
      });
    }
  });
  
  // Get nested packages (like nethmi/logger)
  const nestedDirs = fs.readdirSync(composerPackagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => 
      !name.startsWith('.') && 
      name !== 'node_modules' && 
      name !== 'vendor' &&
      name !== 'project' &&
      name !== 'project_tmp' &&
      !name.includes(' copy')
    );
  
  nestedDirs.forEach(parentDir => {
    const parentPath = path.join(composerPackagesDir, parentDir);
    const children = fs.readdirSync(parentPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    children.forEach(child => {
      const readmePath = path.join(parentPath, child, 'README.md');
      if (fs.existsSync(readmePath)) {
        packages.push({
          name: `${parentDir}/${child}`,
          path: readmePath,
          docName: `${parentDir}-${child}`
        });
      }
    });
  });
  
  let count = 0;
  packages.forEach(pkg => {
    const docPath = path.join(composerDocsDir, `${pkg.docName}.md`);
    if (copyReadmeWithFrontmatter(pkg.path, docPath, pkg.name, 'Composer')) {
      count++;
    }
  });
  
  console.log(`\n✅ Synced ${count} Composer package(s)\n`);
}

/**
 * Create category files for Docusaurus
 */
function createCategoryFiles() {
  // NPM Packages category
  const npmCategoryPath = path.join(npmDocsDir, '_category_.json');
  if (!fs.existsSync(npmCategoryPath)) {
    const npmCategory = {
      label: 'NPM Packages',
      position: 1,
      collapsible: true,
      collapsed: false
    };
    fs.writeFileSync(npmCategoryPath, JSON.stringify(npmCategory, null, 2));
    console.log('✅ Created NPM packages category file');
  }
  
  // Composer Packages category
  const composerCategoryPath = path.join(composerDocsDir, '_category_.json');
  if (!fs.existsSync(composerCategoryPath)) {
    const composerCategory = {
      label: 'Composer Packages',
      position: 2,
      collapsible: true,
      collapsed: false
    };
    fs.writeFileSync(composerCategoryPath, JSON.stringify(composerCategory, null, 2));
    console.log('✅ Created Composer packages category file');
  }
}

// Main execution
console.log('🚀 Starting README sync...');
console.log('─────────────────────────────────────────');

createCategoryFiles();
syncNpmPackages();
syncComposerPackages();

console.log('✨ README sync complete!');
console.log('─────────────────────────────────────────');

