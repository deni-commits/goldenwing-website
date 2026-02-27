module.exports = {
  apps: [
    {
      name: 'goldenwing',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/goldenwing-website',
      max_memory_restart: '1500M',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
      },
      // Don't restart endlessly if build is missing
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 5000,
    },
  ],
};
