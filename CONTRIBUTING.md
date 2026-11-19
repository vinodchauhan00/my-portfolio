# Contributing

Thanks for your interest in this project! Suggestions and fixes are welcome.

## Getting started

1. Fork this repository and clone your fork.
2. Install dependencies for both client and server:

```bash
npm run install:all
```

3. Copy `server/.env.example` to `server/.env` and fill in your own values.
4. Start the apps in two terminals:

```bash
npm run dev:server
npm run dev:client
```

## Making changes

- Create a new branch from `main` for every change.
- Keep each pull request small and focused on one thing.
- Write a clear commit message, for example `Fix navbar link on mobile`.
- Make sure the app still builds before you open a PR:

```bash
npm run build
```

## Pull requests

- Describe what you changed and why.
- Link the related issue if there is one.
- Add a screenshot if you changed the UI.
