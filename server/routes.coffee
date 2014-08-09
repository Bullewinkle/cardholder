controller = require './controller'

module.exports = (router) ->

	router.get '/', controller.getIndex 
 
	router.get '/cards', controller.getCards

	router.get '/cards/:cardId', controller.getCardById

	router.get '/data' , controller.getAllData

	router.get '/data/:property', controller.getDataByKey

	router.get '/step-form' , controller.getAllStepFormData

	router.get '/step-form/:property', controller.getStepFormDataByKey

	router.get '/fonts-list', controller.getFontsList

	router.get '/fonts-list/:font', controller.getFontByName

	router
