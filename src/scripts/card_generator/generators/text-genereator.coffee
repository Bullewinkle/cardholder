@app.module 'CardGenerator.generators.textGen', (TextGen, app, Backbone, Marionette, $, _) ->
	@draw = (canvas,model,args...) ->
		# get current text ptions and card info from model
		srcData = dataFromServer.appData
		srcData.textAligns = ['left','center','right']
		fontsList = srcData.fontsList
		textOptions = model.get 'generators.textGen'
		cardData = model.get 'data'
		
		# card info
		name = cardData.name
		surname = cardData.surname
		sex = cardData.sex
		phone = cardData.phone
		eMail = cardData.eMail
		position = cardData.position
		
		# text ptions
		textAlign = textOptions.textAlign
		fontFamily = textOptions.fontFamily


		titleColor = "rgb(#{ app.getRandom(0, 120) },#{ app.getRandom(0, 120) },#{ app.getRandom(0, 120) })"
		bodyColor = "rgb(#{ app.getRandom(0, 160) },#{ app.getRandom(0, 160) },#{ app.getRandom(0, 160) })"


		textBlockOptions = unless app.CardGenerator.renderingPDF
			padding:
				top: app.getRandom(5, 40, 2)
				left: app.getRandom(5, 50, 2)
				bottom: 0
				right: app.getRandom(5, 50, 2)
			title:
				fontSize: "#{app.getRandom(1, 2.5, 2)}em"
				color: titleColor
				textBaseline: 'middle' 
				# lineWidth: 1.5
				# lineWidth: app.getRandom(1, 2, 2)
				# lineHeight: 28
				lineHeight: app.getRandom(18, 40 , 2)
			body:
				# fontSize: '0.8em'
				fontSize: "#{app.getRandom(0.5, 1.5, 2)}em"
				color: bodyColor
				textBaseline: 'middle' 
				# lineWidth: 1.5
				# lineWidth: app.getRandom(1, 2, 2)
				# lineHeight: 18
				lineHeight: app.getRandom(10, 30 , 2)
		else
			# padding:
			# 	top: 80
			# 	left: 30
			# 	bottom: 0
			# 	right: 30
			# title:
			# 	fontSize: '6em'
			# 	color: '#000'
			# 	textBaseline: 'middle' 
			# 	lineWidth: 1.5
			# 	lineHeight: 74
			# body:
			# 	fontSize: '2.4em'
			# 	color: '#000'
			# 	textBaseline: 'middle' 
			# 	lineWidth: 1.5
			# 	lineHeight: 36
			padding:
				top: app.getRandom(15, 80, 2)
				left: app.getRandom(15, 70, 2)
				bottom: 0
				right: app.getRandom(15, 70, 2)
			title:
				fontSize: "#{app.getRandom(4, 8, 2)}em"
				color: titleColor
				textBaseline: 'middle' 
				# lineWidth: 1.5
				lineHeight: app.getRandom(54, 130 , 2)
			body:
				fontSize: "#{app.getRandom(1.8, 4, 2)}em"
				color: bodyColor
				textBaseline: 'middle' 
				# lineWidth: 1.5
				lineHeight: app.getRandom(26, 80 , 2)


		context = canvas.getContext('2d')

		renderText = (fontFamily) =>
			if fontFamily is 'sans-serif'
				font = fontFamily
			else 
				font = '"'+fontFamily+'"'

			switch textAlign
				when 'left'
					x = textBlockOptions.padding.left
					y = textBlockOptions.padding.top
				when 'center' 
					x = canvas.width/2
					y = textBlockOptions.padding.top
				when 'right'
					x = canvas.width-textBlockOptions.padding.right
					y = textBlockOptions.padding.top				
			paragraphHeight = 0
			wrapText = (context, text, x, y, maxWidth, lineHeight) ->
				words = text.split(' ')
				line = ''
				linesCounter = 0
				for word in words
					# console.log word,_i
					linesCounter = _i+1
					testLine = line + word + ' '
					metrics = context.measureText(testLine)
					testWidth = metrics.width
					if  testWidth > maxWidth and _i > 0
						context.fillText(line, x, y)
						line = word + ' '
						y += lineHeight
					else
						line = testLine
					paragraphHeight = y
				context.fillText(line, x, y)

			context.font = "#{ textBlockOptions.title.fontSize } #{ font }"
			context.textAlign = textAlign
			context.fillStyle = textBlockOptions.title.color
			context.textBaseline = textBlockOptions.title.textBaseline
			context.lineWidth = textBlockOptions.title.lineWidth

			wrapText context , @renderInitials(sex, name, surname), x, y, canvas.width-(textBlockOptions.padding.left+textBlockOptions.padding.right), textBlockOptions.title.lineHeight

			context.font = "#{ textBlockOptions.body.fontSize } #{ font }"
			context.fillStyle = textBlockOptions.body.color
			# console.log 'card №' + model.get('id') + ' : ' + font.split('"').join('')
			y+= paragraphHeight + (app.getRandom(0,30))
			context.fillText "тел.: #{phone}", x, y
			# wrapText context, "тел.: #{phone}", x, y, canvas.width-(textBlockOptions.padding.left+textBlockOptions.padding.right), textBlockOptions.body.lineHeight
			
			y+= textBlockOptions.body.lineHeight
			context.fillText "email: #{eMail}", x, y
			# wrapText context, "email: #{eMail}", x, y, canvas.width-(textBlockOptions.padding.left+textBlockOptions.padding.right), textBlockOptions.body.lineHeight
			
			y+= textBlockOptions.body.lineHeight
			wrapText context , position, x, y, canvas.width-(textBlockOptions.padding.left+textBlockOptions.padding.right), textBlockOptions.body.lineHeight

			context.save()

		# generateRandomCardInfo			
		# generateRandomCardInfo = (cardData) ->


		if cardData.isDefault or textOptions.isDefault
			#generate new random cardData
			randomCardData =
				isDefault: false

			#local variables
			randomNameNum = app.getRandom(0, srcData.names.length-1 )
			randomPhoneEnd = app.getRandom(0, srcData.names.length-1 )
			randomPhoneEnd = '0' + randomPhoneEnd if (''+ randomPhoneEnd).length < 2 
			#end local variables

			randomCardData.sex = srcData.names[ randomNameNum ].sex
			randomCardData.name =  srcData.names[ randomNameNum ].text
			randomCardData.surname =  srcData.surnames[ app.getRandom(0, srcData.surnames.length-1 ) ]
			randomCardData.eMail =  srcData.emails[ app.getRandom(0, srcData.emails.length-1 ) ]
			randomCardData.position =  srcData.positions[ app.getRandom(0, srcData.positions.length-1 ) ]
			randomCardData.phone = '+7-' + srcData.phones + randomPhoneEnd

			#set new random cardData to model
			model.set 'data', randomCardData,
				silent: true

			#generate new random text options
			randomTextOptions =
				isDefault: false

			randomTextOptions.textAlign = srcData.textAligns[app.getRandom(0,srcData.textAligns.length-1)]
			# randomTextOptions.fontFamily = ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]
			randomTextOptions.fontFamily = fontFamily


			# # Load fonts dinamicaly through google web loader
			# WebFont.load
			# 	custom:
			# 		families: [randomTextOptions.fontFamily]
			# 		urls: ['/assets/font/card_fonts/' + randomTextOptions.fontFamily + '/' + randomTextOptions.fontFamily + '.css']
			# 	fontloading:  =>
			# 		# console.log 'fontloading:\t', arguments
			# 	fontactive: (fontFamily, fontOptions)  =>
			# 		# console.info 'fontactive:\t \t', fontFamily, @
			# 		@draw(canvas, model)
			# 	fontinactive:  =>
			# 		# console.warn 'fontinactive:\t \t', arguments
			# 		@draw(canvas, model)
			
			#set new random text options to model
			model.set 'generators.textGen', randomTextOptions,
				silent: true

			@draw(canvas, model)

		else 
			renderText(fontFamily)


	@renderInitials = (sex, name, surname) ->

		if sex is 'male'
			surname = surname

		else if sex is 'female'
			if surname.substr(surname.length-2,surname.length) is 'ий'
				surname = surname.slice(0,surname.length-2)
				surname = surname+'ая'
			else
				surname = surname+'a' 
		name + ' ' + surname			
