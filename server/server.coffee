console.log '\n\n<---------SERVER LOG--------->\n'
## common
CONFIG = require './config'
fs = require 'fs'
express = require 'express'
session = require 'express-session'
useragent = require('useragent')
useragent(true)
# SESSION
GLOBAL.Promise = require 'bluebird'
# default port is 6379
# app.use expressSession
# 	secret: "notagoodsecret"
# 	# //cookie: {httpOnly: true, secure: true},
# 	cookie:
# 		httpOnly: true



RedisStore = require('connect-redis')(session)
console.log RedisStore

app = express()

app.set 'port', process.env.PORT || CONFIG.port

templatizer = require 'templatizer' 
# io = require('socket.io')(http);
# Make jade templates available in browsers via javascript template functions
# Build the dynamically generated template functions for client usage
fs.exists "#{CONFIG.dist}/js/cards_generator/templates/", (exists) ->
	if not exists then fs.mkdir './dist/js/cards_generator/templates/'
	templatizer "./src/jade/views",  "#{CONFIG.dist}/js/cards_generator/templates/templates.js"

## server
http = require 'http'


Db = require('mongodb').Db
MongoClient = require('mongodb').MongoClient
Server = require('mongodb').Server
ReplSetServers = require('mongodb').ReplSetServers
ObjectID = require('mongodb').ObjectID
Binary = require('mongodb').Binary
GridStore = require('mongodb').GridStore
Grid = require('mongodb').Grid
Code = require('mongodb').Code
BSON = require('mongodb').pure().BSON
assert = require('assert')

console.log CONFIG.db

## CONNECT DATABASES

promise = new Promise (resolve, reject) ->
	if (true)
		resolve "Stuff worked!"

	else
		reject Error "It broken"

console.log promise

promise.then (result) ->
	console.log(result)
# "Stuff worked!"
, (err) ->
	console.log(err)
# Error: "It broke"



# Redistore
app.use session
	store: new RedisStore
		host: '127.0.0.1'
		port: CONFIG.db.rediss.port.dev
		prefix:'sid_'
	secret: "cardholder"
	resave: true
	saveUninitialized: true


# ROUTER
router = express.Router()
router.use (req, res, next) ->
	console.log req.url, req.params, req.query
	next()
# STATIC FOLDERS
router.use '/js', express.static("#{CONFIG.dist}/js")
router.use '/css', express.static("#{CONFIG.dist}/css")
router.use '/views', express.static("#{CONFIG.dist}/views")
router.use '/assets', express.static("#{CONFIG.dist}/assets")

routerController = require('./controller')
routerController.initialize router
require('./routes')(router, routerController)

app.use (req, res, next) ->
	headersUserAgent = req.headers['user-agent']
	agent = useragent.parse( headersUserAgent )
	date = new Date()
	date = date.toString()
	if req.session
		req.session.lastLogin = date
		req.session.userAgent = agent
		req.session.url = req.url
		req.session.query = req.query
		req.session.params = req.params
	next()

app.use router

start = ( envirement, callback ) -> 
	# MongoClient
	MongoClient.connect CONFIG.db.mongo.url.dev , native_parser: true , ( err, db) =>
		if err then throw new Error err
		module.db = db
		console.log 'connecteding mongo...'
		date = new Date()
		date = date.toString()
		http.createServer( app ).listen CONFIG.port, ->
			console.log "Express server listening on port " + CONFIG.port

if not module.parent
	start()


module.exports = 
	start: start

# app.configure "development", ->
# app.configure "production", ->

# <================================================================================================================================================================================>

console.log '\n<-------END SERVER LOG------->\n'
