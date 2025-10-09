Three.js Background (React Three Fiber) — Drop-in for Next.js

What this component provides
- Subtle floating geometric shapes (cube, sphere, cone) with hover interaction (scale + glow)
- Particle / starfield background
- Dark neon-friendly color palette
- Responsive behavior (pointer-events disabled on small screens)
- No extra heavy dependencies; designed to be performance-conscious

Files added
- `app/components/ThreeBackground.js` — client React component with the Canvas and shapes
- minor CSS updates in `app/globals.css` (classes: `.three-bg`, `.three-overlay`, `.neon-glow`)

Install required packages
This project already uses Next.js and Tailwind. You need to install React Three Fiber and Drei.

Run in your project root (Windows PowerShell):

```powershell
npm install @react-three/fiber @react-three/drei three
```

Usage
1. Import and render the component inside your layout (likely `app/layout.js`) so it sits behind content.

Example (drop into `app/layout.js` near top-level):

```jsx
import ThreeBackground from './components/ThreeBackground';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThreeBackground />
        {children}
      </body>
    </html>
  );
}
```

Notes & tuning
- Device pixel ratio is clamped in the component to avoid rendering at very high DPRs on mobile which hog performance.
- The `Stars` component and `Points` buffer are tuned for a balance between look and performance. Reduce `count` props if you need more fps.
- On mobile, the canvas won't intercept pointer events by default. You can change this behavior in `globals.css`.

Performance checklist
- Keep the Canvas dpr capped (already set to 1.5 max).
- Use Suspense fallback and avoid heavy GLTF models in the background.
- Reduce particle/points count for constrained devices.

If you'd like, I can add a toggle to disable the background on low-power devices or when the user prefers reduced motion.
