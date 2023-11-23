module.exports = {
  apps: [
    {
      name: `incidences-fe`,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: "preview",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 3003,
        NODE_ENV: 'production',
      },
    },
  ],
};