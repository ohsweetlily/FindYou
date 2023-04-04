module.exports = {
		apps: [
				{
						name: 'next',
						script: 'node_modules/next/dist/bin/next',
						args: 'start -p 4000',
						exec_mode: 'cluster',
						instances: 'max',
						out_file: 'logs/out.log',
						log_file: 'logs/log.log',
						error_file: 'logs/error.log',
						log_type: 'json',
				},
		],
};
