System.config({
    packages: {        
        "js": {
            format: 'cjs',
            defaultExtension: 'js'
        }
    }
});
System.import('./js/app.boot').then(null, console.error.bind(console));