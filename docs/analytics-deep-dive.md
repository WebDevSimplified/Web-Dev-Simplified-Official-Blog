# Analytics Deep Dive

## Overview

The blog uses a sophisticated analytics setup with Plausible Analytics, including custom tracking and UTM parameter cleanup.

## Analytics Architecture

### Custom Plausible Setup

Located in `src/components/BaseHead.astro`

#### Custom Domain and API

```javascript
<script
  defer
  data-domain={import.meta.env.PROD ? "blog.webdevsimplified.com" : "testing"}
  data-api="https://royal-surf-e76e.kyle-0ed.workers.dev/api/e"
  src={`https://royal-surf-e76e.kyle-0ed.workers.dev/js/script.manual${
    import.meta.env.PROD ? "" : ".local"
  }.js`}
></script>
```

#### Features

- **Custom Proxy**: Uses Cloudflare Workers for analytics proxy
- **Environment Awareness**: Different tracking for development vs production
- **Manual Mode**: Uses manual script for custom event tracking

### Page Analytics Component

Located in `src/components/PageAnalytics.astro`

#### Custom Properties Tracking

Each pageview tracks user preferences:

```javascript
plausible("pageview", {
  props: {
    theme, // "light" or "dark"
    readingWidth, // "narrow", "default", or "wide"
    subscribedToNewsletter, // Newsletter subscription status
  },
})
```

#### UTM Parameter Cleanup

Automatically removes UTM parameters from URL after tracking:

```javascript
Array.from(queryParams.keys()).forEach(key => {
  if (key.startsWith("utm_")) {
    queryParams.delete(key)
    shouldClean = true
  }
})

if (shouldClean) {
  // Update URL without UTM parameters
  history.replaceState(null, null, cleanedURL)
}
```

## Custom Event Tracking

### Available Events

The analytics system can track custom events:

```javascript
// Newsletter signup tracking
window.plausible("Newsletter Signup", {
  props: { location: "sticky-bar" },
})

// Social sharing
window.plausible("Social Share", {
  props: {
    platform: "twitter",
    article: "article-slug",
  },
})

// Theme changes
window.plausible("Theme Change", {
  props: {
    from: "light",
    to: "dark",
  },
})
```

## Analytics Configuration

### Environment Variables

- **Production**: `blog.webdevsimplified.com`
- **Development**: `testing`

### Cloudflare Workers Proxy

- **API Endpoint**: `https://royal-surf-e76e.kyle-0ed.workers.dev/api/e`
- **Script URL**: `https://royal-surf-e76e.kyle-0ed.workers.dev/js/script.manual.js`
- **Local Script**: `script.manual.local.js` for development

## Privacy Features

### No Personal Data Collection

- No cookies stored
- No personal identifiers tracked
- Only aggregate behavior data

### UTM Parameter Handling

- UTM parameters captured for attribution
- Immediately removed from URL for privacy
- User doesn't see tracking parameters in browser

### Consent-Free Tracking

- GDPR compliant without consent banners
- No personal data processing
- Aggregate analytics only

## Analytics Dashboard

### Key Metrics Tracked

1. **Page Views**: Total and unique visitors
2. **Popular Content**: Most viewed articles
3. **User Preferences**: Theme and reading width distribution
4. **Newsletter Performance**: Subscription conversion rates
5. **Traffic Sources**: Referral and search traffic
6. **Device/Browser**: Technical statistics

### Custom Properties Analysis

- **Theme Usage**: Light vs dark mode preference
- **Reading Width**: User layout preferences
- **Newsletter Status**: Conversion funnel analysis

## Implementation Notes

### Manual Script Loading

The blog uses manual Plausible script for:

- Custom event tracking capability
- Better control over when analytics fire
- Custom properties on pageviews

### Performance Considerations

- Analytics script loads with `defer` attribute
- Non-blocking implementation
- Minimal impact on page load

## Testing Analytics

### Development Environment

```javascript
// Development uses "testing" domain
data-domain="testing"
```

### Verifying Tracking

1. Open browser dev tools
2. Check Network tab for requests to analytics endpoint
3. Verify pageview events fire on navigation
4. Test custom events in console

### Custom Event Testing

```javascript
// Test custom events in browser console
window.plausible("Test Event", {
  props: { source: "manual-test" },
})
```

## Troubleshooting

### Analytics Not Loading

1. Check network requests for analytics script
2. Verify Cloudflare Workers endpoint is accessible
3. Check browser console for JavaScript errors

### Events Not Firing

1. Verify `window.plausible` function exists
2. Check network tab for event requests
3. Ensure proper event syntax

### Development vs Production

- Development uses local script variant
- Production uses standard script
- Domain changes between environments
