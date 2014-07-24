app.registerGenerator 'textGen', (Generator) ->
	gen = new Generator
		options: {}
		methods:

			draw: (canvas,model,args...) ->
				options = model.get 'generators.' + @name
				cardData = model.get 'data'

				srcData = app.data.attributes

				name = model.get 'data.name'
				surname = model.get 'data.surname'
				sex = model.get 'data.sex'
				phone = model.get 'data.phone'
				eMail = model.get 'data.eMail'
				position = model.get 'data.position'

				textAligns = ['left','center','right']
				textAlign = options.textAlign
				fontsList = app.data.get 'fontsList'
				fontFamily = options.fontFamily

				context = canvas.getContext('2d')

				renderText = (fontFamily) ->
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

					# console.log 'card №' + model.get('id') + ' : ' + font.split('"').join('')
					context.font = '0.8em ' + font
					if textAlign is 'right' then x-=5
					context.fillText 'тел.: ' + phone, x, 32 +paragrafHeight
					context.fillText 'email: '+ eMail, x, 49 +paragrafHeight
					if textAlign is 'right' then x+=5
					wrapText context , position, x, 66 + paragrafHeight, canvas.width-20, 18

					context.save()

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


				if cardData.defaultData
					newData = {}
					randomNameNum = app.getRandom(0, srcData.names.length-1 )

					name =  srcData.names[ randomNameNum ].text
					newData.name = name

					sex = srcData.names[ randomNameNum ].sex
					newData.sex = sex

					surname =  srcData.surnames[ app.getRandom(0, srcData.surnames.length-1 ) ]
					newData.surname = surname

					randomPhoneEnd = app.getRandom(0, srcData.names.length-1 )
					if (''+ randomPhoneEnd).length < 2 
						randomPhoneEnd = '0' + randomPhoneEnd
					phone = '+7-' + srcData.phones + randomPhoneEnd
					newData.phone = phone

					eMail =  srcData.emails[ app.getRandom(0, srcData.emails.length-1 ) ]
					newData.eMail = eMail

					position =  srcData.positions[ app.getRandom(0, srcData.positions.length-1 ) ]
					newData.position = position

					newData.defaultData = false
					model.set 'data', newData,
						silent: true

				if options.defaultOptions

					textAlign = textAligns[app.getRandom(0,textAligns.length-1)]
					model.set 'generators.'+@name+'.textAlign', textAlign,
						silent: true
					randomFontNumber = app.getRandom(0,app.data.get 'fontsList' .length-1)
					randomFont = app.data.get 'fontsList'
					fontFamily = ''+ randomFont[randomFontNumber]

					# Load fonts dinamicaly through google web loader
					WebFont.load

						custom:
							families: [fontFamily]
							urls: ['/assets/font/card_fonts/' + fontFamily + '/' + fontFamily + '.css']
						active: =>
							renderText(fontFamily)
							model.set 'generators.' + @name + '.fontFamily', fontFamily,
								silent: true
						loading: =>
						fontloading: =>
						fontactive: =>
						inactive: =>	
							renderText( model.defaults.generators[ @name ].fontFamily )
							console.log 'INACTIVE FONT : ' + fontFamily
						fontinactive: =>

				
				else
					renderText(fontFamily)

				model.set 'generators.'+@name+'.defaultOptions', false,
					silent: true

	return gen