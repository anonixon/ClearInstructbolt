# Button Component

A reusable button component that follows the application's design system.

## Features

- Multiple variants (primary, secondary, outline, text)
- Different sizes (small, medium, large)
- Loading state
- Disabled state
- Customizable via className prop
- Fully accessible
- TypeScript support

## Usage

```tsx
import Button from '@/components/common/Button';

// Basic usage
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>

// With different variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="text">Text Button</Button>

// With different sizes
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>

// With loading state
<Button loading>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'text' | 'primary' | The visual style variant of the button |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size of the button |
| disabled | boolean | false | Whether the button is disabled |
| loading | boolean | false | Whether the button is in a loading state |
| className | string | '' | Additional CSS classes to apply |
| onClick | (event: React.MouseEvent<HTMLButtonElement>) => void | undefined | Click handler |
| children | React.ReactNode | required | The content of the button |

## Styling

The component uses CSS Modules for styling. The styles are defined in `styles.module.css`.
You can override the default styles by passing a className prop.

## Accessibility

- Uses proper ARIA attributes
- Handles disabled state correctly
- Maintains focus states
- Keyboard navigable

## Examples

### Primary Button
```tsx
<Button variant="primary" onClick={() => console.log('clicked')}>
  Submit
</Button>
```

### Loading Button
```tsx
<Button loading onClick={() => console.log('clicked')}>
  Processing...
</Button>
```

### Disabled Button
```tsx
<Button disabled onClick={() => console.log('clicked')}>
  Cannot Click
</Button>
```

## Best Practices

1. Use meaningful text for button labels
2. Use loading state for async operations
3. Provide feedback for user interactions
4. Use appropriate variants for different actions:
   - Primary: Main actions
   - Secondary: Alternative actions
   - Outline: Less prominent actions
   - Text: Subtle actions

## Contributing

When modifying this component:
1. Update tests if behavior changes
2. Document new props or features
3. Follow the established styling patterns
4. Ensure accessibility is maintained 