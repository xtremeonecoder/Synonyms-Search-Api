## Development Environment Setup

No matter what IDE you are using for the development, you will always get the support of prettier formatting and eslinter through the project codebase. But it is recommended to use Visual Studio Code (VSCode).

1. Install Nodejs on your machine (recommanded to install the recent version).
2. Install VSCode on your machine as an IDE.
3. Install git bash on your machine for using git through terminal.

## VSCode IDE Setup

1. Configure **VSCode IDE** according to your way.
2. Install **Prettier - Code formatter** plugin and configure the formatting on file save.
3. Install **ESLint** by Microsoft for following standard code writing convensions and identifying code issues.
4. Install **GitLens** for performing git operations using **VSCode GUI**.

## Available API Endpoints

- [http://localhost:3001/api/synonyms](http://localhost:3001/api/synonyms)
  - Description: Adds word with its synonyms.
  - Method: POST
  - Request Params:
    - word: string
    - synonyms: array[]
- [http://localhost:3001/api/synonyms/:word](http://localhost:3001/api/synonyms/:word)
  - Description: Fetches synonyms of the given word.
  - Method: GET
  - Request Params:
    - word: string
- [http://localhost:3001/api/synonyms/reset/memories](http://localhost:3001/api/synonyms/reset/memories)
  - Description: Resets in-memories
  - Method: GET

## Available Scripts

Open `git bash` or any other terminal from the project root directory and follow the following steps for up and run the project.

- `npm install` (installs the application dependencies)
- `npm update` (updates the application dependencies)
- `npm start` (starts the application on terminal, But before starting, it will apply prettier format and scan the whole codebase for linter issues)

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

### `npm run test:watch`

### `npm run lint`

This command can be used for manually run the linter to check the codebase for code smell and issues.

### `npm run lint:fix`

This command can be used for manually run the linter to check the codebase for code smell and issues. But additionally, this command will fix some potential code issues automatically.

### `npm run format`

This command can be used for manually checking prettier formatting issues on the whole codebase.

### `npm run format:fix`

This command can be used for manually applying prettier formatting on the whole codebase.

### `npm run format:lint:fix`

This command can be used for manually applying prettier formatting on the whole codebase as well as manually run the linter to check the codebase for code smell and issues. But additionally, this command will fix some potential code issues automatically.
