# require('node-monkey').start
# 	host: '0.0.0.0'
# 	port: '7878'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'
console.log '\n\n<---------SERVER LOG--------->\n'


fs = require 'fs'
# io = require('socket.io')(http);
# Keen = require('keen.io');
# client = Keen.configure
# 	projectId: "53c2f8bbc9e1633d02000002"
# 	writeKey: "29a424f562f704b579a9acc0edec045f3ce0afd13baacd0480ef5c213fe16623318c53dc891d78c26b43cf1724a0b5e3c46cd05cf16465736e2cbcbac2bb30b387f39d86b5ae95a4432f0f23fb05614a9ec355a3e846c57d0d911499282de03b8b0e2f4fa094332bb8fe2465174d616c"
# 	readKey: "c35d107c9df5886c8ad51f0daed8a4dd90fff46607ca17e1b7ac0fb1b7184bdf95b59ca990f9524fe347c691830bd1accaf19654efdcbd2c6f726f85e9e2ac876a22ff90addca44dce94dc4863e8401307185b56c310bba1ec26aa984609046345bdb5cb1318af1a1179cb1ba945266c"
# 	masterKey: "1BD1E1B520CA04091712C2FE4EA8D99E"

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

module.exports = 
	start: start
	


console.log '\n<-------END SERVER LOG------->\n'
