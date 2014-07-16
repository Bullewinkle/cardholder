# require('node-monkey').start
# 	host: '0.0.0.0'
# 	port: '7878'


# fs = require('fs')
# ws = require('ws')
# sys = require('sys')
# url = require('url')
# http = require('http')
# path = require('path')
# mime = require('mime')
# redis = require('redis-client')

# redisURL = url.parse process.env.REDISCLOUD_URL
# client = redis.createClient redisURL.port, redisURL.hostname,
# 	no_ready_check: true
# client.auth redisURL.auth.split(":")[1]


console.log '\n\n<---------SERVER LOG--------->\n'


fs = require 'fs'
# io = require('socket.io')(http);

bodyParser = require('body-parser')
express = require 'express'

cards = require '../src/assets/data/cards-config.json'
controllerData = require '../src/assets/data/data.json'

app = express()

app.data = controllerData

app.counter = 0

app.use bodyParser.json()
app.use bodyParser.urlencoded
	extended: true

app.fonts = fs.readdirSync './src/assets/font/card_fonts'
app.fonts = app.fonts.filter (item,i) ->
	item.charAt(0) != '.' and item.charAt(0) != '_'

router = express.Router()

router.use '/', (req,res, next) ->
	res.locals =
		'hello': 'locals'
		'one': 'is not two'
	next()

router.get '/cards', (req,res) ->
	res.json cards

router.get '/cards/:cardId', (req,res) ->
	card = cards[req.params.cardId-1]
	if card
		res.json card
	else
		res.json 404, status : 'invalid card id'

router.get '/data' , (req,res) ->
	app.data.fonts = app.fonts
	app.data.cards = app.cards
	res.json app.data

router.get '/data/:property', (req,res) ->
	controllerDataProperty = app.data[req.params.property]
	if controllerDataProperty
		res.json controllerDataProperty
	else
		res.json 404, status : 'invalid controller data property'

router.get '/controller' , (req,res) ->
	res.json app.data

router.get '/controller/:property', (req,res) ->
	controllerDataProperty = app.data[req.params.property]
	if controllerDataProperty
		res.json controllerDataProperty
	else
		res.json 404, status : 'invalid controller data property'

router.get '/fonts-list', (req,res) ->
	res.json app.fonts

router.get '/fonts-list/:font', (req,res) ->
	# res.send './src/assets/font/card_fonts/' + font + '/' + font + '.css'
	res.sendfile './src/assets/font/card_fonts/' + font + '/' + font + '.css'


app.use '/',router

app.use express.static('./dist')


start = ( envirement, _callback ) -> 
	console.log 'server: start'
	port = process.env.PORT or 9000
	callback = _callback or ->
		console.log 'Server listening on port : ' + port
		
	app.listen port, callback

if not module.parent
	start()

module.exports = 
	start: start
	


console.log '\n<-------END SERVER LOG------->\n'
