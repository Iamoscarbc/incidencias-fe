module.exports = {
    apps: [
      {
        name: 'incidences-fe',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: './node_modules/vite/bin/vite.js',
        args: 'start'
      }
    ]
  }