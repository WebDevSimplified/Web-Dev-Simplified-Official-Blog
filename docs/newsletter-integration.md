# Newsletter Integration Guide

## Overview

The blog integrates with ConvertKit for newsletter subscriptions using a sophisticated tracking system that manages subscriber state and prevents spam.

## Components

### ConvertkitForm.astro

Located in `src/components/ConvertkitForm.astro`

#### Functionality

- **Smart Display Logic**: Only shows newsletter form to non-subscribers
- **URL Parameter Tracking**: Handles `?fromNewsletter=true/false` parameters
- **Session Management**: Prevents showing form again in same session if closed
- **30-Day Re-engagement**: Re-shows form to subscribers after 30 days of inactivity

#### Key Features

##### Subscription State Management

```javascript
// Check if user came from newsletter link
const fromNewsletter = queryParams.get("fromNewsletter")

if (fromNewsletter === "true") {
  localStorage.setItem("subscribed-to-newsletter", true)
}

if (fromNewsletter === "false") {
  localStorage.removeItem("subscribed-to-newsletter")
  localStorage.removeItem("date-of-last-newsletter-link")
}
```

##### 30-Day Re-engagement Logic

```javascript
function dateWithinLast30Days(date) {
  const today = new Date()
  const timeDiff = Math.abs(today.getTime() - date.getTime())
  const diffDays = timeDiff / (1000 * 3600 * 24)
  return diffDays <= 30
}

// Remove subscription status if 30+ days since last newsletter click
if (
  dateStringOfLastNewsletterLink != null &&
  !dateWithinLast30Days(new Date(dateStringOfLastNewsletterLink))
) {
  localStorage.removeItem("subscribed-to-newsletter")
  localStorage.removeItem("date-of-last-newsletter-link")
}
```

##### Form Display Conditions

The newsletter form only appears when:

- No existing form is on page
- User is not marked as subscribed
- User hasn't closed form in current session

#### ConvertKit Configuration

- **Form ID**: `23989b36d2`
- **Script URL**: `https://web-dev-simplified.ck.page/23989b36d2/index.js`
- **Form Type**: Sticky bar that appears at bottom of page

## Newsletter Link Tracking

### URL Parameters

- `?fromNewsletter=true` - User came from newsletter, mark as subscribed
- `?fromNewsletter=false` - User unsubscribed, remove tracking

### Analytics Integration

Newsletter subscription status is tracked in analytics:

```javascript
// PageAnalytics.astro
plausible("pageview", {
  props: {
    theme,
    readingWidth,
    subscribedToNewsletter, // Tracks subscription status
  },
})
```

## Local Storage Keys

The newsletter system uses these localStorage keys:

- `subscribed-to-newsletter` - Boolean indicating subscription status
- `date-of-last-newsletter-link` - Date of last newsletter link click

## Session Storage Keys

- `form-closed` - Boolean indicating user closed form in current session

## Implementation Notes

### MutationObserver Usage

The system uses MutationObserver to detect when ConvertKit form is added to DOM:

```javascript
const observer = new MutationObserver(entries => {
  entries.forEach(entry => {
    const formElem = [...entry.addedNodes].find(node => {
      if (node.matches == null) return
      return node.matches(".formkit-sticky-bar")
    })
    if (formElem == null) return

    // Handle form appearance and cleanup
  })
})
```

### Privacy Considerations

- Uses localStorage for persistence across sessions
- Automatically cleans up old subscription data after 30 days
- Respects user choice to close form
- No personal data stored, only subscription status

## Testing Newsletter Integration

### Test Scenarios

1. **First Visit**: Form should appear for new users
2. **Subscribed User**: Form should not appear if `subscribed-to-newsletter=true`
3. **Form Closed**: Form should not appear again in same session
4. **30-Day Reset**: Subscription status should reset after 30 days
5. **Newsletter Link**: `?fromNewsletter=true` should mark as subscribed

### Testing URLs

```
# Mark as subscribed
https://localhost:4321/?fromNewsletter=true

# Mark as unsubscribed
https://localhost:4321/?fromNewsletter=false
```

## Troubleshooting

### Form Not Appearing

Check browser console for:

- ConvertKit script loading errors
- localStorage values
- Session storage values

### Form Appearing When It Shouldn't

Clear localStorage and sessionStorage:

```javascript
localStorage.removeItem("subscribed-to-newsletter")
localStorage.removeItem("date-of-last-newsletter-link")
sessionStorage.removeItem("form-closed")
```
