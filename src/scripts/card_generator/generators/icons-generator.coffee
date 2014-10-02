@app.module 'CardGenerator.generators.iconsGen', (IconsGen) ->

	@options = 
		counter: 0
		starsAmount: 0
	
	@draw = (canvas,model,args...) ->
		drawIcon = ->
			iconsData.iconNum = iconsData.iconNum or app.getRandom 0, appIconsData.length-1
			iconsData.randomX = iconsData.randomX or app.getRandom 5, canvas.width
			iconsData.randomY = iconsData.randomY or app.getRandom 5, canvas.height
			iconsData.randomFontSize = iconsData.randomFontSize or app.getRandom 20, 100
			iconsData.randomColor = iconsData.randomColor or Kinetic.Util.getRandomColor()

			ctx.font = "#{ iconsData.randomFontSize }px cardholder-icons"
			ctx.fillStyle = iconsData.randomColor
			ctx.fillText appIconsData[iconsData.iconNum].content, iconsData.randomX, iconsData.randomY
			iconsData

		ctx = canvas.getContext '2d'

		iconsData = model.get('iconsData')
		iconsDataType = if ( _.isUndefined( iconsData ) or _.isEmpty( iconsData ) ) then 'notdefined' else 'defined' #this is needed to use little later

		if iconsDataType is 'notdefined' then iconsData = {}
		iconsData.amountOfIcons = iconsData.amountOfIcons or app.getRandom 1, 6
		
		drawIcon(i) for i in [0...iconsData.amountOfIcons]

		if iconsDataType is 'notdefined' then model.set 'iconsData', iconsData, silent: true
