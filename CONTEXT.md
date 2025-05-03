# Project Context

## Project Overview

This project is a personal portfolio website built using modern web technologies. It includes features such as internationalization, a custom UI library, and server-side rendering. The project is structured to support scalability and maintainability.

## Key Technologies

- **Next.js**: For server-side rendering and routing.
- **React**: For building user interfaces.
- **Tailwind CSS**: For styling.
- **TypeScript**: For type safety.
- **Docker**: For containerization.

## Folder Structure

- **dictionaries/**: Contains JSON files for internationalization (e.g., `en-US.json`, `pt-BR.json`).
- **public/**: Static assets like images.
- **src/**: Main source code, including middleware, app pages, components, and utility functions.
- **app/**: Houses the main application logic, including layouts and pages.
- **components/**: Reusable UI components.
- **lib/**: Utility functions and helpers.

## Using ShadCN UI Components

This project utilizes ShadCN UI components for building reusable and accessible UI elements. These components are located in the `src/components/ui/` directory.

### Key Features

- **Accessibility**: Built with accessibility in mind.
- **Customizability**: Easily customizable to match the project's design system.
- **Performance**: Optimized for fast loading times and responsiveness.
- **Documentation**: Comprehensive guides and examples for easy integration.

### Example Usage

To use a ShadCN UI component in your project:

```tsx
import { Button } from '@/components/ui/button';

export default function Example() {
  return <Button>Click Me</Button>;
}
```

### Documentation

Refer to the [ShadCN UI documentation](https://ui.shadcn.com/) for more details on available components and their usage.

## Development Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Runs the production server.
- `npm run lint`: Lints the codebase.

## Debugging

A VS Code launch configuration is available to debug the Node.js server in development mode.

## Formatting

Prettier is configured for consistent code formatting. Format-on-save is enabled in VS Code.

## Recommended Extensions

- **Prettier - Code formatter**: For consistent code formatting.

## Author

This project is maintained by Rafael, who is using Linux as the development environment.
