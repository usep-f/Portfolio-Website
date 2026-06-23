<div align="center">
  <img width="1200" height="475" alt="Joseph Umali Portfolio Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Joseph Umali — Developer Portfolio Website

A premium, interactive, and highly customized personal developer portfolio showcasing engineering projects, academic background, technical skills, and practical setups. The project utilizes a modern editorial layout, dynamic visual elements, and a real-time headless CMS architecture.

- **Interactive Experience**: Custom inertia-driven cursor trailing, dynamic floating background purple blobs, interactive layout elements.
- **Dynamic Content**: Connected directly to Sanity.io CMS to query and render projects, skills, timeline events, and resume documents dynamically.
- **Client-Side Forms**: Clean and responsive contact forms integrated with Web3Forms API to send emails directly without needing a custom server backend.
- **Aesthetic Excellence**: Premium glassmorphism effects, crisp grid alignment, curated HSL color schemes, and custom spring-physics animations.

---

## Tech Stack

The architecture separates the frontend application from the content management system (headless CMS).

### Frontend
- **Framework**: React 19 (using JSX/TSX & Concurrent Mode)
- **Tooling / Bundler**: Vite 6 (Fast Refresh, esbuild transpilation)
- **Styling**: Tailwind CSS v4 (native CSS configuration, custom layout patterns)
- **Animations**: Motion (Framer Motion v12)
- **Icons**: Lucide React & React Icons
- **Headless CMS Client**: `@sanity/client` & `@sanity/image-url`

### Content Management (CMS)
- **Platform**: Sanity.io (Sanity Studio v3)
- **Interface**: TypeScript schemas (`studio/schemaTypes/`)
- **Query Language**: GROQ (Graph-Relational Object Queries)

---

## Prerequisites

Before setting up the project locally, ensure you have the following installed on your system:

- **Node.js**: Version 18.0.0 or higher (Node 20.x+ recommended)
- **npm** or **yarn** package manager
- **Sanity CLI** (optional, useful for managing the CMS from the terminal):
  ```bash
  npm install -g sanity
  ```

---

## Getting Started

Follow these steps to configure and run the portfolio frontend and the Sanity Studio content editor on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/usep-f/Portfolio-Website.git
cd Portfolio-Website
```

### 2. Environment Configuration
Create a `.env` file in the root directory (you can use `.env.example` as a template):
```bash
cp .env.example .env
```

Open the newly created `.env` file and configure the environment variables:
```env
# Sanity.io Configuration
VITE_SANITY_PROJECT_ID="i35fm0gr" # Default portfolio project ID
VITE_SANITY_DATASET="production"  # Default dataset name

# Web3Forms Configuration
VITE_WEB3FORMS_ACCESS_KEY="your_web3forms_access_key_here"
```

> [!NOTE]
> To receive emails from the contact form, generate a free access key on [Web3Forms](https://web3forms.com/) and paste it as the `VITE_WEB3FORMS_ACCESS_KEY` value.

### 3. Run the Frontend Application
Install the root dependencies and start the development server:
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
The application will start on **`http://localhost:3000`**. Open this URL in your web browser.

### 4. Run the Sanity Studio (CMS Backend)
Sanity Studio is a single-page application built into the `studio/` directory. It communicates with your Sanity.io cloud database.
```bash
# Navigate to the studio directory
cd studio

# Install dependencies
npm install

# Start Sanity local development server
npm run dev
```
The studio will run on **`http://localhost:3333`**. You will be prompted to log in using Google, GitHub, or email credentials that have access to the `i35fm0gr` project.

---

## Architecture Overview

