// Build script to combine partials into index.html
// Run with: node js/build-partials.js

const fs = require('fs');
const path = require('path');

const partialsDir = path.join(__dirname, '..', 'partials');
const indexTemplate = path.join(__dirname, '..', 'index.template.html');
const indexOutput = path.join(__dirname, '..', 'index.html');

// Read all partial files
const partials = {
    'background': fs.readFileSync(path.join(partialsDir, 'background.html'), 'utf8'),
    'navigation': fs.readFileSync(path.join(partialsDir, 'navigation.html'), 'utf8'),
    'hero': fs.readFileSync(path.join(partialsDir, 'hero.html'), 'utf8'),
    'project-details': fs.readFileSync(path.join(partialsDir, 'project-details.html'), 'utf8'),
    'about': fs.readFileSync(path.join(partialsDir, 'about.html'), 'utf8'),
    'skills': fs.readFileSync(path.join(partialsDir, 'skills.html'), 'utf8'),
    'projects': fs.readFileSync(path.join(partialsDir, 'projects.html'), 'utf8'),
    'contact': fs.readFileSync(path.join(partialsDir, 'contact.html'), 'utf8'),
    'mockup-modal': fs.readFileSync(path.join(partialsDir, 'mockup-modal.html'), 'utf8')
};

// Read template
let html = fs.readFileSync(indexTemplate, 'utf8');

// Replace placeholders with partial content
Object.keys(partials).forEach(key => {
    const placeholder = `<!-- PARTIAL:${key} -->`;
    html = html.replace(placeholder, partials[key]);
});

// Write output
fs.writeFileSync(indexOutput, html, 'utf8');
console.log('✅ Built index.html from partials');

