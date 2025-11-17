# 📦 Publishing Guide for GSAP Dattebayo

## Pre-Publication Checklist

### ✅ Code Quality
- [x] All TypeScript files compile without errors
- [x] Build succeeds: `npm run build`
- [x] Bundle sizes are optimal (< 30KB total)
- [x] All exports are working correctly

### ✅ Documentation
- [x] README.md is complete and accurate
- [x] CHANGELOG.md is up to date
- [x] Examples work correctly
- [x] API documentation is clear

### ✅ Package Configuration
- [x] package.json metadata is complete
- [x] Version number is correct (0.1.0-alpha.1)
- [x] License file is present (MIT)
- [x] .npmignore is configured

---

## 🚀 How to Publish to NPM

### Step 1: Create NPM Account (if needed)

```bash
# Visit https://www.npmjs.com/signup
# Create your account
```

### Step 2: Login to NPM

```bash
npm login
# Enter your username, password, and email
```

### Step 3: Test Package Locally

```bash
# Build the package
npm run build

# Test locally using npm link
npm link

# In another project:
cd /path/to/test-project
npm link gsap-dattebayo

# Test that it works
```

### Step 4: Verify Package Contents

```bash
# See what will be published
npm pack --dry-run

# This creates a tarball without publishing
npm pack
```

### Step 5: Publish to NPM

```bash
# Publish as public package (alpha version)
npm publish --access public --tag alpha

# For regular releases (when ready):
# npm publish --access public
```

### Step 6: Verify Publication

```bash
# Check on NPM
open https://www.npmjs.com/package/gsap-dattebayo

# Test installation
npm install gsap-dattebayo@alpha
```

---

## 📋 Version Management

### Alpha/Beta Releases

```bash
# Alpha: v0.1.0-alpha.1
npm publish --access public --tag alpha

# Beta: v0.2.0-beta.1
npm publish --access public --tag beta

# Users install with:
npm install gsap-dattebayo@alpha
```

### Stable Releases

```bash
# Patch: v1.0.1
npm version patch
npm publish --access public

# Minor: v1.1.0
npm version minor
npm publish --access public

# Major: v2.0.0
npm version major
npm publish --access public
```

---

## 🏷️ Git Tagging

```bash
# Create Git tag
git tag v0.1.0-alpha.1

# Push tag to GitHub
git push origin v0.1.0-alpha.1

# Create GitHub release
# Visit: https://github.com/yourusername/gsap-dattebayo/releases/new
```

---

## 📊 Post-Publication Steps

### 1. Update GitHub

```bash
git add .
git commit -m "chore: publish v0.1.0-alpha.1"
git push origin main
```

### 2. Create GitHub Release

1. Go to https://github.com/yourusername/gsap-dattebayo/releases
2. Click "Create a new release"
3. Tag: `v0.1.0-alpha.1`
4. Title: `v0.1.0-alpha.1 - Initial Alpha Release`
5. Description: Copy from CHANGELOG.md
6. Check "This is a pre-release" for alpha/beta
7. Publish release

### 3. Share the Package

- Tweet about it
- Post on Reddit (r/javascript, r/webdev)
- Share on Discord servers
- Create CodePen/CodeSandbox demos

---

## 🔧 Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Rebuild
npm run build
```

### Publishing Updates

```bash
# Make changes
# Update CHANGELOG.md
# Bump version
npm version patch  # or minor, or major

# Rebuild
npm run build

# Publish
npm publish --access public
```

---

## 🎯 Current Package Status

**Version:** 0.1.0-alpha.1
**Bundle Size:** ~23KB minified, ~5.7KB gzipped
**Status:** Alpha - Ready for testing
**Next Steps:**
1. Publish to NPM with `--tag alpha`
2. Gather community feedback
3. Fix bugs and improve based on feedback
4. Release v0.2.0-beta when stable
5. Release v1.0.0 when production-ready

---

## 📝 Package Info

```json
{
  "name": "gsap-dattebayo",
  "version": "0.1.0-alpha.1",
  "description": "The ultimate GSAP-powered scroll animation library",
  "main": "dist/gsap-dattebayo.cjs.js",
  "module": "dist/gsap-dattebayo.esm.js",
  "browser": "dist/gsap-dattebayo.umd.js"
}
```

**Published Files:**
- dist/ (all builds)
- src/ (TypeScript source)
- README.md
- LICENSE
- CHANGELOG.md

---

## ⚠️ Important Notes

1. **Scope:** If you want to publish under your username, use `@username/gsap-dattebayo`
2. **Peer Dependencies:** Users must install GSAP separately
3. **Tags:** Use `--tag alpha` for pre-releases
4. **Versioning:** Follow semantic versioning (semver)
5. **Testing:** Always test before publishing

---

## 🆘 Troubleshooting

### "Package name already taken"
- Use scoped package: `@username/gsap-dattebayo`
- Choose different name

### "You must verify your email"
- Check NPM email and click verification link

### "npm ERR! 402 Payment Required"
- Scoped packages require `--access public`

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## 📞 Support

- GitHub Issues: https://github.com/yourusername/gsap-dattebayo/issues
- NPM Package: https://www.npmjs.com/package/gsap-dattebayo

---

**Good luck with your launch! 🚀**
