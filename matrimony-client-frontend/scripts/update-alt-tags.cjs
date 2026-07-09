const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function formatAltText(filename) {
  // Remove extension
  let name = filename.replace(/\.[^/.]+$/, "");
  // Replace dashes and underscores with spaces
  name = name.replace(/[-_]/g, " ");
  // Enhance very short names or purely numeric names
  if (name.length <= 2 || !isNaN(name)) {
    name = "AgapeVows Matrimony " + name;
  }
  // Capitalize first letter of each word
  return name.replace(/\b\w/g, l => l.toUpperCase());
}

let updatedFilesCount = 0;
let totalImagesFound = 0;

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to match <img ... /> allowing for newlines
  const imgRegex = /<img\b([^>]*)>/g;
  
  content = content.replace(imgRegex, (match, innerProps) => {
    totalImagesFound++;
    
    // Check if it already has a non-empty alt
    const hasAlt = /alt\s*=\s*(["'])(.+?)\1/.test(innerProps) || /alt\s*=\s*\{.+?\}/.test(innerProps);
    const hasEmptyAlt = /alt\s*=\s*(["'])\1/.test(innerProps);

    // If it has a proper alt already, skip
    if (hasAlt && !hasEmptyAlt) {
      return match;
    }

    // Try to find static src string to extract filename
    let altText = "AgapeVows Image"; // Fallback
    const srcMatch = /src\s*=\s*(["'])(.+?)\1/.test(innerProps) ? innerProps.match(/src\s*=\s*(["'])(.+?)\1/) : null;
    
    if (srcMatch && srcMatch[2]) {
      const srcPath = srcMatch[2];
      const filename = srcPath.split('/').pop().split('\\').pop();
      if (filename && filename.includes('.')) {
        let formatted = formatAltText(filename);
        if (formatted.trim().length > 0) {
          altText = formatted;
        }
      }
    }

    // Remove existing empty alt if present
    let newInnerProps = innerProps.replace(/\s*alt\s*=\s*(["'])\1/g, "");
    newInnerProps = newInnerProps.replace(/\s*alt\s*=\s*\{\s*["']\s*["']\s*\}/g, ""); // alt={""}

    // Ensure it ends with / if it was self closing
    const isSelfClosing = newInnerProps.trim().endsWith('/');
    if (isSelfClosing) {
      newInnerProps = newInnerProps.replace(/\/$/, "").trim();
      return `<img ${newInnerProps} alt="${altText}" />`;
    } else {
      return `<img ${newInnerProps.trim()} alt="${altText}">`;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFilesCount++;
  }
});

console.log(`Finished processing!`);
console.log(`Updated ${updatedFilesCount} files.`);
console.log(`Total <img ...> tags found: ${totalImagesFound}`);
