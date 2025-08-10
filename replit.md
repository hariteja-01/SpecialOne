# Overview

This is a romantic birthday experience web app built for Mansi from Hari. The application is a multi-screen interactive journey featuring a countdown timer, flirty quiz, gift reveals, love messages, and celebratory animations. It's designed as a static frontend React application using Vite, with beautiful animations powered by Framer Motion and a romantic theme throughout.

The app progresses through six distinct screens: countdown to birthday, romantic intro with music, interactive quiz, gift box reveals, personalized love messages, and a final celebration with confetti. Each screen is crafted to create an emotional and memorable experience.

## Recent Updates (August 10, 2025)
- Added programmatic romantic flute music using Web Audio API (Happy Birthday melody)
- Fixed countdown timer to properly sync with IST timezone for August 12, 2025 12:00 AM target
- Removed answer indicators from quiz questions to maintain surprise
- Added new ending options: "Repeat My Love Again", "Exit (Leave Website)" with loving goodbye message
- Implemented automatic music start on user interaction to comply with browser policies

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactive animations
- **State Management**: React's built-in useState and useEffect hooks for local component state
- **Font System**: Google Fonts integration (Dancing Script for romantic text, Poppins for body text)

## Component Structure
- **Screen-based Architecture**: Each major section is a separate React component (CountdownScreen, IntroScreen, FlirtyQuiz, etc.)
- **Shared Components**: Reusable UI elements like FloatingHearts, HeartCursor for consistent romantic theming
- **Progressive Experience**: App state manages navigation between screens with score tracking

## Build and Development
- **Development Server**: Vite dev server with hot module replacement
- **TypeScript Configuration**: Strict mode enabled with path aliases for clean imports
- **Asset Handling**: Support for static assets including romantic music files
- **Path Aliases**: Configured for @/components, @/lib, @/hooks for organized imports

## Backend Architecture (Minimal)
- **Express Server**: Lightweight Express.js server primarily for development and potential future API endpoints
- **Static Serving**: Serves the built React application in production
- **Development Setup**: Vite middleware integration for seamless development experience

## Styling System
- **Design System**: Consistent color palette with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Theme Variables**: Centralized theming through CSS variables for easy customization
- **Component Variants**: Class-variance-authority for consistent component styling patterns

# External Dependencies

## UI and Animation Libraries
- **@radix-ui/react-***: Comprehensive set of unstyled, accessible UI primitives
- **framer-motion**: Animation library for smooth transitions and interactive elements
- **react-confetti**: Confetti effects for celebration screens
- **embla-carousel-react**: Carousel functionality if needed for content display

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## Database (Configured but Unused)
- **Drizzle ORM**: PostgreSQL ORM setup for potential future data persistence
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **Database Schema**: Basic user table structure defined but not actively used

## Form and Data Handling
- **react-hook-form**: Form state management for quiz interactions
- **@hookform/resolvers**: Form validation integration
- **zod**: Schema validation library
- **date-fns**: Date manipulation for countdown functionality

## Development and Deployment
- **@replit/vite-plugin-***: Replit-specific plugins for development environment
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development server