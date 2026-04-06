# Nilkanth Enterprises - Neel Wood Landing Page

A multi-page React landing page for **Nilkanth Enterprises**, a premium custom furniture manufacturer based in Gujarat, India. The brand operates under **Neel Wood**, their factory-direct furniture line.

## Overview

This website serves as the digital presence for a furniture business specializing in:
- **Custom furniture design and manufacturing**
- **Sofa repair and restoration services**
- **Commercial office solutions**
- **Full home renovation services**

The business has multiple showrooms across Gujarat (Songadh, Vyara, Bardoli) and operates their own factory in Vyara under the "Neel Wood" brand.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router DOM |
| Animations | Framer Motion |
| SEO | React Helmet Async |
| Icons | React Icons (FaFacebookF, FaInstagram, FaWhatsapp) |
| Styling | CSS Modules |

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/         # Navigation header with mobile menu
│   ├── Hero/           # Hero section component
│   ├── SEO.tsx         # SEO meta tags component
│   └── ui/             # Basic UI components (Button, Container, Logo, etc.)
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── ProductsPage.tsx
│   ├── PackagesPage.tsx
│   ├── ProjectsPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── sections/            # Main content sections
│   ├── Contact.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── NeelWoodAdvantage.tsx
│   ├── Packages.tsx
│   ├── ProblemSolution.tsx
│   ├── Products.tsx
│   ├── Services.tsx
│   └── WhyChooseUs.tsx
├── data/
│   └── content.ts      # Centralized content/SEO data
├── hooks/
│   └── useConfig.ts     # Configuration hook
└── assets/              # Images and static assets
```

## Pages

1. **Home** (`/`) - Main landing page with all sections
2. **Services** (`/services`) - Detailed services offered
3. **Products** (`/products`) - Product catalog
4. **Packages** (`/packages`) - Furniture packages
5. **Projects** (`/projects`) - Portfolio of completed projects
6. **About** (`/about`) - Business history and team
7. **Contact** (`/contact`) - Contact form and locations

## Key Sections

- **Hero** - Main call-to-action with factory-direct messaging
- **ProblemSolution** - Addresses common furniture buying pain points
- **NeelWoodAdvantage** - Unique selling propositions
- **Services** - Four main services with detailed features
- **Products** - Beds, cupboards, bedroom sets
- **WhyChooseUs** - Trust-building section
- **Contact** - Interactive contact form
- **FinalCTA** - Closing call-to-action
- **Footer** - Navigation, locations, social links

## Business Information

- **Company**: Nilkanth Enterprises
- **Factory Brand**: Neel Wood
- **Founded**: 2024
- **Owners**: Harshil Dave, Akash Mistry, Manoj Sonwane

### Locations

| City | Branch Type | Address |
|------|-------------|---------|
| Songadh | Branch | Nr. Sarthak Hospital, Above PNB Bank |
| Vyara | Branch | Shri Villa, Nr. Sonarwadi, Mochiwad |
| Vyara | Factory | Nr. HP Petrol Pump, Opp. KIA Showroom |
| Bardoli | Showroom | Lal Bahadur Shastri Rd, Above Vishal Dining |

### Services Offered

1. **Premium Sofa Repair & Cleaning** - Restoration and deep cleaning
2. **Bespoke Furniture Design** - Custom furniture manufacturing
3. **Office & Commercial Solutions** - Bulk commercial orders
4. **Full Home Renovation** - Complete home furnishing

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Design Features

- Responsive design for all screen sizes
- Smooth animations using Framer Motion
- SEO-optimized with meta tags
- Mobile-friendly navigation with hamburger menu
- CSS Modules for scoped styling
- Centralized content management via `content.ts`

## License

This project is private and owned by Nilkanth Enterprises.