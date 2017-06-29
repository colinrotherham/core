Core
====

### What is it?
Core is a Gulp-driven starter project (fork it and start a project).

Includes:

1. Critical CSS loading (100/100 on Google PageSpeed)
2. HTML template generation via Assemble.io
3. ES6 module bundling via Babel and webpack
4. Sass, JavaScript and HTML linting
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

Output a build.
```
gulp
```

Output a development build, proxied via BrowserSync:
```
gulp dev
```
