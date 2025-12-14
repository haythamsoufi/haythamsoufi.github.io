# GitHub Portfolio Setup Guide

This guide will help you set up both a GitHub Profile README and a GitHub Pages portfolio site.

## Option 1: GitHub Profile README (Simplest)

This displays on your GitHub profile page (github.com/yourusername).

### Steps:

1. **Create a new repository** with the exact name as your GitHub username
   - Go to GitHub → New Repository
   - Repository name: `yourusername` (must match exactly)
   - Make it **Public**
   - **Don't** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Add README.md file**
   - Click "creating a new file"
   - Name it: `README.md`
   - Copy the content from `github-profile-README.md` (provided)
   - Replace all `YOUR_USERNAME` with your actual GitHub username
   - Customize the content with your information
   - Commit the file

3. **View your profile**
   - Go to `github.com/yourusername`
   - Your README will appear at the top of your profile!

### Customization Tips:

- **GitHub Stats**: Replace `YOUR_USERNAME` in the stats URLs
- **Badges**: Use [shields.io](https://shields.io) to create custom badges
- **Icons**: Use [simpleicons.org](https://simpleicons.org) for logo names
- **Emojis**: Use GitHub emoji shortcodes or copy-paste emojis

## Option 2: GitHub Pages Portfolio (Full Website)

This creates a full website at `yourusername.github.io`.

### Steps:

1. **Create a new repository**
   - Repository name: `yourusername.github.io` (replace with your username)
   - Make it **Public**
   - Initialize with README (optional)

2. **Upload your HTML file**
   - Use the `github-pages-index.html` file provided
   - Rename it to `index.html`
   - Upload it to the repository root

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click Save

4. **Access your site**
   - Your site will be live at: `https://yourusername.github.io`
   - It may take a few minutes to deploy

### Customization:

- Edit `index.html` to customize colors, content, and sections
- Add your own images, projects, and links
- The CSS is embedded, so everything is in one file

## Option 3: Both (Recommended)

You can have both:
- **Profile README**: Quick overview on your profile
- **GitHub Pages**: Full portfolio website

Just create both repositories following the steps above!

## Advanced Features

### GitHub Profile README Enhancements:

1. **GitHub Stats Cards**
   - Visit: https://github.com/anuraghazra/github-readme-stats
   - Customize themes, layouts, and more

2. **Contribution Snake**
   - Add this to your README:
   ```markdown
   ![snake gif](https://github.com/YOUR_USERNAME/YOUR_USERNAME/blob/output/github-contribution-grid-snake.svg)
   ```
   - Then set up the workflow (see below)

3. **Activity Graph**
   - Use: https://github.com/Ashutosh00710/github-readme-activity-graph

4. **Trophy Stats**
   - Already included in the template
   - Automatically updates

### Setting Up Contribution Snake:

1. Go to your profile repository
2. Create `.github/workflows/snake.yml`:
```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk@master
        with:
          github_user_name: YOUR_USERNAME
          outputs: dist/github-contribution-grid-snake.svg
      - uses: crazy-max/ghaction-github-pages@v2
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Commit and push
4. Wait for the workflow to run (check Actions tab)

## Design Resources

### Color Schemes:
- [Coolors.co](https://coolors.co) - Color palette generator
- [UI Gradients](https://uigradients.com) - Beautiful gradients

### Icons:
- [Font Awesome](https://fontawesome.com) - Icon library
- [Simple Icons](https://simpleicons.org) - Brand icons
- [Emoji Pedia](https://emojipedia.org) - Emoji reference

### Badges:
- [Shields.io](https://shields.io) - Custom badges
- [Badgen.net](https://badgen.net) - Alternative badge service

### Images:
- [Unsplash](https://unsplash.com) - Free high-quality images
- [Pexels](https://pexels.com) - Free stock photos

## Tips for Best Results

1. **Keep it updated**: Regularly update your projects and stats
2. **Be authentic**: Show your personality and interests
3. **Showcase your work**: Link to your best projects
4. **Use visuals**: Badges, stats, and emojis make it engaging
5. **Mobile-friendly**: Test how it looks on mobile devices
6. **SEO**: Use relevant keywords in your descriptions

## Troubleshooting

### Profile README not showing:
- Make sure repository name matches your username exactly
- Repository must be public
- README.md must be in the root directory

### GitHub Pages not working:
- Check repository name is `username.github.io`
- Verify Pages is enabled in Settings
- Wait 5-10 minutes for deployment
- Check Actions tab for errors

### Stats not loading:
- Replace `YOUR_USERNAME` with your actual username
- Some stats may take time to generate
- Check if the service is down

## Next Steps

1. Customize the templates with your information
2. Add your projects and links
3. Choose a color scheme that represents you
4. Test everything on different devices
5. Share your profile/portfolio!

## Example Profiles to Get Inspired

- [@anuraghazra](https://github.com/anuraghazra) - Great stats and design
- [@abhisheknaiidu](https://github.com/abhisheknaiidu) - Creative layout
- [@thmsgbrt](https://github.com/thmsgbrt) - Clean and professional

Good luck with your portfolio! 🚀

