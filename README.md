# NYT Hardcover Fiction Bestsellers

A list of hardcover fiction bestsellers from the New York Times

## Versions

nodejs 18.17.1

## Setup

Install `asdf` if you don't have it already:

```
brew install asdf
```

Install the `nodejs` plugin:

```
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

In the root directory, install the Node version from `.tool-versions`:

```
asdf install
```

To verify you have the correct version installed:

```
node -v
```

Install the dependencies:

```
npm install
```

## Starting the server

```
npm run dev
```

## Running tests

```
npm run test
```

For watch mode:

```
npm run test-watch
```
