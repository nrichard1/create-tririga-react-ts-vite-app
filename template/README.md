# TRIRIGA React App Template

This is a template for building IBM TRIRIGA UX applications using React, TypeScript, and Vite.

## Getting Started

1.  **Install pnpm** (If not already installed)
    ```
    npm install -g pnpm
    ```

2.  **Install Dependencies**
    ```
    pnpm install
    ```
    

## Deployment

To deploy to a TRIRIGA environment:

1.  **Install Depoyment Tool** (If not already installed globally)
    ```
    npm install -g @tririga/tri-deploy
    ```
    *Note: If you prefer not to install globally, you can add `@tririga/tri-deploy` to your devDependencies.*

2.  **Configure Credentials**
    Copy `.env.example` to `.env` and update the values for your deployment settings.
    ```
    cp .env.example .env
    ```
    Ensure your `.env` file has the correct `TRI_URL`, `TRI_USER`, and `TRI_PASSWORD`.

3.  **Configure tririgaService.js file**
    Update the TriAppConfig values `modelAndView` and `appExposedName` to match your app configuration in TRIRIGA.
    Example: 
    `modelAndView: "myTririgaApp",`
    `appExposedName: "myTririgaApp",`

4.  **Configure vite.config.ts file**
    Update the base value to match your application's exposed name in TRIRIGA. 
    Example: 
    base: '/app/myReactApp/',

5.  **Configure package.json**
    "name": "my-tririga-app",

    *Note: the name should match your Web View Metadata Exposed Name n TRIRIGA*

6.  **Run Deployment**
    The view name will be taken from the `name` field in `package.json`.
    ```
    pnpm run build:deploy
    ```

## Browser Support & Polyfills

## Project Structure

-   `src/components`: Reusable UI components.
-   `src/pages`: Top-level page definitions (routes).
-   `src/model`: TRIRIGA AppModel (Datasources).
-   `src/services`: API services (Auth, Config).
-   `public/tri-app-config.json`: Local development configuration mocking the server response.

## Tech Stack

-   [React](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Carbon Design System](https://carbondesignsystem.com/)
-   [@tririga/tririga-react-components](https://www.npmjs.com/package/@tririga/tririga-react-components)
