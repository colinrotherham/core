Core
====

### What is it?
Core is a Gulp-driven starter project (fork it and start a project).

Includes:

1. Critical CSS loading (100/100 on Google PageSpeed)
2. HTML template generation via Assemble.io
3. CommonJS module bundling
4. Sass and JavaScript linting
5. Supports Internet Explorer 8 (yikes)

### Initial setup

Install Node.JS

As root/administrator:

```
npm install -g gulp
```

Install dependencies automatically by running:
```
npm install
```

### Building
All files for deployment copied to `/dist/`

Output a live build.
```
gulp live
```

Output a development build, proxied via BrowserSync:
```
gulp dev
```
