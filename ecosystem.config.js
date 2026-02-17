module.exports = {
  apps: [{
    name: "goldenwing",
    script: "npm",
    args: "start",
    cwd: "/var/www/goldenwing",
    
    // Stability settings
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 5000,
    
    // Restart behavior
    max_restarts: 10,
    min_uptime: "10s",
    restart_delay: 4000,
    exp_backoff_restart_delay: 100,
    
    // Memory management
    max_memory_restart: "500M",
    
    // Logging
    error_file: "/var/log/pm2/goldenwing-error.log",
    out_file: "/var/log/pm2/goldenwing-out.log",
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    
    // Environment
    env: {
      NODE_ENV: "production",
      PORT: 3002,
      SMTP_HOST: "smtp.gmail.com",
      SMTP_PORT: "465",
      SMTP_USER: "deni@goldenwing.at",
      SMTP_PASS: "REDACTED"
    }
  }]
}
