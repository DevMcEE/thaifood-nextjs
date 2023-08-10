module.exports = {
  apps: [
    {
      name: 'thaifood',
      script: 'npm run start',
      autorestart: true,
      instances: 2
    },
  ],

  deploy: {
    production: {
      key: '~/.ssh/id_ed25519',
      user: 'virt98592',
      host: 'thaifood.ee',
      ref: 'origin/master',
      repo: 'git@github.com:devmc-ee/thaifood-nextjs.git',
      path: '/data01/virt98592/nodeapp/thaifood',
      'ssh_options': 'ForwardAgent=yes',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install --omit=optional --force && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
