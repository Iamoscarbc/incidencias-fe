module.exports = {
  apps: [
    {
      name: `incidences-fe`,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 3003,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
      },
    },
  ],
};