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

		context = canvas.getContext('2d')

		renderText = (fontFamily) =>
			if fontFamily is 'sans-serif'
				font = fontFamily
			else 
				font = '"'+fontFamily+'"'
			switch textAlign
				when 'left'
					x = 10
					y = 20
				when 'center' 
					x = canvas.width/2
					y = 20
				when 'right'
					x = canvas.width-10
					y = 20 
			paragrafHeight = 0
			
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
					paragrafHeight = y
					
				context.fillText(line, x, y)
			context.font = '1.5em ' + font
			context.textAlign = textAlign
			context.fillStyle = '#000'
			context.textBaseline = 'middle'
			context.lineWidth = 1.5

			wrapText context , @renderInitials(sex, name, surname), x, y, canvas.width-20, 28

			context.font = '0.8em ' + font
			# console.log 'card №' + model.get('id') + ' : ' + font.split('"').join('')
			if textAlign is 'right' then x-=5
			context.fillText 'тел.: ' + phone, x, 32 +paragrafHeight
			context.fillText 'email: '+ eMail, x, 49 +paragrafHeight
			if textAlign is 'right' then x+=5
			wrapText context , position, x, 66 + paragrafHeight, canvas.width-20, 18

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
			randomTextOptions.fontFamily = ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]


			# Load fonts dinamicaly through google web loader
			WebFont.load
				custom:
					families: [randomTextOptions.fontFamily]
					urls: ['/assets/font/card_fonts/' + randomTextOptions.fontFamily + '/' + randomTextOptions.fontFamily + '.css']
				fontloading:  =>
					# console.log 'fontloading:\t', arguments
				fontactive: (fontFamily, fontOptions)  =>
					# console.info 'fontactive:\t \t', fontFamily, @
					@draw(canvas, model)
				fontinactive:  =>
					# console.warn 'fontinactive:\t \t', arguments
					@draw(canvas, model)
			
			#set new random text options to model
			model.set 'generators.textGen', randomTextOptions,
				silent: true

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
