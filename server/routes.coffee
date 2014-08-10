controller = require './controller'
session = require 'express-session'
RedisStore = require('connect-redis')(session)

module.exports = (router) ->

	# router.get '/', controller.getIndex 

	router.get '/api/cards-generator', controller.getCards

	router.get '/api/cards', controller.getCards
	
	router.get '/api/cards/:cardId', controller.getCardById
	
	router.get '/api/data' , controller.getAllData

	router.get '/api/data/:property', controller.getDataByKey

	router.get '/api/step-form' , controller.getAllStepFormData

	router.get '/api/step-form/:property', controller.getStepFormDataByKey

	router.get '/api/fonts-list', controller.getFontsList

	router.get '/api/fonts-list/:font', controller.getFontByName

	router.all '/*', controller.getIndex 

	router
