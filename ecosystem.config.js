module.exports = {
  apps: [
    {
      name: 'thaifood',
      script: 'npm run start',
      autorestart: true,
      instances: 2,
      max_memory_restart: "300M",
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
      exec_mode: "cluster_mode",
      'ssh_options': 'ForwardAgent=yes',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install --omit=optional --force && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
