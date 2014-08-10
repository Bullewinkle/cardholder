module.exports = 
	port: 9000
	db:
		# Your mongo auth uri goes here, e.g. mongodb://username:server@mongoserver:10059/somecollection
		mongo: 
			url: 
				dev: 'mongodb://localhost/cardholder'
				# prod: ''
			port:
				dev: 27017
		rediss:
			port: 
				dev: 6379

	dist: './dist'
