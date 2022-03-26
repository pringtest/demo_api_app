module.exports = {
	apps: [
		{
			name: 'ExpressJs',
			script: 'node index.js',
			instances: 0,
			exec_mode: 'fork',
			watch: true,
			env: {
				NODE_ENV: 'production',
				PORT: '3000'
			}
		}
	]
};