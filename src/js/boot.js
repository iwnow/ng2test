
setTimeout(function() {
    System.config({
        packages: {        
            "app/js": {
                format: 'cjs',
                defaultExtension: 'js'
            }
        }
    });
    System.import('./app/js/app.boot').then(null, console.error.bind(console));
}, 0);
