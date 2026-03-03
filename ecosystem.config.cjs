module.exports = {
  apps: [
    {
      name: 'goldenwing',
      script: 'node_modules/.bin/next',
      args: 'start -p 3002',
      cwd: '/var/www/goldenwing-v2',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/goldenwing/error.log',
      out_file: '/var/log/goldenwing/out.log',
      merge_logs: true,
    },
    {
      name: 'goldenwing-dev',
      script: 'node_modules/.bin/next',
      args: 'start -p 3003',
      cwd: '/var/www/goldenwing-v2',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        NEXT_PUBLIC_SITE_URL: 'https://dev.goldenwing.at',
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/goldenwing/dev-error.log',
      out_file: '/var/log/goldenwing/dev-out.log',
      merge_logs: true,
    },
  ],
}
