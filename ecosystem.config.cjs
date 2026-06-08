/**
 * PM2 Ecosystem — PortalFunil API
 * Uso: pm2 start ecosystem.config.cjs
 *      pm2 save && pm2 startup   (habilita no boot do SO)
 */
module.exports = {
  apps: [
    {
      name: 'portalfunil-api',
      script: 'dist/main.js',
      cwd: './apps/api',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      out_file: './logs/api-out.log',
      error_file: './logs/api-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
