# Optimaxer Web MonoRepo

![Copyright](https://img.shields.io/badge/Copyright-@_2024_99x-blue)

This monorepo contains a collection of projects for various functionalities within the Web Edge ecosystem. Each project is managed as a separate npm package.

## Packages

- **web-edge-core**: Core functionalities shared across other packages.
- **web-commands**: Command execution utilities.
- **web-translate**: Translation services.
- **web-rag**: Retrieval-augmented generation utilities.
- **web-english**: English language processing tools.
- **web-forms**: Form handling utilities.
- **web-text**: Text processing utilities.
- **web-search**: Search functionalities.
- **web-help**: Help and documentation utilities.

Read more about the [features](./docs/features.md) and [architecture](./docs/architecture.md) of this project.

## Creating a simple application 

(./packages/@optimaxer/web-cli/docs/getting%20started.md)


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Lerna](https://lerna.js.org/) (v4 or higher)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/99x/optimaxer-web.git
    cd optimaxer-web
    ```

2. Install dependencies and bootstrap the packages:

    ```sh
    npm install
    npx lerna bootstrap
    ```

### Lerna Commands

Here are some useful Lerna commands to manage the monorepo:

- Bootstrap the packages:

  This command will install all dependencies and link cross-dependencies:

  ```sh
  npx lerna bootstrap
  ```

- Run a script in all packages:

  To run a script (e.g., build, test) in all packages, use:

  ```sh
  npx lerna run build
  npx lerna run test
  ```

- Add a dependency to a package:

  To add a dependency to a specific package:

  ```sh
  npx lerna add <dependency> --scope=<package-name>
  ```

- Publish packages:

  To publish updated packages to npm:

  ```sh
  npx lerna publish
  ```

### Development

Each package resides in the `packages` directory and can be developed independently. Here is an example structure of a package:

```plaintext
packages/
  web-edge-core/
     src/
     package.json
     README.md
  ...
```

#### Building a Package

To build a package, navigate to the package directory and run the build script:

```sh
cd packages/web-edge-core
npm run build
```

#### Testing a Package

To test a package, navigate to the package directory and run the test script:

```sh
cd packages/web-edge-core
npm run test
```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
