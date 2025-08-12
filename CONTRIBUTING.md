# Contributing to YogA Website

Thank you for your interest in contributing to the YogA Residential Yoga School website! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

### Code Contributions
- Bug fixes and improvements
- New features and components
- Performance optimizations
- Accessibility enhancements

### Content Contributions
- Documentation improvements
- Translation support
- Photography and imagery
- User experience feedback

### Design Contributions
- UI/UX improvements
- Animation enhancements
- Mobile responsiveness
- Accessibility design

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   \`\`\`bash
   git clone https://github.com/yourusername/yoga-school-website.git
   \`\`\`
3. **Create a branch** for your contribution:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
4. **Make your changes** following our coding standards
5. **Test thoroughly** on different devices and browsers
6. **Submit a pull request** with a clear description

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful component and variable names
- Add comments for complex logic

### Component Structure
\`\`\`typescript
// components/example-component.tsx
"use client"

import { motion } from "framer-motion"
import type { ComponentProps } from "./types"

interface ExampleComponentProps extends ComponentProps {
  title: string
  interactive?: boolean
}

export default function ExampleComponent({ 
  title, 
  interactive = true,
  className = "" 
}: ExampleComponentProps) {
  return (
    <motion.div className={`base-styles ${className}`}>
      {/* Component content */}
    </motion.div>
  )
}
\`\`\`

### Animation Guidelines
- Use Framer Motion for complex animations
- Prefer `transform` and `opacity` for performance
- Add `will-change` for elements that animate frequently
- Respect user's motion preferences

### Accessibility Standards
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Add alt text for all images
- Test with screen readers

## 🎨 Design System

### Colors
Use our predefined color palette from `lib/data.ts`:
\`\`\`typescript
const colors = [
  "#582f0e", "#7f4f24", "#936639", "#a68a64", "#b6ad90",
  "#c2c5aa", "#a4ac86", "#656d4a", "#414833", "#333d29"
]
\`\`\`

### Typography
- Headings: Use semantic HTML (h1, h2, h3)
- Body text: Maintain readability with proper line height
- Interactive elements: Clear, actionable text

### Spacing
- Use Tailwind's spacing scale consistently
- Maintain visual hierarchy with proper margins/padding
- Ensure touch targets are at least 44px on mobile

## 🧪 Testing

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify mobile responsiveness
- Check accessibility with keyboard navigation
- Test particle effects performance

### Performance Testing
- Monitor Core Web Vitals
- Check animation frame rates
- Verify image optimization
- Test loading speeds

## 📝 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Accessibility requirements met
- [ ] Performance impact considered

### PR Description Template
\`\`\`markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Accessibility enhancement

## Testing
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Accessibility tested
- [ ] Performance verified

## Screenshots
Include screenshots for UI changes.

## Additional Notes
Any additional context or considerations.
\`\`\`

## 🐛 Bug Reports

When reporting bugs, please include:
- **Environment**: Browser, OS, device
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any JavaScript errors

## 💡 Feature Requests

For new features, please provide:
- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches
- **Additional context**: Mockups, examples, etc.

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in project documentation

## 📞 Questions?

- **GitHub Discussions**: For general questions
- **Issues**: For bug reports and feature requests
- **Email**: hello@yoga.example for direct contact

Thank you for helping make YogA website better for everyone! 🙏
