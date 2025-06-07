# Contributing Guide

Thank you for your interest in contributing to `@wolforest/jscommon`! We welcome all forms of contributions, including but not limited to:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code fixes
- ✨ New features

## 🚀 Quick Start

### Development Environment Requirements

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### Local Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/jscommon.git
   cd jscommon
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build the project**
   ```bash
   pnpm build
   ```

4. **Run tests**
   ```bash
   pnpm test
   ```

5. **Start development mode**
   ```bash
   pnpm dev
   ```

## 📋 Project Structure

```
jscommon/
├── packages/
│   └── core/                 # Core package
│       ├── src/
│       │   ├── lang/        # Language processing tools
│       │   ├── net/         # Network tools
│       │   ├── storage/     # Storage tools
│       │   ├── style/       # Style tools
│       │   └── debug/       # Debug tools
│       └── test/            # Test files
├── examples/                # Example projects
│   ├── react-demo/
│   ├── vue-demo/
│   └── taro-demo/
└── docs/                    # Documentation
```

## 🐛 Reporting Bugs

Before reporting a bug, please check if the same issue already exists in [Issues](https://github.com/wolforest/jscommon/issues).

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of what the bug is.

**Steps to Reproduce**
1. Execute '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Actual Behavior**
A clear and concise description of what actually happened.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.17.0]
- Package version: [e.g. 1.0.0]
- Browser: [e.g. Chrome 91, Safari 14]

**Additional Context**
Add any other context about the problem here.
```

## 💡 Feature Requests

We welcome feature requests! Please submit them through [Issues](https://github.com/wolforest/jscommon/issues) and use the `enhancement` label.

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature you'd like to see.

**Problem Statement**
Describe the problem this feature would solve.

**Proposed Solution**
Describe the solution you'd like.

**Alternatives Considered**
Describe any alternative solutions you've considered.

**Additional Context**
Add any other context or screenshots about the feature request.
```

## 🔧 Code Contribution

### Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Write code**
   - Follow existing code style
   - Add necessary tests
   - Ensure all tests pass

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Fill out the PR template
   - Link related issues
   - Wait for code review

### Code Standards

#### Naming Conventions
- **File names**: Use PascalCase, e.g. `ArrayUtil.ts`
- **Class names**: Use PascalCase, e.g. `ArrayUtil`
- **Method names**: Use camelCase, e.g. `isEmpty`
- **Constants**: Use UPPER_SNAKE_CASE, e.g. `DEFAULT_VALUE`

#### Code Style
- Use TypeScript
- Each utility class should have static methods
- Add complete JSDoc comments
- Keep functions simple and focused

#### Example Code Structure
```typescript
/**
 * Array utility class
 */
export class ArrayUtil {
  /**
   * Check if array is empty
   * @param arr - Array to check
   * @returns true if array is empty, false otherwise
   * @example
   * ```typescript
   * ArrayUtil.isEmpty([]); // true
   * ArrayUtil.isEmpty([1, 2, 3]); // false
   * ```
   */
  static isEmpty<T>(arr: T[]): boolean {
    return !arr || arr.length === 0;
  }
}
```

### Testing Standards

- Every new feature must include tests
- Test files are located in `packages/core/test/` directory
- Use Vitest as the testing framework
- Test coverage should be maintained above 80%

#### Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { ArrayUtil } from '../src/lang/ArrayUtil';

describe('ArrayUtil', () => {
  describe('isEmpty', () => {
    it('should return true for empty array', () => {
      expect(ArrayUtil.isEmpty([])).toBe(true);
    });

    it('should return false for non-empty array', () => {
      expect(ArrayUtil.isEmpty([1, 2, 3])).toBe(false);
    });
  });
});
```

### Commit Message Standards

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Type Description
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `test`: Test related changes
- `chore`: Build process or auxiliary tool changes

#### Examples
```
feat(lang): add StringUtil.truncate method

Add truncate method to StringUtil for string truncation with ellipsis support.

Closes #123
```

## 📝 Documentation Contribution

Documentation is equally important! You can:

- Improve existing documentation
- Add usage examples
- Translate documentation
- Fix documentation errors

## 🔍 Code Review

All Pull Requests require code review:

- At least one maintainer approval is required
- Ensure all CI checks pass
- Address all review comments

## 📦 Release Process

Project maintainers handle version releases:

1. Update version number
2. Update CHANGELOG.md
3. Create Git tag
4. Publish to npm

## 🤝 Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a friendly community environment.

## ❓ Getting Help

If you have any questions, you can get help through:

- Check the [documentation](https://github.com/wolforest/jscommon#readme)
- Search existing [Issues](https://github.com/wolforest/jscommon/issues)
- Create a new Issue
- Join our discussion group

## 🙏 Acknowledgments

Thanks to all the developers who have contributed to this project!

---

Thank you again for your contributions! 🎉 