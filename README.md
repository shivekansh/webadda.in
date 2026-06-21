# webadda.in

webadda.in is a modern, high-performance marketing website designed for a web development agency targeting local businesses in India. It is built to deliver exceptional user experience, accessibility, and SEO performance.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Smooth Scrolling**: Lenis
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shivekansh/webadda.in.git
   cd webadda-in-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## NPM Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production (includes TypeScript compilation).
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint.

## Environment Variables

Currently, the project does not require any environment variables. All configurations are handled within the application source code.

## Project Structure

```
├── public/                 # Static assets (fonts, icons, robots.txt, sitemap.xml)
├── src/
│   ├── components/         # React components (sections, UI elements)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component & routing
│   ├── index.css           # Global Tailwind CSS and custom properties
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Deployment

This project is configured to be deployed as a static site. The `npm run build` command generates a `dist` directory containing all the production-ready static files.

To deploy:
1. Run `npm run build`.
2. Host the contents of the `dist` folder on your preferred static hosting provider (e.g., Vercel, Netlify, GitHub Pages, or AWS S3).
