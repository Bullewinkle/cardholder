console.log '\n\n<---------SERVER LOG--------->\n'
# require('node-monkey').start
# 	host: '0.0.0.0'
# 	port: '7878'




# express = require('express.io')
# redis = require('redis')
# RedisStore = express.io.RedisStore

# // This is what the workers will do.
# workers = function() {
#     app = express().http().io()

#     // Setup the redis store for scalable io.
#     app.io.set('store', new express.io.RedisStore({
#         redisPub: redis.createClient(),
#         redisSub: redis.createClient(),
#         redisClient: redis.createClient()
#     }))

#     // build realtime-web app

#     app.listen(7076)
# }

# // Start forking if you are the master.
# cluster = require('cluster')
# numCPUs = require('os').cpus().length;

# if (cluster.isMaster) {
#     for (var i = 0; i < numCPUs; i++) { cluster.fork() }
# } else { workers() }









controllerData = require '../src/assets/data/data.json'
cards = require '../src/assets/data/cards-config.json'

fs = require('fs')
sys = require('sys')
url = require('url')
http = require('http')
path = require('path')
mime = require('mime')
express = require 'express.io'
bodyParser = require('body-parser')

redis = require('redis')
redisCli = require('redis-client')

RedisStore = express.io.RedisStore
client = redis.createClient 6379, 'localhost'


app = express().http().io()

app.use express.cookieParser()
app.use express.session
	secret: 'monkey'

app.io.set 'store', new express.io.RedisStore
	redisPub: client
	redisSub: client
	redisClient: client

app.data = controllerData

app.counter = 0

app.use bodyParser.json()
app.use bodyParser.urlencoded
	extended: true

app.fonts = fs.readdirSync './src/assets/font/card_fonts'
app.fonts = app.fonts.filter (item,i) ->
	item.charAt(0) != '.' and item.charAt(0) != '_'

# router = express.Router()
# console.log router

app.use '/', (req,res, next) ->
	req.session.hello = 'HELLO SESSION!'
	res.locals =
		'hello': 'locals'
		'one': 'is not two'
	next()

app.get '/cards', (req,res) ->
	res.json cards

app.get '/cards/:cardId', (req,res) ->
	card = cards[req.params.cardId-1]
	if card
		res.json card
	else
		res.json 404, status : 'invalid card id'

app.get '/data' , (req,res) ->
	app.data.fonts = app.fonts
	app.data.cards = app.cards
	res.json app.data

app.get '/data/:property', (req,res) ->
	controllerDataProperty = app.data[req.params.property]
	if controllerDataProperty
		res.json controllerDataProperty
	else
		res.json 404, status : 'invalid controller data property'

app.get '/controller' , (req,res) ->
	res.json app.data

app.get '/controller/:property', (req,res) ->
	controllerDataProperty = app.data[req.params.property]
	if controllerDataProperty
		res.json controllerDataProperty
	else
		res.json 404, status : 'invalid controller data property'

app.get '/fonts-list', (req,res) ->
	res.json app.fonts

app.get '/fonts-list/:font', (req,res) ->
	# res.send './src/assets/font/card_fonts/' + font + '/' + font + '.css'
	res.sendfile './src/assets/font/card_fonts/' + font + '/' + font + '.css'


app.use express.static('./dist')


start = ( envirement, _callback ) -> 
	console.log 'server: start'
	port = process.env.PORT or 9000

	app.listen port, ->
		console.log 'Server listening on port : ' + port
		if _callback? then _callback()

if not module.parent
	start()

module.exports = 
	start: start
	


console.log '\n<-------END SERVER LOG------->\n'
