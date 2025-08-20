# Web Dev Simplified Blog - Documentation

## Quick Navigation

This documentation is organized into focused modules for efficient reference:

- **[README.md](README.md)** - This overview and quick start guide
- **[project-overview.md](project-overview.md)** - Technology stack and architecture
- **[article-creation-guide.md](article-creation-guide.md)** - Complete guide for creating new articles
- **[component-development-guide.md](component-development-guide.md)** - Building interactive components
- **[styling-and-theming.md](styling-and-theming.md)** - CSS system and theming guide
- **[build-and-deployment.md](build-and-deployment.md)** - Build process and deployment
- **[content-management.md](content-management.md)** - Tags, search, RSS, and content organization
- **[troubleshooting.md](troubleshooting.md)** - Common issues and solutions
- **[advanced-features.md](advanced-features.md)** - Analytics, performance, and accessibility

## Project Overview

The Web Dev Simplified Blog is a static site built with Astro that focuses on web development education. The blog follows a strict Monday release schedule and is designed to provide high-quality technical content with interactive examples and comprehensive explanations.

### Key Characteristics

- **Release Schedule**: Articles are published every Monday (all dates in the codebase follow this pattern)
- **Content Focus**: Web development tutorials, explanations, and technical discussions
- **Interactive Learning**: Heavy use of interactive components to demonstrate concepts
- **Author**: Kyle Cook (default author for all posts)
- **Target Audience**: Web developers of all skill levels

## Quick Start

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Creating a New Article

1. Create directory: `src/pages/YYYY-MM/article-slug/`
2. Add `index.mdx` with proper frontmatter
3. Ensure date is a Monday
4. Add interactive components as needed

### Most Common Tasks

- **New Article**: See [article-creation-guide.md](article-creation-guide.md)
- **Interactive Component**: See [component-development-guide.md](component-development-guide.md)
- **Styling Issues**: See [styling-and-theming.md](styling-and-theming.md)
- **Build Problems**: See [troubleshooting.md](troubleshooting.md)

## Architecture Summary

- **Static Site Generator**: Astro with component islands
- **Content Format**: MDX (Markdown + JSX)
- **Interactive Components**: React (only where needed)
- **Styling**: CSS custom properties with theming
- **Deployment**: Netlify with automatic builds

For detailed information, see the specific documentation files linked above.
