# Jekyll Setup Instructions

## Quick Start

### 1. Install Jekyll

**Windows (using RubyInstaller):**
```bash
# Download Ruby from https://rubyinstaller.org/
# Then install Jekyll
gem install jekyll bundler
```

**macOS/Linux:**
```bash
gem install jekyll bundler
```

### 2. Install Dependencies

```bash
bundle install
```

### 3. Run Locally

```bash
bundle exec jekyll serve
```

Visit: http://localhost:4000

### 4. Deploy to GitHub Pages

1. Create a repository named `yourusername.github.io`
2. Push all files to the repository
3. GitHub Pages will automatically deploy your site

## File Structure

```
.
├── _config.yml          # Site configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Home page
├── about.md             # About page
├── skills.md            # Skills page
├── projects.md          # Projects page
├── contact.md           # Contact page
├── databank.md          # DataBank project details
├── _layouts/            # Page layouts
│   └── home.html        # Home layout
└── README.md            # This file
```

## Customization

### Change Site Settings
Edit `_config.yml`:
- Site title, description, author
- Social media links
- Navigation menu

### Update Content
Edit the `.md` files:
- `index.md` - Home page
- `about.md` - About page
- `databank.md` - Project details
- etc.

### Customize Theme
- Edit `_layouts/` for custom layouts
- Add CSS in `_sass/` directory
- Or use inline styles in layout files

## Troubleshooting

**Error: "Could not locate Gemfile"**
- Make sure you're in the project directory
- Run `bundle install` first

**Error: "jekyll: command not found"**
- Install Jekyll: `gem install jekyll bundler`
- Or use: `bundle exec jekyll serve`

**Site not updating on GitHub Pages**
- Wait 1-5 minutes for deployment
- Check repository Settings → Pages
- Ensure `_config.yml` doesn't have errors

## Next Steps

1. Customize `_config.yml` with your information
2. Update all `.md` files with your content
3. Test locally with `bundle exec jekyll serve`
4. Push to GitHub and your site will be live!

