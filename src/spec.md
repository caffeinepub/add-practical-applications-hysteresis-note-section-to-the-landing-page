# Specification

## Summary
**Goal:** Fix the Demo & Media image so it loads reliably in production, and improve the Demo & Media image UX.

**Planned changes:**
- Re-add the user-uploaded demo image file to the frontend public/static assets so the app’s referenced path is present in production builds.
- Update Demo & Media image URL handling to be robust to deployed base paths (avoid hard-coded leading `/` paths that can break in production).
- Add a user-friendly fallback UI in the Demo & Media section when an image fails to load (no broken image icon; no uncaught errors).
- Make Demo & Media images clickable to open the full-size original image in a new tab/window.

**User-visible outcome:** Demo images load correctly in local and deployed environments; if an image can’t load, users see a clear fallback message; users can click images to view them full size in a new tab.
