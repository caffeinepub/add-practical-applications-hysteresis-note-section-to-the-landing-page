# Specification

## Summary
**Goal:** Ensure the Demo & Media section image asset is included in the frontend build and loads correctly in production.

**Planned changes:**
- Add the uploaded image file to the frontend static assets so it is shipped with production builds.
- Ensure the shipped filename/path matches what `frontend/src/siteConfig.ts` references (currently `assets/whatsapp-image-2026-02-06-092349.jpeg`), by renaming/copying the uploaded file to `frontend/public/assets/whatsapp-image-2026-02-06-092349.jpeg` or updating the config to the actual shipped filename.
- Verify the Demo & Media section renders the image under non-root base paths without triggering the “Image failed to load” fallback, and that clicking still opens the full-size image in a new tab.

**User-visible outcome:** The Demo & Media image reliably displays in deployed environments (including non-root base paths), and users can click it to view the full-size image in a new tab.
