---
sidebar_position: 1
title: "Alert Box"
description: "Documentation for Alert_Box NPM package"
---

# Alert Box

A lightweight, zero-dependency TypeScript library for displaying alert dialogs, confirm dialogs, and toast notifications in web applications.


## Installation

```bash
npm install @ceygenic/test
```

## Usage

### Basic Alert

```typescript
import { showAlert } from '@ceygenic/test';

// Simple alert
await showAlert({
  message: 'This is an alert message'
});

// Alert with title and type
await showAlert({
  title: 'Success!',
  message: 'Your action was completed successfully.',
  type: 'success'
});
```

### Confirm Dialog

```typescript
import { showConfirm } from '@ceygenic/test';

const confirmed = await showConfirm({
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item?',
  type: 'warning',
  okText: 'Delete',
  cancelText: 'Cancel'
});

if (confirmed) {
  // User clicked OK
  console.log('Item deleted');
} else {
  // User clicked Cancel or pressed ESC
  console.log('Deletion cancelled');
}
```

### Toast Notifications

```typescript
import { showToast } from '@ceygenic/test';

// Auto-dismissing toast (default: 3000ms)
showToast({
  message: 'Settings saved successfully!',
  type: 'success'
});

// Sticky toast (doesn't auto-dismiss)
const closeToast = showToast({
  message: 'Processing...',
  type: 'info',
  durationMs: 0
});

// Manually close the toast
closeToast();

// Custom duration
showToast({
  message: 'Custom duration toast',
  durationMs: 5000
});
```

### Using the AlertBox Class Directly

```typescript
import { AlertBox } from '@ceygenic/test';

// Class-based API
await AlertBox.alert({
  message: 'Alert message',
  type: 'info'
});

const result = await AlertBox.confirm({
  message: 'Confirm action?'
});

const closeToast = AlertBox.toast({
  message: 'Toast message',
  type: 'success'
});
```

## API Reference

### `showAlert(options: AlertBoxOptions): Promise<void>`

Displays an alert dialog and resolves when the user clicks OK or closes the dialog.

### `showConfirm(options: AlertBoxOptions): Promise<boolean>`

Displays a confirmation dialog. Returns `true` if the user clicks OK, `false` if they click Cancel or close the dialog.

### `showToast(options: ToastOptions): () => void`

Displays a toast notification. Returns a function to manually close the toast.

### `AlertBoxOptions`

```typescript
interface AlertBoxOptions {
  title?: string;                    // Dialog title (optional)
  message: string | HTMLElement;      // Dialog message (required)
  type?: 'info' | 'success' | 'warning' | 'error';  // Alert type (default: 'info')
  okText?: string;                   // OK button text (default: 'OK')
  cancelText?: string;                // Cancel button text (default: 'Cancel')
  showCancel?: boolean;               // Show cancel button (default: false for alert, true for confirm)
  closeOnEsc?: boolean;               // Close on ESC key (default: true)
  closeOnBackdrop?: boolean;          // Close when clicking backdrop (default: true)
}
```

### `ToastOptions`

```typescript
interface ToastOptions {
  message: string | HTMLElement;      // Toast message (required)
  type?: 'info' | 'success' | 'warning' | 'error';  // Toast type (default: 'info')
  durationMs?: number;                // Auto-dismiss duration in ms (default: 3000, 0 = sticky)
}
```

### Available Types

The `type` option accepts one of the following values:
- `'info'` - Default informational alert
- `'success'` - Success/positive alert
- `'warning'` - Warning alert
- `'error'` - Error/negative alert

The alert type determines the visual style and icon of the dialog or toast.

## Styling

The library uses CSS classes prefixed with `ab-` for styling. You can customize the appearance by adding your own CSS:

```css
.ab-overlay {
  /* Overlay styles */
}

.ab-dialog {
  /* Dialog container styles */
}

.ab-dialog.ab-info {
  /* Info dialog styles */
}

.ab-dialog.ab-success {
  /* Success dialog styles */
}

.ab-dialog.ab-warning {
  /* Warning dialog styles */
}

.ab-dialog.ab-error {
  /* Error dialog styles */
}

.ab-toast {
  /* Toast styles */
}
```

## Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Clean Build Artifacts

```bash
npm run clean
```

## Browser Support

Works in all modern browsers that support:
- ES2019 features
- DOM APIs
- Promises

## License

MIT

## Author

Ceygenic <dev@ceygenic.com>