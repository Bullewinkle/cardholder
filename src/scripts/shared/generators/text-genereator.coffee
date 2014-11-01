@app.module 'shared.generators.textGen', (TextGen, app, Backbone, Marionette, $, _) ->	
	
	# Privat properties
	srcData = dataFromServer.appData
	srcData.textAligns = ['left','center','right']
	fontsList = srcData.fontsList

	# Public properties
	# empty

	# Privat methods
	generateRandomData = ->	
		#local variables
		randomNameNum = app.getRandom(0, srcData.names.length-1 )
		randomPhoneEnd = app.getRandom(0, srcData.names.length-1 )
		randomPhoneEnd = '0' + randomPhoneEnd if (''+ randomPhoneEnd).length < 2 
		#end local variables

		#generate new random cardData
		randomCardData =
			isDefault: false
			sex: srcData.names[ randomNameNum ].sex
			name:  srcData.names[ randomNameNum ].text
			surname:  srcData.surnames[ app.getRandom(0, srcData.surnames.length-1 ) ]
			eMail:  srcData.emails[ app.getRandom(0, srcData.emails.length-1 ) ]
			position:  srcData.positions[ app.getRandom(0, srcData.positions.length-1 ) ]
			phone: '+7-' + srcData.phones + randomPhoneEnd

		randomCardData

	generateRandomTextOptions = ->
		#local variables
		#end local variables


		#generate new random text options
		randomTextOptions =
			isDefault: false
			textAlign: srcData.textAligns[app.getRandom(0,srcData.textAligns.length-1)]
			fontFamily: 'sans-serif'
			# fontFamily: ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]

			textBlockOptions:
				padding:
					top: app.getRandom(10, 50, 2)
					left: app.getRandom(10, 50, 2)
					bottom: 0
					right: app.getRandom(10, 50, 2)
				title:
					fontSize: "#{app.getRandom(1, 2.5, 2)}em"
					color: "rgb(#{ app.getRandom(0, 120) },#{ app.getRandom(0, 120) },#{ app.getRandom(0, 120) })"
					textBaseline: 'middle' 
					lineHeight: app.getRandom(18, 40 , 2)
					marginBottom: 0
				body:
					fontSize: "#{app.getRandom(0.5, 1.5, 2)}em"
					color: "rgb(#{ app.getRandom(0, 160) },#{ app.getRandom(0, 160) },#{ app.getRandom(0, 160) })"
					textBaseline: 'middle' 
					lineHeight: app.getRandom(10, 30 , 2)

		randomTextOptions	

	prepareInitials = (sex, name, surname) ->
		if sex is 'male'
			surname = surname

		else if sex is 'female'
			if surname.substr(surname.length-2,surname.length) is 'ий'
				surname = surname.slice(0,surname.length-2)
				surname = surname+'ая'
			else
				surname = surname+'a'

		name + ' ' + surname
		
	prepareData = (model) ->
		if model.get('data').isDefault
			#set new random card data to model
			randomData = generateRandomData()
			model.set 'data', randomData,
				silent: true				

		if model.get('generators.textGen').isDefault
			#set new random text options to model
			randomTextOptions = generateRandomTextOptions()
			model.set 'generators.textGen', randomTextOptions,
				silent: true			

		model.attributes

	renderText = (svg, model) ->
		# if fontFamily is 'sans-serif'
		# 	font = fontFamily
		# else 
		# 	font = '"'+fontFamily+'"'

		# switch textAlign
		# 	when 'left'
		# 		x = textBlockOptions.padding.left
		# 		y = textBlockOptions.padding.top
		# 	when 'center' 
		# 		x = canvas.width/2
		# 		y = textBlockOptions.padding.top
		# 	when 'right'
		# 		x = canvas.width-textBlockOptions.padding.right
		# 		y = textBlockOptions.padding.top
		data = model.get 'data'

		String.prototype.insert = (index, string) ->
			if (index > 0)
				return @substring(0, index) + string + @substring(index, @length);
			else
				return string + @		


		flowText = (string, maxWidth, font) ->
			paragraphBuffer = ''
			stringBuffer = ''
			words = string.split ' '


			# TODO Clear stringbuffer after enter
	
			measureText = (string) ->
				testText = svg.text(string).font font
				width = testText.bbox().width
				testText.remove()
				width

			for word in words
				testString = if paragraphBuffer.length < 1 then "#{word}" else "#{paragraphBuffer} #{word}"
				testWidth = measureText testString
				# console.log width, maxWidth

				if testWidth > maxWidth
					console.log 'enter apended', word
					console.log testWidth, maxWidth
					paragraphBuffer = "#{paragraphBuffer}\n#{word}"
				else
					paragraphBuffer = testString

			# console.log paragraphBuffer
			paragraphBuffer		

		maxWidth = $(svg.node).width()+100


		headingProperties = 
			paddingTop: 20
			paddingBottom: 0
			paddingLeft: 0
			paddingRight: 0
			marginTop: 0
			lineHeight: 1
			font:
				size: 30

		infoProperties = 
			paddingTop: 0
			paddingBottom: 0
			paddingLeft: 0
			paddingRight: 0
			marginTop: 0
			lineHeight: 1
			font:
				size: 20		
		
		buildHeadingText = ->
			data.sex = data.sex
			data.name = data.name
			data.surname = data.surname

			template = prepareInitials data.sex, data.name, data.surname

			text = flowText template, maxWidth, headingProperties.font
			text

		buildInfoText = ->

			data.eMail = data.eMail
			data.phone = data.phone
			data.position = data.position

			template = "E-mail: #{ data.eMail } \nТелефон: #{ data.phone } \nДолжность: #{ data.position }"

			paragraphs = template.split '\n'

			textBlockBuffer = []
			for paragraph in paragraphs
				paragraph = paragraph.trim()
				paragraph = flowText paragraph, maxWidth, infoProperties.font
				textBlockBuffer.push paragraph

			paragraphs = textBlockBuffer.join('\n') 
			paragraphs


		heading = svg.text( buildHeadingText() )
		.leading( headingProperties.lineHeight )
		.fill('#232')
		.move headingProperties.paddingRight, headingProperties.paddingTop
		.font headingProperties.font

		top = $(heading.node).height()

		info = svg.text( buildInfoText() )
		.leading( infoProperties.lineHeight )
		.fill('#232')
		.move infoProperties.paddingRight, infoProperties.paddingTop+headingProperties.paddingTop+top+infoProperties.marginTop
		.font infoProperties.font

		

	# Public methods
	@draw = (svg,model,args...) ->

		prepareData.call @, model

		renderText.call @, svg, model, args	

