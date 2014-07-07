# require('node-monkey').start
# 	host: '0.0.0.0'
# 	port: '7878'
console.log '\n\n<---------SERVER LOG--------->\n'


fs = require 'fs'

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


start = ( envirement, callback ) -> 
	localHostPort = 9000
	console.log 'server starts'
	if process.env.PORT
		app.listen process.env.PORT, ->
			console.log 'Server listening on port : ' + process.env.PORT
	else
		app.listen localHostPort, ->
			console.log 'Server listening on port : ' + localHostPort
	if callback then callback()

if not module.parent
	start()

# if module.parent.id.search 'gulpfile' > -1

module.exports = 
	start: ( envirement, callback ) -> 
		console.log 'server starts'
		if process.env.PORT
			app.listen process.env.PORT, ->
				console.log 'Server listening on port : ' + process.env.PORT
		else
			app.listen localHostPort, ->
				console.log 'Server listening on port : ' + localHostPort
		if callback then callback()
	


console.log '\n<-------END SERVER LOG------->\n'
