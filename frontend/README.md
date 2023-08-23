## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Capacitor Setup

* Build the project to create the dist folder
```sh
npm run build
```
* Create the ios and android folder if not already there
```sh
npx cap add ios
npx cap add android
```
* Sync the web code with the native project
```sh
npx cap sync
```
* Either open the native editor or just run the emulator
```sh
npx cap open ios
```
or
```sh
npx cap run ios
```
