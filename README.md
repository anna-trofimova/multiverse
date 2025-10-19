Multiverse Visitor Center
=========================

A full-stack Rick and Morty explorer built for the Adtraction Labs coding challenge.

Overview
--------

The Multiverse Visitor Center is a small web application that allows users to:

1.  Browse and search for characters
    
2.  View detailed information including episode appearances
    
3.  Explore analytics that show how many characters exist for each species
    

The project consists of a TypeScript React frontend and a Node.js Express backend.The backend acts as a proxy to the official Rick and Morty API and provides caching, validation and analytics.

Technology Stack
----------------

Frontend: React, TypeScript, React Router, React Query, Recharts, ViteBackend: Node.js, Express, Zod, in-memory cacheTesting: Jest, SupertestTooling: ESLint, PrettierPackage manager: npm

Project Structure
-----------------

`   root  ├─ server/            Express backend  │  ├─ lib/            cache utility and RM API client  │  ├─ routes/         /api/characters and /api/stats  │  ├─ test/           Jest + Supertest integration tests  │  └─ app.ts, index.ts  └─ web/               React frontend (Vite)     ├─ pages/          Characters, Character, Analytics     ├─ components/     Filters, Pagination     ├─ lib/            API helper and shared types     └─ main.tsx   `

Backend Overview
----------------

### Endpoints

MethodPathDescriptionGET/healthHealth check returning { ok: true }GET/api/charactersProxies the Rick and Morty API with pagination and optional filters (name, status, species), cached for 10 minutesGET/api/characters/:idReturns detailed character informationGET/api/stats/speciesAggregates counts of characters per species and caches the result

### Validation and Error Handling

Requests are validated using Zod schemas.Invalid input returns status 400.Not found returns 404.Unexpected errors return 500.

### Caching

All proxied data is stored in a simple in-memory cache for ten minutes.Cache keys are based on query strings to avoid redundant external requests.

Frontend Overview
-----------------

Main features

*   Paginated grid of character cards with image, name, species and status
    
*   Search and filter by name, status and species
    
*   Character detail page showing metadata and list of episodes
    
*   Analytics page that visualizes /api/stats/species using a bar chart
    
*   Responsive design and written entirely in TypeScript
    

Running Locally
---------------

### Backend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd server  npm install  npm start   `

The backend runs at [http://localhost:4000](http://localhost:4000)

### Frontend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd web  npm install  echo "VITE_API_BASE=http://localhost:4000" > .env.local  npm run dev   `

The frontend runs at [http://localhost:5173](http://localhost:5173)

Testing
-------

Integration tests verify backend endpoints.

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd server  npm test   `

Tests cover /health, /api/characters, /api/stats/species and invalid query handling.

Design Decisions
----------------

Caching keeps the app responsive and reduces load on the public API.Validation with Zod ensures that invalid parameters are rejected before making external requests.React Query handles data caching, pagination and loading states on the frontend.Recharts provides a simple way to render analytics.TypeScript enforces consistent data shapes between frontend and backend.

Design Trade-offs
-----------------

An in-memory cache was chosen for simplicity rather than a persistent store such as Redis.Sequential aggregation in the analytics endpoint was used to avoid concurrency complexity.A database was not introduced because the Rick and Morty API already serves as the source of truth.Styling was kept minimal to focus on structure, typing and behavior within the challenge timeframe.