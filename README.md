# curtaggest

## How it is working

1. User create a new project
2. User upload photo(s), which are storing on S3-type bucket 

2.1. These photos get extra payload, include rbg color object by analyzing with Vibrant.js 
      and this information is saving into backend

2.2. After, we also save relations for uploaded images to the related project.

3. Algorithm of suggestions is doing with [color-diff](https://www.npmjs.com/package/color-diff) 
   by searching fabrics over the prepared pool stored in fabrics.js file.
4. Provide a script and instruction how to update that fabrics pool in right way. [Dima TODO]

## Roadmap
1. Create a django backend service to use for production-grade, instead Firebase.
2. Implement a management command to update the fabrics pool and store that 
   file with fabrics data somewhere in the bucket
3. Rebuild the application to use new backend
4. Pack the solution to be installed as npm module to js projects.
5. Add the solution to the sampleservice as a new feature for consumers [nice to have]


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
