# Security Policy

## Supported Versions

We actively support and patch security issues on the following versions of StadiumGPT:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of StadiumGPT very seriously. If you find any security vulnerability in this project, please do NOT disclose it publicly. Instead, report it using the following procedure:

1. Send an email to **security@stadiumgpt.ai** detailing the vulnerability.
2. Include a description of the issue, steps to reproduce, and potential impact.
3. We will acknowledge receipt of your report within 48 hours.
4. We will coordinate a fix and release a patched version within 14 days of confirmation.

## Security Practices

StadiumGPT incorporates several defense-in-depth measures:
- **Strict Content Security Policy (CSP)**: Limits script execution and resource loading to trusted domains.
- **XSS Protection**: All user text inputs are sanitized on ingress to prevent script injection.
- **CSRF & SSRF Mitigation**: Enforces secure request flows and strict routing patterns.
- **No Unsafe Eval**: Code execution from strings is blocked at both the Next.js compile step and the browser layer.
