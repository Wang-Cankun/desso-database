module.exports = {
  apps: [
    {
      name: 'DESSO database',
      script: './node_modules/nuxt-start/bin/nuxt-start.js',
      port: 9002,
      watch: '.',
      args: 'start',
      max_memory_restart: '250M',
      log_date_format: 'YYYY-MM=DD HH:mm:ss'
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
