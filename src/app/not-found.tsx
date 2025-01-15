// app/not-found.tsx
"use client"; // Mark this as a Client Component

import RootLayout from "./layout"; // Import the root layout

export default function NotFound() {
  return (
    <RootLayout>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </RootLayout>
  );
}
