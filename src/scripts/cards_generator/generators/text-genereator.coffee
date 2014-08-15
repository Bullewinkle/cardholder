@app.module 'CardGenerator.generators.textGen', (TextGen, app, Backbone, Marionette, $, _) ->
	# TODO make text rendering with out triggering Resize (yes, it is posible)
	@draw = (canvas,model,args...) ->
		# get current text ptions and card info from model
		srcData = app.CardGenerator.data.get 'appdata'
		srcData.textAligns = ['left','center','right']
		fontsList = app.CardGenerator.data.get 'fontsList'
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

		renderText = (fontFamily) ->
			console.log 'render'
			fontFamily = 'sans-serif'
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

			wrapText context , renderInitials(name, surname), x, y, canvas.width-20, 28

			context.font = '0.8em ' + font
			# console.log 'card №' + model.get('id') + ' : ' + font.split('"').join('')
			if textAlign is 'right' then x-=5
			context.fillText 'тел.: ' + phone, x, 32 +paragrafHeight
			context.fillText 'email: '+ eMail, x, 49 +paragrafHeight
			if textAlign is 'right' then x+=5
			wrapText context , position, x, 66 + paragrafHeight, canvas.width-20, 18

			context.save()

		# generateRandomCardInfo
		renderInitials = (name, surname) ->

			if sex is 'male'
				surname = surname

			else if sex is 'female'
				if surname.substr(surname.length-2,surname.length) is 'ий'
					surname = surname.slice(0,surname.length-2)
					surname = surname+'ая'
				else
					surname = surname+'a' 
			name + ' ' + surname					
		generateRandomCardInfo = (cardData) ->

		if cardData.isDefault
			cardData
			# console.log 'cardData default'
			#add all new values to this object
			randomCardInfo =
				isDefault: false

			#local variables
			randomNameNum = app.getRandom(0, srcData.names.length-1 )
			randomPhoneEnd = app.getRandom(0, srcData.names.length-1 )
			randomPhoneEnd = '0' + randomPhoneEnd if (''+ randomPhoneEnd).length < 2 
			#end local variables

			randomCardInfo.sex = srcData.names[ randomNameNum ].sex
			randomCardInfo.name =  srcData.names[ randomNameNum ].text
			randomCardInfo.surname =  srcData.surnames[ app.getRandom(0, srcData.surnames.length-1 ) ]
			randomCardInfo.eMail =  srcData.emails[ app.getRandom(0, srcData.emails.length-1 ) ]
			randomCardInfo.position =  srcData.positions[ app.getRandom(0, srcData.positions.length-1 ) ]
			randomCardInfo.phone = '+7-' + srcData.phones + randomPhoneEnd

			# set new card info to model
			model.set 'data', randomCardInfo,
				silent: true

		if textOptions.isDefault
			# console.log 'textOptions default', textOptions
			randomCardInfo =
				isDefault: false

			#local variables
			#end local variables

			randomCardInfo.textAlign = srcData.textAligns[app.getRandom(0,srcData.textAligns.length-1)]
			randomCardInfo.fontFamily = ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]
			# debugger;

			# Load fonts dinamicaly through google web loader
			WebFont.load
				custom:
					families: [randomCardInfo.fontFamily]
					urls: ['/assets/font/card_fonts/' + randomCardInfo.fontFamily + '/' + randomCardInfo.fontFamily + '.css']
				fontloading:  =>
					# console.log 'fontloading:\t', arguments
				fontactive: (fontFamily, fontOptions)  =>
					# console.log 'fontactive:\t \t', fontFamily
					renderText(fontFamily)
				fontinactive:  =>
					# console.log 'fontinactive:\t \t', arguments
					renderText( fontFamily )
			# set new card info to model
			model.set 'generators.textGen', randomCardInfo,
				silent: true

		else 
			console.warn 'not default!!!'
			renderText(fontFamily)

		model.set 'generators.textGen.isDefault', false,
			silent: true