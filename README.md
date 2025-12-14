# Portfolio Website

This folder contains all files for the GitHub Pages portfolio website.

## Files Overview

### HTML Portfolio (Single Page)
- **`index.html`** - Complete single-page portfolio with animations and fancy design
  - Ready to deploy directly to GitHub Pages
  - Includes hero section, about, skills, projects, and contact sections
  - Features detailed DataBank project section

### GitHub Profile README
- **`github-profile-README.md`** - Template for GitHub profile README
  - Copy to a repository named exactly your GitHub username
  - Displays on your GitHub profile page

### Jekyll Site (Alternative)
- **`_config.yml`** - Jekyll site configuration
- **`index.md`** - Home page
- **`databank.md`** - DataBank project details page
- **`about.md`** - About page
- **`skills.md`** - Skills page
- **`projects.md`** - Projects page
- **`contact.md`** - Contact page
- **`Gemfile`** - Ruby dependencies
- **`_layouts/`** - Custom layouts

### Documentation
- **`GITHUB_PORTFOLIO_SETUP.md`** - Setup guide for GitHub Pages
- **`JEKYLL_SETUP.md`** - Setup guide for Jekyll
- **`README-JEKYLL.md`** - Jekyll-specific README

## Quick Deploy Options

### Option 1: HTML Portfolio (Recommended - Easiest)
1. Create repository: `yourusername.github.io`
2. Copy `index.html` to the repository root
3. Enable GitHub Pages in repository settings
4. Done! Site is live at `https://yourusername.github.io`

### Option 2: Jekyll Site
1. Install Jekyll: `gem install jekyll bundler`
2. Run `bundle install` in this folder
3. Test locally: `bundle exec jekyll serve`
4. Push all files to `yourusername.github.io` repository
5. GitHub Pages will auto-deploy

### Option 3: GitHub Profile README
1. Create repository named exactly your GitHub username
2. Copy `github-profile-README.md` content to `README.md`
3. Replace `YOUR_USERNAME` with your actual username
4. It will appear on your GitHub profile automatically

## Customization

- Edit `index.html` for the HTML portfolio
- Edit `.md` files for Jekyll site content
- Update `_config.yml` for Jekyll site settings
- Customize colors, content, and links as needed

## Next Steps

1. Choose your preferred option (HTML or Jekyll)
2. Customize with your information
3. Deploy to GitHub Pages
4. Share your portfolio!

