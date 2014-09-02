@app.module 'CardGenerator.generators.starsGen', (StarsGen) ->

	@options = 
		counter: 0
		starsAmount: 0
	
	@draw = (canvas,model,args...) ->
		star = (context, xCenter, yCenter, nPoints, outerRadius, innerRadius) =>

			context.beginPath()
			ixVertex = 0

			while ixVertex <= 2 * nPoints
				angle = ixVertex * Math.PI / nPoints - Math.PI / 2
				radius = (if ixVertex % 2 is 0 then innerRadius else outerRadius)
				context.lineTo xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle)
				++ixVertex
			return	

		if @options.starsAmount is 0 then @options.starsAmount = app.getRandom( 3, 20 )

		context = canvas.getContext '2d'		
		
		xCenter = app.getRandom( 0, canvas.width )
		yCenter = app.getRandom( 0, canvas.height )
		nPoints = app.getRandom( 3, 20 )
		outerRadius = app.getRandom( canvas.width/6, canvas.width/2 )
		innerRadius = app.getRandom( canvas.width/10, canvas.width/14 )

		colors = model.get 'generators.gradientGen.colorScheme'

		randomColorNum = app.getRandom 0, colors.length - 1
		randomColor = colors[ randomColorNum ]

		context.beginPath()
		
		star(context, xCenter, yCenter, nPoints, outerRadius, innerRadius)

		context.fillStyle = '#' + randomColor
		context.fill()

		@options.counter++
		# while @options.counter <= @options.starsAmount then @draw canvas, model
		# save options to current model