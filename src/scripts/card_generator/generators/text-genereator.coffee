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

		if window.renderingPDF
			textBlockOptions = 
				margin:
					top: 80
					left: 30
					bottom: 0
					right: 30

				title:
					fontSize: '6em'
					color: '#000'
					textBaseline: 'middle' 
					lineWidth: 1.5
					lineHeight: 74
				
				info:
					fontSize: '2.4em'
					color: '#000'
					textBaseline: 'middle' 
					lineWidth: 1.5
					lineHeight: 36
		else
			textBlockOptions = 
					margin:
						top: 30
						left: 20
						bottom: 0
						right: 20

					title:
						fontSize: '1.5em'
						color: '#000'
						textBaseline: 'middle' 
						lineWidth: 1.5
						lineHeight: 28
					
					info:
						fontSize: '0.8em'
						color: '#000'
						textBaseline: 'middle' 
						lineWidth: 1.5
						lineHeight: 18


		context = canvas.getContext('2d')

		renderText = (fontFamily) =>
			if fontFamily is 'sans-serif'
				font = fontFamily
			else 
				font = '"'+fontFamily+'"'
			switch textAlign
				when 'left'
					x = textBlockOptions.margin.left
					y = textBlockOptions.margin.top
				when 'center' 
					x = canvas.width/2
					y = textBlockOptions.margin.top
				when 'right'
					x = canvas.width-textBlockOptions.margin.right
					y = textBlockOptions.margin.top
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

			wrapText context , @renderInitials(sex, name, surname), x, y, canvas.width-(textBlockOptions.margin.left+textBlockOptions.margin.right), textBlockOptions.title.lineHeight

			context.font = "#{ textBlockOptions.info.fontSize } #{ font }"
			# console.log 'card №' + model.get('id') + ' : ' + font.split('"').join('')
			if textAlign is 'right' then x-=textBlockOptions.margin.left
			y+= paragraphHeight

			# context.fillText "тел.: #{phone}", x, y
			wrapText context, "тел.: #{phone}", x, y, canvas.width-(textBlockOptions.margin.left+textBlockOptions.margin.right), textBlockOptions.info.lineHeight
			y+= textBlockOptions.info.lineHeight

			# context.fillText "email: #{eMail}", x, y
			wrapText context, "email: #{eMail}", x, y, canvas.width-(textBlockOptions.margin.left+textBlockOptions.margin.right), textBlockOptions.info.lineHeight
			y+= textBlockOptions.info.lineHeight

			if textAlign is 'right' then x+=textBlockOptions.margin.left
			wrapText context , position, x, y, canvas.width-(textBlockOptions.margin.left+textBlockOptions.margin.right), textBlockOptions.info.lineHeight

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