### Directory Structure
```
Portfolio-Website/
├── .env.example             # Template for local environment variables
├── README.md                # Project documentation
├── index.html               # Main entry HTML document
├── package.json             # Root scripts and npm dependencies
├── vite.config.ts           # Vite configuration (includes Tailwind CSS v4 plugins)
├── src/                     # Frontend source files
│   ├── main.tsx             # ReactDOM rendering and application start
│   ├── App.tsx              # Main portfolio layout, theme-logic, and CMS fetch
│   ├── types.ts             # TypeScript definitions for CMS objects
│   ├── index.css            # Custom CSS styles, typography, and base theme variables
│   ├── assets/              # Static local assets (logo, default photos)
│   ├── components/          # Reusable React components
│   │   ├── BentoAbout.tsx                 # Bento layout displaying profile information
│   │   ├── BentoMoreThanDev.tsx           # Technical expertise other than development
│   │   ├── CenterColumnGeometricBlobs.tsx # Floating animated shapes
│   │   ├── ContactForm.tsx                # Email contact form using Web3Forms
│   │   ├── CustomCursor.tsx               # Custom cursor following mouse pointer
│   │   ├── DynamicOrbitCarousel.tsx       # Rotating skills carousel
│   │   ├── HeroAbstractBackground.tsx     # Blueprint patterns behind Hero
│   │   ├── ProjectCard.tsx                # Cards layout displaying portfolios
│   │   └── ResumeModal.tsx                # Modal viewer for Resume PDF
│   └── sanity/              # Sanity connection utilities
│       ├── client.ts                      # Sanity client initialization
│       └── queries.ts                     # GROQ queries for projects, skills, timeline
└── studio/                  # Headless CMS configuration and schemas
    ├── sanity.config.ts     # Main Sanity Studio configuration (Project ID, plugins)
    ├── sanity.cli.ts        # CLI settings for Sanity workspace
    ├── package.json         # CMS-specific dependencies and scripts
    └── schemaTypes/         # Document schema definitions
        ├── index.ts                       # Schemas registration
        ├── project.ts                     # Projects schema
        ├── skill.ts                       # Skills schema
        ├── timelineItem.ts                # Education/Work experience schema
        └── resume.ts                      # Resume PDF document schema
```

### Data Flow
```
Sanity CMS Cloud Database
           │
           │ (GROQ Query via @sanity/client)
           ▼
   src/sanity/client.ts
           │
           ▼
      src/App.tsx (Main Component)
           │
           ├───► ProjectsData ───► ProjectsSection (ProjectCard.tsx)
           ├───► SkillsData ─────► DynamicOrbitCarousel.tsx
           ├───► TimelineData ───► BentoAbout.tsx
           └───► ResumeData ─────► ResumeModal.tsx
```

1. **Querying Data**: During component mount (`useEffect`), `App.tsx` triggers a parallel asynchronous fetch using `Promise.all` calling the queries defined in `src/sanity/queries.ts`.
2. **CMS Fail-Safe / Fallback**: If the network is offline or the Sanity credentials fail, the application catches the error and renders fallback containers (`CMSStatusFallback`) for sections that rely on remote data, allowing the core website (Hero, Bio, Contact Form) to remain functional.
3. **Contact Submissions**: Form inputs from `ContactForm.tsx` are posted directly to the Web3Forms API endpoint `https://api.web3forms.com/submit`. Web3Forms forwards the submission as an email notification to the account linked to your access key.

---

## Database Schemas (CMS Fields)

To add content to the website using Sanity Studio, configure documents matching the following schemas:

### 1. Project Schema (`project`)
Used to register items shown in the cases/portfolio section.
- `title` (String, Required): Project name.
- `slug` (Slug, Required): Unique identifier derived from title.
- `description` (Text, Required): Short synopsis of the case.
- `longDescription` (Text, Required): Detailed deliverables list or case study description.
- `category` (Radio selection, Required): `frontend` (Frontend & UI), `fullstack` (Full-Stack Dev), or `creative` (Design Systems / Creative).
- `tags` (Array of Strings): Languages or packages used (e.g., `React`, `TypeScript`).
- `demoUrl` (URL): Direct link to the live website.
- `githubUrl` (URL): Repository link.
- `image` (Image, Hotspot enabled, Required): Main cover graphic.
- `highlights` (Array of Strings): Key outcomes or deliverables.
- `featured` (Boolean): Flag to highlight the case in the interface.

