# Development Roadmap & TODOs

## Overview

This document tracks planned improvements and known TODOs throughout the codebase. These represent future enhancements and technical debt items.

## High Priority TODOs

### Content Management System Migration

**Location**: `astro.config.mjs`, `src/pages/rss.xml.js`

#### Move to Astro Content Collections

```javascript
// TODO: Move over to the content folder
// TODO: Make work with Content folders
```

**Benefits**:

- Better type safety for frontmatter
- Improved content validation
- Enhanced development experience
- Better performance with content queries

**Impact**: Major refactoring of content structure

### TypeScript Integration

**Location**: `astro.config.mjs`

```javascript
// TODO: Add TS Support
```

**Scope**:

- Convert JavaScript files to TypeScript
- Add comprehensive type definitions
- Improve development experience
- Better error catching

### Official Shiki Integration

**Location**: `astro.config.mjs`

```javascript
// TODO: Add official Shiki integration when line highlighting is supported
```

**Current State**: Using custom Shiki plugin for line highlighting
**Future**: Migrate to official Astro Shiki integration when feature parity achieved

## Medium Priority TODOs

### Blog Post Enhancements

**Location**: `src/components/BlogPost.astro`

#### Author and Navigation

```html
<!-- TODO: Add author and next/previous buttons. Also, maybe add a scroll to top button as well -->
```

**Features to Add**:

- Author bio section
- Previous/Next article navigation
- Scroll to top button
- Reading progress indicator

#### Pagination System

```html
<!-- TODO: Add Pagination -->
```

**Requirements**:

- Homepage article pagination
- Archive page navigation
- Category-based pagination
- Search result pagination

#### Social Share Images

```html
<!-- TODO: Add social share images (https://joeprevite.com/create-a-twitter-card-for-your-blog) -->
```

**Implementation Options**:

- Dynamic image generation with Puppeteer
- ImageMagick integration
- Canvas-based image creation
- Static template images

### URL State Management

**Location**: `src/components/BlogPost.astro`

```html
<!-- TODO: Add search/tags to URL to make the back button work better -->
```

**Features**:

- URL parameters for search queries
- Tag filter state in URL
- Browser back button support
- Shareable filtered states

### Image Optimization

**Location**: `astro.config.mjs`

```javascript
// TODO: Optimize/Shrink Images
// TODO: Implement experimental assets integration
```

**Enhancements**:

- Automatic image compression
- Modern format conversion (WebP, AVIF)
- Responsive image generation
- Lazy loading optimization

## Low Priority TODOs

### Analytics Enhancements

**Location**: `astro.config.mjs`

```javascript
// TODO: Add analytic conversion tracking (for things like newsletter signups)
```

**Features**:

- Newsletter conversion funnels
- Content engagement tracking
- Goal completion tracking
- A/B testing capabilities

### Plugin System Updates

**Location**: `astro.config.mjs`

```javascript
// TODO: Check to see if my plugins can be replaced with official integrations
```

**Review Areas**:

- YouTube embed plugin → Official integration
- Responsive images → Astro assets
- Custom Shiki → Official Shiki

### Custom 404 Page

**Location**: `src/components/BlogPost.astro`

```html
<!-- TODO: Add custom 404 page -->
```

**Features**:

- Branded 404 design
- Popular articles suggestions
- Search functionality
- Navigation back to homepage

## Component-Specific TODOs

### Value Chart Component

**Location**: `src/blogComponents/referenceVsValue/ValueChart.astro`

```javascript
// TODO: Hopefully eventually be able to do this without eval
```

**Security Concern**: Remove eval usage for safer code execution

### Custom Events Article

**Location**: `src/pages/2022-04/js-custom-events/index.mdx`

```javascript
// TODO: Double click happened. Trigger custom event.
```

**Content**: Complete interactive example implementation

### Learning to Code Article

**Location**: `src/pages/2021-08/how-to-learn-to-code-with-comments/index.mdx`

Multiple TODO comments for educational content completion

## Implementation Timeline

### Phase 1: Content Migration (Q1 2025)

- [ ] Migrate to Astro Content Collections
- [ ] Update RSS feed generation
- [ ] Test content validation

### Phase 2: TypeScript Integration (Q2 2025)

- [ ] Convert core components to TypeScript
- [ ] Add type definitions
- [ ] Update build process

### Phase 3: Feature Enhancements (Q3 2025)

- [ ] Implement pagination
- [ ] Add author sections
- [ ] Create social share images
- [ ] URL state management

### Phase 4: Performance & Polish (Q4 2025)

- [ ] Image optimization
- [ ] Analytics enhancements
- [ ] Custom 404 page
- [ ] Plugin system review

## Contributing Guidelines

### Adding New TODOs

When adding TODOs to the codebase:

```javascript
// TODO: [Priority] Brief description of what needs to be done
// Context: Why this TODO exists
// Impact: What changes when this is completed
```

### TODO Categories

- **CRITICAL**: Security or functionality issues
- **HIGH**: User experience improvements
- **MEDIUM**: Developer experience enhancements
- **LOW**: Nice-to-have features

### Completing TODOs

1. Create GitHub issue for tracking
2. Implement solution
3. Test thoroughly
4. Remove TODO comment
5. Update this roadmap document

## Technical Debt

### Code Quality Issues

- Remove `eval` usage in components
- Improve error handling
- Add comprehensive testing
- Enhance accessibility

### Performance Optimizations

- Bundle size analysis
- Lazy loading improvements
- Cache optimization
- CDN integration

### Security Enhancements

- Content Security Policy refinement
- Input validation improvements
- Dependency security audits
- HTTPS enforcement

## Monitoring Progress

### Metrics to Track

- TODO completion rate
- Code quality scores
- Performance benchmarks
- User experience metrics

### Regular Reviews

- Monthly TODO priority assessment
- Quarterly roadmap updates
- Annual architecture review
- Continuous dependency updates
