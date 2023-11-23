module.exports = {
  apps: [
    {
      name: 'incidences-fe',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'ruta-a-tu-app/dist/main.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};