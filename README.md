# create-pb-tririga-react-app

A CLI tool to scaffold modern TRIRIGA UX applications using React, TypeScript, and Vite.

## Usage

You don't need to install this package locally. You can run it directly using `npx` and replace `my-tririga-app` with your desired app name:

```bash
npx create-pb-tririga-react-app my-tririga-app
```

## Features

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (Fast HMR & Bundling)
- **UI Library**: ShadCN
- **Routing**: HashRouter (Compatible with TRIRIGA context paths)
- **Deployment**: Ready-to-use scripts for `tri-deploy`

## Getting Started with your new app

Once created:

1. `cd my-tririga-app`
2. Install pnpm `npm install -g pnpm`
3. Install dependencies `pnpm install`
4. Make your first deployment with `pnpm run build:deploy`