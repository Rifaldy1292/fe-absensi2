// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'absensi-backend',
      script: 'npm',
      args: 'run start:dev',
      cwd: './be-absensi',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    },
    {
      name: 'absensi-frontend',
      script: 'npm',
      args: 'run start',
      cwd: './fe-absensi2',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
}