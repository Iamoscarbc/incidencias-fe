module.exports = {
  apps: [
    {
      name: 'incidences-fe',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'dist/assets/index-40efad69.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};