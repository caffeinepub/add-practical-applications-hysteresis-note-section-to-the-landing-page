# Specification

## Summary
**Goal:** Add the uploaded photo to the site’s Demo & Media section as a static frontend asset.

**Planned changes:**
- Add the uploaded image to `frontend/public/assets/` with a URL-safe filename.
- Update `frontend/src/siteConfig.ts` to include the image URL in `siteConfig.media.images`.
- Ensure `frontend/src/components/sections/DemoMediaSection.tsx` renders the image in the existing grid and does not show the “Demo content coming soon” placeholder when images are present.

**User-visible outcome:** The Demo & Media section displays the uploaded photo on the page, loading from a stable public URL with no backend changes.
