fs = require 'fs'
CONFIG = require './config'

cards = require '../src/assets/data/cards-config.json'
stepFormData = require '../src/assets/data/data.json'

fonts = fs.readdirSync './src/assets/font/card_fonts'
fonts = fonts.filter (item,i) ->
	item.charAt(0) != '.' and item.charAt(0) != '_'

module.exports =

	initialize: (router) ->
		console.log 'controller init'
		router.controller = @
		@router = router

	getIndex: (req,res, next) =>
		console.log  'index'
		# index = require '../dist/index.html'
		res.sendfile "#{CONFIG.dist}/index.html"
		# next()

	getCards: (req,res) =>
		console.log 'getCards'
		res.json cards
	
	getCardById: (req,res) =>
		console.log 'getCardById'
		card = cards[req.params.cardId-1]
		if card
			res.json card
		else
			res.json 404, status : 'invalid card id'
	
	getAllData: (req,res) =>
		console.log 'getAllData'
		stepFormData.fonts = fonts
		stepFormData.cards = cards
		res.json stepFormData
	
	getDataByKey: (req,res) =>
		console.log 'getDataByKey'
		stepFormDataProperty = stepFormData[req.params.property]
		if stepFormDataProperty
			res.json stepFormDataProperty
		else
			res.json 404, status : 'invalid stepForm data property'
	
	getAllStepFormData: (req,res) =>
		console.log 'getAllStepFormData'
		res.json stepFormData
	
	getStepFormDataByKey: (req,res) =>
		console.log 'getStepFormDataByKey'
		stepFormDataProperty = stepFormData[req.params.property]
		if stepFormDataProperty
			res.json stepFormDataProperty
		else
			res.json 404, status : 'invalid stepForm data property'
	
	getFontsList: (req,res) =>
		console.log 'getFontsList'
		fonts = fs.readdirSync './src/assets/font/card_fonts'
		fonts = fonts.filter (item,i) =>
			item.charAt(0) != '.' and item.charAt(0) != '_'
		res.json fonts
	
	getFontByName: (req,res) =>
		console.log 'getFontByName'
		# res.send './src/assets/font/card_fonts/' + font + '/' + font + '.css'
		res.sendfile './src/assets/font/card_fonts/' + font + '/' + font + '.css'
