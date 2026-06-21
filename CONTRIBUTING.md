# Contributing to webadda.in

Thank you for your interest in contributing to webadda.in! This document outlines the development workflow and conventions.

## Development Workflow

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start the development server**: `npm run dev`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
5. **Make your changes**: Ensure you follow the project's coding style (TypeScript, Tailwind CSS, Framer Motion).
6. **Test your changes**: Run `npm run build` to verify the production build succeeds without errors.
7. **Commit your changes**: Follow the commit message conventions below.
8. **Push to the branch**: `git push origin feature/your-feature-name`
9. **Submit a Pull Request**.

## Commit Message Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to automatically generate changelogs and maintain a readable history.

Format: `<type>(<scope>): <subject>`

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Examples
- `feat(core): add JavaScript disabled fallback experience`
- `fix(contact): resolve WhatsApp redirection bug`
- `chore(security): harden CSP directives for production`

## Code Style

- Use **TypeScript** strictly. Avoid `any` or `as any` type casting.
- Use **Tailwind CSS** for styling.
- Use **Framer Motion** for animations. Respect `prefers-reduced-motion`.
- Ensure all interactive elements are accessible via keyboard and screen readers.
