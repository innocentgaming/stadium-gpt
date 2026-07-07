# Contributing to StadiumGPT

Thank you for your interest in contributing to StadiumGPT! As the AI Operating System for Smart Stadiums at the FIFA World Cup 2026, we maintain high standards for code quality, security, and accessibility.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/innocentgaming/stadium-gpt.git
   cd stadium-gpt
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Standards

We enforce strict quality controls:
- **TypeScript**: All files must use strict TypeScript. No `any` types.
- **Linting**: Ensure `npm run lint` passes before committing.
- **Testing**: Add tests for any new features or bug fixes. Run them using `npm test`. We aim for 95%+ coverage.
- **Accessibility**: All UI changes must adhere to WCAG 2.2 AA standards. Use semantic HTML, keyboard navigation, and proper ARIA attributes.
- **Security**: Never expose secrets. Validate inputs, sanitize data, and follow standard security practices.

## Submitting Pull Requests

1. Commit your changes. We use `commitlint` to enforce structured commit messages (e.g., `feat(ui): add screen-reader announcement`).
2. Push your branch to GitHub.
3. Open a Pull Request against the `main` branch.
4. Fill out the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).
5. Ensure the CI pipeline passes.

Thank you for making StadiumGPT better!
