fs = require 'fs'
CONFIG = require './config'

cards = require '../src/assets/data/cards-config.json'
stepFormData = require '../src/assets/data/data.json'

fonts = fs.readdirSync './src/assets/font/card_fonts'
fonts = fonts.filter (item,i) ->
	item.charAt(0) != '.' and item.charAt(0) != '_'

PdfKit = require 'pdfkit'

module.exports =

	initialize: (router) ->
		console.log 'controller init'
		router.controller = @
		@router = router

		@counter = {}


	getIndex: (req, res) =>
		console.log  'index'
		res.sendfile "#{CONFIG.dist}/index.html"

	# /api/cards-generator
	getCards: (req, res) =>
		console.log 'getCards'
		res.json cards
	
	# /api/card/:cardId
	getCardById: (req, res) =>
		console.log 'getCardById'
		card = cards[req.params.cardId-1]
		if card
			res.json card
		else
			res.status(404).json( message : 'invalid card id' )
	
	# '/api/data'
	getAllData: (req, res) =>
		console.log 'getAllData'
		stepFormData.fonts = fonts
		stepFormData.cards = cards
		res.json stepFormData
	
	# /api/data/:property
	getDataByKey: (req, res) =>
		console.log 'getDataByKey'
		stepFormDataProperty = stepFormData[req.params.property]
		if stepFormDataProperty
			res.json stepFormDataProperty
		else
			res.status(404).json( message : 'invalid stepForm data property' )
	
	# /api/step-form
	getAllStepFormData: (req, res) =>
		console.log 'getAllStepFormData'
		res.json stepFormData
	
	# /api/step-form/:property
	getStepFormDataByKey: (req, res) =>
		console.log 'getStepFormDataByKey'
		stepFormDataProperty = stepFormData[req.params.property]
		if stepFormDataProperty
			res.json stepFormDataProperty
		else
			res.status(404).json( message : 'invalid stepForm data property' )
			# res.json 404, status : 'invalid stepForm data property'
	
	# /api/font-list
	getFontsList: (req, res) =>
		console.log 'getFontsList'
		fonts = fs.readdirSync './src/assets/font/card_fonts'
		fonts = fonts.filter (item,i) =>
			item.charAt(0) != '.' and item.charAt(0) != '_'
		res.status(200).json(fonts)
	
	# /api/font-list/:font
	getFontByName: (req, res) =>
		console.log 'getFontByName'
		font = './src/assets/font/card_fonts/' + req.params.font + '/' + req.params.font + '.css'
		# res.send './src/assets/font/card_fonts/' + font + '/' + font + '.css'
		res.sendfile font

	# /pdf-generator
	getPdf: (req, res) =>
		console.log 'getPdf', req.body
		# res.set
		# 	'Content-Type': 'application/pdf'
		# 	'lastModified': false
		# 	'maxAge': 1
		# res.type('application/pdf')

		# Pipe it's output somewhere, like to a file or HTTP response
		# See below for browser usage
		pdf = new PdfKit()
		pdf.pipe fs.createWriteStream './dist/assets/pdf/generated.pdf'
		pdf.pipe res

		# Embed a font, set the font size, and render some text
		pdf.fontSize(25).text('Some text with an embedded font!', 100, 100)
		# Add another page
		pdf.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100)

		# Draw a triangle
		pdf.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300")

		# Apply some transforms and render an SVG path with the 'even-odd' fill rule
		pdf.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore()

		# Add some text with annotations
		pdf.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, color: "#0000FF").link(100, 100, 160, 27, 'http://google.com/')


		pdf.on 'end', =>
			console.log( '!!! pdf rendering ended !!!' )
			console.log( '!!! pdf file saved !!!' )
			# res.sendFile '/assets/pdf/generated.pdf'			
			

		# Finalize PDF file
		pdf.end()


		# res.sendFile '/dist/assets/pdf/generated.pdf'




