express = require 'express'
timeout = require 'connect-timeout'
controller = require './controller'
session = require 'express-session'
RedisStore = require('connect-redis')(session)

module.exports = (router) ->
	# ---------------------- PDF ----------------------
	# router.get '/pdf-generator', controller.getPdf

	router.get '/pdf-generator', timeout(5000), controller.getPdf2

	# ---------------------- API ----------------------
	router.get '/api/cards-generator', controller.getCards
	router.get '/api/card', controller.getCards
	router.get '/api/card/:cardId', controller.getCardById
	router.get '/api/data' , controller.getAllData
	router.get '/api/data/:property', controller.getDataByKey
	router.get '/api/step-form' , controller.getAllStepFormData
	router.get '/api/step-form/:property', controller.getStepFormDataByKey
	router.get '/api/font-list', controller.getFontsList
	router.get '/api/font-list/:font', controller.getFontByName

	# ---------------------- INDEX ----------------------
	router.all '/*', controller.getIndex 

	router
