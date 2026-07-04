# Work Plan: Configure Husky and Commitlint

This plan details the steps required to set up Husky, configure commitlint for checking commit messages based on standard conventions (lowercase and no trailing period), and add an audit script in `package.json`.

## Proposed Changes

### 1. Install Dependencies
Install Husky and Commitlint dependencies:
- `husky`
- `@commitlint/cli`
- `@commitlint/config-conventional`

### 2. Initialize Husky
Initialize Husky in the repository:
- Run `npx husky init` to set up the `.husky` directory and configure the prepare script.

### 3. Configure Commitlint
Create `.commitlintrc.json` with the following configuration:
- Extends `@commitlint/config-conventional`.
- Enforces lowercase subjects (`subject-case` rule).
- Enforces no trailing period in subjects (`subject-full-stop` rule).

### 4. Setup Git Hook
Configure `.husky/commit-msg` to run `npx --no -- commitlint --edit "${1}"`.

### 5. Update package.json
Add the audit script:
- `"audit": "npm audit --audit-level=high"`

## Verification Steps
1. Verify that `package.json` contains the updated scripts and devDependencies.
2. Verify that `.commitlintrc.json` is correctly written.
3. Test commitlint with valid and invalid commit messages using `npx commitlint`.
4. Verify the `audit` script works by running `npm run audit`.