### 2. Skill Schema (`skill`)
Powers the orbit carousel and progress badges.
- `name` (String, Required): Name of the tool or language (e.g., `Node.js`).
- `level` (Number 0-100, Required): Self-assessed proficiency.
- `category` (Dropdown, Required): `frontend`, `backend` (Backend & DB), `languages` (Programming Languages), or `misc` (Other Skills).
- `icon` (SVG Image, Required): Icon representing the skill (SVG format required for crisp scaling).

### 3. Timeline Item Schema (`timelineItem`)
Fills out education and professional history inside the Bento components.
- `year` (String, Required): Date range (e.g., `2022 - 2026`).
- `role` (String, Required): Job title or degree.
- `company` (String, Required): Workplace or educational institution.
- `description` (Text, Required): Key details, projects, or accomplishments.
- `type` (Select, Required): `work` (Job) or `education` (School/University).

### 4. Resume Schema (`resume`)
- `title` (String, Required): Document name (e.g., `Joseph Umali Resume`).
- `pdfFile` (File, Required): PDF upload containing the CV.

---

## Environment Variables Reference

| Variable | Scope | Description | Default/Example |
| :--- | :--- | :--- | :--- |
| `VITE_SANITY_PROJECT_ID` | Client | Sanity project identifier to connect the client | `'i35fm0gr'` |
| `VITE_SANITY_DATASET` | Client | Target database dataset | `'production'` |
| `VITE_WEB3FORMS_ACCESS_KEY` | Client | Public token used to route contact submissions | `'your-web3forms-key'` |

---

## Available Scripts

Run these scripts from the repository directory context indicated.

### Root Folder Scripts (`Portfolio-Website/`)
| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` | Starts the local web dev server on port 3000 |
| `npm run build` | `vite build` | Compiles frontend assets into production bundles in `dist/` |
| `npm run preview` | `vite preview` | Previews the compiled production build locally |
| `npm run clean` | `rm -rf dist server.js` | Cleans previous build artifacts |
| `npm run lint` | `tsc --noEmit` | Performs TypeScript static code validation |

### Studio Folder Scripts (`Portfolio-Website/studio/`)
| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `sanity dev` | Starts the local CMS editor server on `http://localhost:3333` |
| `npm run build` | `sanity build` | Compiles the CMS dashboard assets into static HTML/JS |
| `npm run start` | `sanity start` | Previews the compiled CMS build locally |
| `npm run deploy` | `sanity deploy` | Builds and deploys the Sanity Studio to `joseph-umali-portfolio.sanity.studio` |

---

## Deployment

### Frontend Application (Vite App)
You can deploy the React frontend to modern hosting providers such as Vercel or Netlify.

#### Deploying to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` from the root directory.
3. Link to your project and configure build commands:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set the Environment Variables (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and `VITE_WEB3FORMS_ACCESS_KEY`) in the Vercel Project Dashboard.

#### Deploying to Netlify
1. Connect your repository to Netlify.
2. Select root folder for build. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables in the site settings dashboard.

### Headless CMS (Sanity Studio)
You can deploy the Sanity Studio interface directly to Sanity's free hosting:
```bash
cd studio
npm run deploy
```
This compiles the editor and prompts you to select a subdomain name (e.g., `https://joseph-umali-portfolio.sanity.studio`).

---

## Troubleshooting

### Sanity CORS Errors
**Symptom**: Local site loads, but browser console displays CORS errors when fetching data from Sanity.
**Solution**:
1. Log in to [Sanity Manage](https://www.sanity.io/manage).
2. Go to **API Settings** > **CORS Origins**.
3. Click **Add CORS Origin**.
4. Enter `http://localhost:3000` (and your production domain once deployed) and check **Allow Credentials**.
5. Save settings.

### Contact Form Not Submitting
**Symptom**: Sending messages displays an error indicator or logs server errors.
**Solution**:
1. Check that the `.env` file contains the correct variable name `VITE_WEB3FORMS_ACCESS_KEY`.
2. Confirm the access key is active by submitting a test directly to `https://api.web3forms.com/submit`.
3. Check Web3Forms dashboard to ensure form submission notifications are enabled.

---

## License

This project is licensed under the MIT License - see the LICENSE details or contact the author.

```
Copyright (c) 2026 Joseph Umali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
