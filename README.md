Core
====

### Initial setup

Install Node.JS

As root/adminstrator:

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
