module.exports = {
    apps: [{
      name: 'Bienes-Raices',
      script: './dist/index.js',
      watch: true,
      instances: 1,
      restart_delay: 1000,
      autorestart: true,
    }],
  };