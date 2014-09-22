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