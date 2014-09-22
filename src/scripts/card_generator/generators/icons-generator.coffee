@app.module 'CardGenerator.generators.iconsGen', (IconsGen) ->

	@options = 
		counter: 0
		starsAmount: 0
	
	@draw = (canvas,model,args...) ->
		ctx = canvas.getContext '2d'

		amountOfIcons = app.getRandom 0, 6
		getRandomIconNum =  ->
			iconNum = app.getRandom 0, appIconsData.length-1
			randomX = app.getRandom 5, canvas.width
			randomY = app.getRandom 5, canvas.height
			randomFontSize = app.getRandom 20, 200

			ctx.font = "#{randomFontSize}px cardholder-icons"
			ctx.fillStyle = Kinetic.Util.getRandomColor()
			ctx.fillText appIconsData[iconNum].content, randomX, randomY

		getRandomIconNum(i) for i in [0...amountOfIcons]



		# iconsData = model.get('iconsData')
		# iconsDataType = if ( _.isUndefined( iconsData ) or _.isEmpty( iconsData ) ) then 'undefined' else 'defined'
		# if iconsDataType is 'undefined' then iconsData = {}
		# iconsData.amountOfIcons = iconsData.amountOfIcons or app.getRandom 0, 6

		# getRandomIconNum = ->
		# 	console.log 'getRandomIconNum'
		# 	iconsData.iconNum = iconsData.iconNum or app.getRandom 0, appIconsData.length-1
		# 	iconsData.randomX = iconsData.randomX or app.getRandom 5, canvas.width
		# 	iconsData.randomY = iconsData.randomY or app.getRandom 5, canvas.height
		# 	iconsData.randomFontSize = iconsData.randomFontSize or app.getRandom 20, 200
		# 	iconsData.randomColor = iconsData.randomColor or Kinetic.Util.getRandomColor()

		# 	ctx.font = "#{randomFontSize}px cardholder-icons"
		# 	ctx.fillStyle = iconsData.randomColor
		# 	ctx.fillText appIconsData[iconsData.iconNum].content, iconsData.randomX, iconsData.randomY

		# getRandomIconNum() for i in [0...iconsData.amountOfIcons]

		# if iconsDataType is 'undefined'
		# 	console.log 'undefined - set data'
		# 	model.set 'iconsData', iconsData
		# else
		# 	console.log 'defined - DO NOT set data'