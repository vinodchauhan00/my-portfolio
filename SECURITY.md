# Security Policy

## Supported versions

Only the latest version on the `main` branch receives security fixes.

## Reporting a vulnerability

Please do not open a public issue for security problems.

Use the **Report a vulnerability** button under the **Security** tab of this
repository to send a private report. Include:

- A short description of the problem
- Steps to reproduce it
- The possible impact

You can expect a reply within a few days. Once the issue is fixed, it will be
mentioned in the release notes.

## Good practices for this project

- Never commit real secrets. Keep them in `server/.env`, which must stay out of Git.
- Use `server/.env.example` only for placeholder values.
- Keep dependencies updated.