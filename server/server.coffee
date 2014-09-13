console.log '\n\n<---------SERVER LOG--------->\n'
# TODO

CONFIG = require './config'
fs = require 'fs'
http = require 'http'

# Db = require('mongodb').Db
# MongoClient = require('mongodb').MongoClient
# ReplSetServers = require('mongodb').ReplSetServers
# ObjectID = require('mongodb').ObjectID

winston = require 'winston'

express = require 'express'
# session = require 'express-session'
# RedisStore = require('connect-redis')(session)

useragent = require('useragent')
useragent(true)

GLOBAL.Promise = require 'bluebird'
# Promise example
# promise = new Promise (resolve, reject) ->
# 	if (true)
# 		resolve "Stuff worked!"
# 	else
# 		reject Error "It broken"
# console.log promise

# promise.then (result) ->
# 	console.log(result)
# , (err) ->
# 	console.log(err)

app = express()
app.set 'port', process.env.PORT || CONFIG.port

app.use (err, req, res, next) ->
	if err then res.status(500).send 'Server error'
	next

# SESSION
# Redistore
# app.use session
# 	store: new RedisStore
# 		host: '127.0.0.1'
# 		port: CONFIG.db.rediss.port.dev
# 		prefix:'sid_'
# 	secret: "cardholder"
# 	resave: true
# 	saveUninitialized: true

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

# CONTROLLER
routerController = require('./controller')
routerController.initialize router
require('./routes')(router, routerController)

app.use ( err, req, res, next) ->
	# headersUserAgent = req.headers['user-agent']
	# agent = useragent.parse( headersUserAgent )
	# date = new Date()
	# date = date.toString()
	# #mongoDB testing
	# module.db.collection('users').update {name: 'default user'}, {name: 'default user', lastLogin: date}, (args...) -> 
	# 	true
	# if req.session
	# 	req.session.name = 'default user'
	# 	req.session.lastLogin = date
	# 	req.session.userAgent = agent
	# 	req.session.url = req.url
	# 	req.session.query = req.query
	# 	req.session.params = req.params
	next()

app.use '/', router

start = ( envirement, callback ) -> 
	# MongoClient
	# MongoClient.connect CONFIG.db.mongo.url.dev , native_parser: true , ( err, db) =>
	# 	if err then throw new Error err
	# 	module.db = db
	# 	console.log 'mongodb connected'
	# 	date = new Date()
	# 	date = date.toString()
		
	# 	db.collection('users').update {name: 'default user'}, {name: 'default user', lastLogin: date}, (args...) -> 
	# 		true
	http.createServer( app ).listen process.env.PORT or CONFIG.port or 9000, ->
		console.log "Express server listening on port " + port	

if not module.parent
	start()
else module.exports.start = start


# app.configure "development", ->
# app.configure "production", ->

# <================================================================================================================================================================================>

console.log '\n<-------END SERVER LOG------->\n'
