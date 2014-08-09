# require('node-monkey').start
# 	host: '0.0.0.0'
# 	port: '7878'
console.log '\n\n<---------SERVER LOG--------->\n'

## common
CONFIG = require './config'
fs = require 'fs'
# bodyParser = require('body-parser')
express = require 'express'
app = express()
app.set 'port', process.env.PORT || CONFIG.port

templatizer = require 'templatizer' 
# io = require('socket.io')(http);
# Make jade templates available in browsers via javascript template functions
# Build the dynamically generated template functions for client usage
fs.mkdir './dist/js/cards_generator/templates/'
templatizer './src', './dist/js/cards_generator/templates/templates.js'

## server
http = require 'http'
# restify = require 'restify'
# server = restify.createServer()
# server.use restify.bodyParser()

## mongoDB
mongoose = require 'mongoose/'
# db = mongoose.connect config.creds.mongoose_auth_local
Schema = mongoose.Schema

## mongoose schema
#Create a schema for our data
MessageSchema = new Schema
  message: String,
  date: Date
#Use the schema to register a model with Mongodb
mongoose.model 'Message', MessageSchema
Message = mongoose.model 'Message'

# STATIC FOLDERS
app.use '/js', express.static("#{CONFIG.dist}/js")
app.use '/css', express.static("#{CONFIG.dist}/css")
app.use '/views', express.static("#{CONFIG.dist}/views")
app.use '/assets', express.static("#{CONFIG.dist}/assets")

# ROUTER
router = express.Router()
routerController = require('./controller')
routerController.initialize router
require('./routes')(router, routerController)
app.use router
# ==================================================================>


# app.all '/*', (req, res) ->
# 	res.sendfile "#{CONFIG.dist}/index.html"
# app.use express.static( CONFIG.dist )
# ==================================================================>


# app.engine 'jade', require('jade').__express
# app.set 'views', __dirname + '/views'
# app.set 'view engine', 'jade'
# app.use app.router
# app.use require('stylus').middleware({ src: __dirname + '/public' })
# app.use express.favicon()
# app.use express.logger('dev')
# app.use helmet.xframe()
# app.use helmet.iexss()
# app.use helmet.contentTypeOptions()
# app.use helmet.cacheControl()
# app.use express.bodyParser()
# app.use express.methodOverride()
# app.use express.cookieParser()
# app.use express.session
	# secret: "notagoodsecret"
	# # //cookie: {httpOnly: true, secure: true},
	# cookie:
	# 	httpOnly: true
# app.counter = 0

# app.use bodyParser.json()
# app.use bodyParser.urlencoded
# 	extended: true

start = ( envirement, callback ) -> 
	http.createServer( app ).listen CONFIG.port, ->
		console.log "Express server listening on port " + CONFIG.port

if not module.parent
	start()

module.exports = 
	start: start
	







# <================================================================================================================================================================================>
# express = require("express")
# http = require("http")
# path = require("path")
# helmet = require("helmet")

# # Make jade templates available in browsers via javascript template functions
# templatizer = require("templatizer")

# # Build the dynamically generated template functions for client usage
# templatizer __dirname + "\\views", __dirname + "/public/js/templates.js"
# app = express()
# app.configure ->
#   app.set "port", process.env.PORT or 3000
#   app.set "views", __dirname + "/views"
#   app.set "view engine", "jade"
#   app.use require("stylus").middleware(src: __dirname + "/public")
#   app.use express.favicon()
#   app.use express.logger("dev")
#   app.use helmet.xframe()
#   app.use helmet.iexss()
#   app.use helmet.contentTypeOptions()
#   app.use helmet.cacheControl()
#   app.use express.bodyParser()
#   app.use express.methodOverride()
#   app.use express.cookieParser()
#   app.use express.session(
#     secret: "notagoodsecret"
    
#     #cookie: {httpOnly: true, secure: true},
#     cookie:
#       httpOnly: true
#   )
#   app.use express.csrf()
#   app.use (req, res, next) ->
#     res.locals.csrftoken = req.session._csrf
#     next()
#     return

#   app.use app.router
#   app.use express.static(path.join(__dirname, "public"))
#   return

# app.configure "development", ->
#   app.use express.errorHandler()
#   return


# # Routes
# require("./router") app
# http.createServer(app).listen app.get("port"), ->
#   console.log "Express server listening on port " + app.get("port")
#   return


# #process.setuid(config.uid);
# #process.setgid(config.gid);
# <================================================================================================================================================================================>

console.log '\n<-------END SERVER LOG------->\n'
