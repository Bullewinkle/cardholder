@app.module 'CardGenerator.generators.gradientGen', (GradientGen) ->

	@options = {}
	@gradientVariants = [
		#0
		(context,args...) ->

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)

		#1
		(context,args...) ->

			if !gen.options.defaultOptions
				randomVal1 = gen.options.definedVal1
			else if gen.options.defaultOptions
				randomVal1 = app.getRandom(0,gen.options.colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			context.fillStyle = '#'+gen.options.colorScheme[randomVal1]
			context.fillRect(0,0,context.canvas.width,context.canvas.height)

			# save options to current model
			gen.options =
				definedVal1: randomVal1

		#2
		(context,args...) ->

			if !gen.options.defaultOptions
				randomVal1 = gen.options.definedVal1
			else if gen.options.defaultOptions
				randomVal1 = app.getRandom(0,gen.options.colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			context.fillStyle = '#'+gen.options.colorScheme[randomVal1]
			context.fillRect(0,0,context.canvas.width/2,context.canvas.height)

			# save options to current model
			gen.options =
				definedVal1: randomVal1

		#3
		(context,args...) ->

			if !gen.options.defaultOptions
				randomVal1 = gen.options.definedVal1
			else if gen.options.defaultOptions
				randomVal1 = app.getRandom(0,gen.options.colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			context.fillStyle = '#'+gen.options.colorScheme[randomVal1]
			context.fillRect(0,context.canvas.height/2,context.canvas.width,context.canvas.height)

			# save options to current model
			gen.options =
				definedVal1: randomVal1

		#4
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme

				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,canvas.width,canvas.height)

			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height*1.5);
			gradient.addColorStop(0.000, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(0.200, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(0.800, '#' + colorScheme[randomVal2] )
			gradient.addColorStop(1.000, '#' + colorScheme[randomVal2] )

			context.beginPath()
			context.moveTo(canvas.width*75/100,0)
			context.lineTo(canvas.width,0)
			context.lineTo(canvas.width,canvas.height)
			context.lineTo(canvas.width/2,canvas.height)
			context.lineTo(canvas.width*75/100,0)
			context.closePath()
			context.lineWidth = 0.5
			context.strokeStyle = gradient
			context.stroke()
			context.fillStyle = gradient
			context.fill()

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				# colorScheme: colorScheme

		#5
		(context,args...) ->

			if !gen.options.defaultOptions
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
			else if gen.options.defaultOptions
				randomVal1 = app.getRandom(0,gen.options.colorScheme.length-1)
				randomVal2 = app.getRandom(0.6,0.9,2)

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			context.fillStyle = '#'+gen.options.colorScheme[randomVal1]
			context.fillRect(0,context.canvas.height*randomVal2 ,context.canvas.width,context.canvas.height)

			# save options to current model
			gen.options =
				definedVal1: randomVal1


				definedVal2: randomVal2

		#6
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,canvas.width,canvas.height)
			context.rect( canvas.width*10/100, 0, canvas.width*40/100, canvas.height)
			gradient = context.createLinearGradient( 0, canvas.height/2, canvas.width, canvas.height/2);
			gradient.addColorStop(0.000, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(1.000, '#' + colorScheme[randomVal2] )
			context.fillStyle = gradient
			context.fill()

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				# colorScheme: colorScheme

		#7
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme

				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,canvas.width,canvas.height)
			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height*0.25);
			gradient.addColorStop(0.000, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(0.495, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(0.000, '#' + colorScheme[randomVal2] )
			gradient.addColorStop(0.500, '#' + colorScheme[randomVal2] )

			context.beginPath()
			context.moveTo(0,0)
			context.lineTo(canvas.width*20/100,0)
			context.lineTo(canvas.width*37/100,canvas.height)
			context.lineTo(0,canvas.height)
			context.lineTo(0,0)
			context.closePath()
			context.lineWidth = 0.5
			context.strokeStyle = gradient
			context.stroke()
			context.fillStyle = gradient
			context.fill()

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				# colorScheme: colorScheme

		#8
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
				randomVal3 = gen.options.definedVal3
				randomVal4 = gen.options.definedVal4
				randomVal5 = gen.options.definedVal5
				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)
				randomVal3 = app.getRandom(0,colorScheme.length-1)
				randomVal4 = app.getRandom(0,colorScheme.length-1)
				randomVal5 = app.getRandom(0,colorScheme.length-1)
				# TODO generate random gradientType!
				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createRadialGradient(canvas.width, canvas.height, 0.000, canvas.width, canvas.height, 80.000)

			# Add colors
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.200, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.215, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.400, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.415, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.600, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.615, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.800, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.815, '#' + colorScheme[randomVal5]
			gradient.addColorStop 0.960, '#' + colorScheme[randomVal5]
			gradient.addColorStop 1.000, "rgba(255, 255, 255, 1.000)"

			context.fillStyle = gradient
			context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				definedVal3: randomVal3
				definedVal4: randomVal4
				definedVal5: randomVal5

		#9
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
				randomVal3 = gen.options.definedVal3
				randomVal4 = gen.options.definedVal4

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)
				randomVal3 = app.getRandom(0,colorScheme.length-1)
				randomVal4 = app.getRandom(0,colorScheme.length-1)

				# TODO generate random gradientType!
				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createRadialGradient(canvas.width+5, canvas.height/2, 0.000, canvas.width+5, canvas.height/2, 120.000)

			# Add colors
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.073, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.080, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.235, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.250, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.485, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.500, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.735, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.750, "rgba(255, 255, 255, 1.000)"
			gradient.addColorStop 1.000, "rgba(255, 255, 255, 1.000)"

			context.fillStyle = gradient
			context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				definedVal3: randomVal3
				definedVal4: randomVal4

		#10
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
				randomVal3 = gen.options.definedVal3
				randomVal4 = gen.options.definedVal4

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)
				randomVal3 = app.getRandom(0,colorScheme.length-1)
				randomVal4 = app.getRandom(0,colorScheme.length-1)

				# TODO generate random gradientType!
				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createRadialGradient(canvas.width/2, canvas.height-8, 0.000, canvas.width/2, canvas.height+200, 270.000)

			# Add colors
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.073, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.085, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.235, '#' + colorScheme[randomVal2]
			gradient.addColorStop 0.250, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.480, '#' + colorScheme[randomVal3]
			gradient.addColorStop 0.500, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.735, '#' + colorScheme[randomVal4]
			gradient.addColorStop 0.750, "rgba(255, 255, 255, 1.000)"
			gradient.addColorStop 1.000, "rgba(255, 255, 255, 1.000)"

			context.fillStyle = gradient
			context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				definedVal3: randomVal3
				definedVal4: randomVal4

		#11
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createRadialGradient(canvas.width/2, 0 , 0.000, canvas.width/2, 0-310, 400.000)
			gradient.addColorStop 0.000, '#fff'
			gradient.addColorStop 0.730, '#fff'
			gradient.addColorStop 0.750, '#' + colorScheme[randomVal1]
			gradient.addColorStop 1.000, '#' + colorScheme[randomVal1]

			context.fillStyle = gradient
			context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1

		#12
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
				randomVal3 = gen.options.definedVal3

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)
				randomVal3 = app.getRandom(40,150)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createRadialGradient(canvas.width/2, canvas.height/2 , 0.000, canvas.width/2, canvas.height/2, randomVal3)

			# Add colors
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.735, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.750, '#' + colorScheme[randomVal2]
			gradient.addColorStop 1.000, '#' + colorScheme[randomVal2]

			context.fillStyle = gradient
			context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				definedVal3: randomVal3

		#13
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height/2+42)

			# Add colors
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.550, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.750, '#' + colorScheme[randomVal2]
			gradient.addColorStop 1.000, '#' + colorScheme[randomVal2]

			context.fillStyle = gradient
			context.lineWidth = 0.5
			context.strokeStyle = gradient

			context.beginPath()
			context.moveTo canvas.width*67/100,0
			context.lineTo canvas.width*71/100,0
			context.lineTo canvas.width*61/100,canvas.height
			context.lineTo canvas.width*57/100,canvas.height
			context.lineTo canvas.width*67/100,0

			context.moveTo canvas.width*74/100,0
			context.lineTo canvas.width*81/100,0
			context.lineTo canvas.width*71/100,canvas.height
			context.lineTo canvas.width*64/100,canvas.height

			context.closePath()
			context.stroke()
			context.fill()

			# Fill with gradient
			# context.fillStyle = gradient
			# context.fillRect 0, 0, canvas.width, canvas.height

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2

		#14
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2
			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

			context.fillStyle = '#fff'
			context.fillRect(0,0,canvas.width,canvas.height)
			context.rect( 0,canvas.height*50/100, canvas.width, canvas.height*40/100)
			gradient = context.createLinearGradient( canvas.width/2, 0 , canvas.width/2, canvas.height);
			gradient.addColorStop(0, '#' + colorScheme[randomVal1] )
			gradient.addColorStop(1, '#' + colorScheme[randomVal2] )
			context.fillStyle = gradient
			context.fill()

			# save options to current model
			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2
				# colorScheme: colorScheme

		#15
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height/2+42)

			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 0.500, '#' + colorScheme[randomVal2]

			context.fillStyle = gradient
			context.lineWidth = 0.5
			context.strokeStyle = gradient

			context.beginPath()
			context.moveTo 0,0
			context.lineTo canvas.width*20/100,0
			context.lineTo canvas.width*30/100,canvas.height/2.5
			context.lineTo canvas.width*20/100,canvas.height
			context.lineTo 0,canvas.height
			context.lineTo 0,0

			context.closePath()
			context.stroke()
			context.fill()

			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2

		#16
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height/2+42)

			# Add colors
			gradient.addColorStop 0.500, '#' + colorScheme[randomVal1]
			gradient.addColorStop 1.000, '#' + colorScheme[randomVal2]

			context.fillStyle = gradient
			context.lineWidth = 0.5
			context.strokeStyle = gradient

			context.beginPath()
			context.moveTo canvas.width*70/100,0
			context.lineTo canvas.width,0
			context.lineTo canvas.width,canvas.height
			context.lineTo canvas.width*70/100,canvas.height
			context.lineTo canvas.width*80/100,canvas.height/2.5
			context.lineTo canvas.width*70/100,0

			context.closePath()
			context.stroke()
			context.fill()

			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2

		#18
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			gradient = context.createLinearGradient(0, canvas.height/2, canvas.width, canvas.height/2+42)
			gradient.addColorStop 0.000, '#' + colorScheme[randomVal1]
			gradient.addColorStop 1.000, '#' + colorScheme[randomVal2]

			context.fillStyle = gradient
			context.lineWidth = 0.5
			context.strokeStyle = gradient

			context.rect(canvas.width*30/100,canvas.height*22/100,canvas.width*65/100,canvas.height*70/100)

			context.closePath()
			context.stroke()
			context.fill()

			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2

		#19 Stars
		(context,args...) ->

			canvas = context.canvas

			if !gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = gen.options.definedVal1
				randomVal2 = gen.options.definedVal2

				gradientType = gen.options.gradientType

			else if gen.options.defaultOptions
				colorScheme = gen.options.colorScheme
				randomVal1 = app.getRandom(0,colorScheme.length-1)
				randomVal2 = app.getRandom(0,colorScheme.length-1)

				gradientType = gen.options.gradientType

			context.fillStyle = '#fff'
			context.fillRect(0,0,context.canvas.width,context.canvas.height)
			
			#    drawStar(ctx, canvas.width/2, canvas.height/2, 1000,30, 300);
			star = (context, xCenter, yCenter, nPoints, outerRadius, innerRadius) ->
				context.beginPath()
				ixVertex = 0

				while ixVertex <= 2 * nPoints
					angle = ixVertex * Math.PI / nPoints - Math.PI / 2
					radius = (if ixVertex % 2 is 0 then innerRadius else outerRadius)
					context.lineTo xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle)
					++ixVertex
				return

			context.beginPath()
			context.fillStyle = "#C40043"
			context.arc canvas.width / 2, canvas.height / 2, canvas.width/4, 0, Math.PI * 2
			context.fill()
			context.fillStyle = "green"
			star context, canvas.width / 2, canvas.height / 2, 9, canvas.width/3, 10
			context.fill()

			gen.options =
				definedVal1: randomVal1
				definedVal2: randomVal2

		# Импровизация
		# (context,args...) ->
		# 	if !gen.options.defaultOptions
		# 		colorScheme = gen.options.colorScheme
		# 		randomVal1 = gen.options.definedVal1
		# 		randomVal2 = gen.options.definedVal2
		# 		randomVal3 = gen.options.definedVal3
		# 		randomVal4 = gen.options.definedVal4
		# 		randomVal5 = gen.options.definedVal5
		# 		randomVal6 = gen.options.definedVal6
		# 		gradientType = gen.options.gradientType

		# 	else if gen.options.defaultOptions
		# 		colorScheme = gen.options.colorScheme
		# 		randomVal1 = app.getRandom(0,colorScheme.length-1)
		# 		randomVal2 = app.getRandom(0,colorScheme.length-1)
		# 		randomVal3 = app.getRandom(0, 150)
		# 		randomVal4 = app.getRandom(0, 150)
		# 		randomVal5 = app.getRandom(0, 150)
		# 		randomVal6 = app.getRandom(0, 150)
		# 		# TODO generate random gradientType!
		# 		gradientType = gen.options.gradientType

		# 	context.fillStyle = '#fff'
		# 	context.fillRect(0,0,context.canvas.width,context.canvas.height)
		# 	if gradientType is 'linear'
		# 		gradient = context.createLinearGradient(randomVal3,randomVal4,randomVal5,randomVal6)
		# 	else if gradientType is 'radial'
		# 		gradient = context.createRadialGradient(150,75,50,150,75,49)
		# 	gradient.addColorStop(0,'#'+colorScheme[randomVal1])
		# 	gradient.addColorStop(1,'#'+colorScheme[randomVal2])
		# 	context.fillStyle = gradient
		# 	context.fillRect(0,0,context.canvas.width,context.canvas.height)

		# 	# save options to current model
		# 	gen.options =
		# 		definedVal1: randomVal1
		# 		definedVal2: randomVal2
		# 		definedVal3: randomVal3
		# 		definedVal4: randomVal4
		# 		definedVal5: randomVal5
		# 		definedVal6: randomVal6

		# Импровизация 2
		# (context,args...) ->
		# 	if !gen.options.defaultOptions
		# 		colorScheme = gen.options.colorScheme
		# 		randomVal1 = gen.options.definedVal1
		# 		randomVal2 = gen.options.definedVal2
		# 		randomVal3 = gen.options.definedVal3
		# 		randomVal4 = gen.options.definedVal4
		# 		randomVal5 = gen.options.definedVal5
		# 		gradientType = gen.options.gradientType

		# 	else if gen.options.defaultOptions
		# 		colorScheme = gen.options.colorScheme
		# 		randomVal1 = app.getRandom(50,250)
		# 		randomVal2 = app.getRandom(50,250)
		# 		randomVal3 = app.getRandom(50,200)
		# 		randomVal4 = app.getRandom(50,200)
		# 		randomVal5 = 150
		# 		# TODO generate random gradientType!
		# 		gradientType = gen.options.gradientType

		# 	context.fillStyle = '#fff'
		# 	context.fillRect(0,0,context.canvas.width,context.canvas.height)
		# 	# if gradientType is 'linear'
		# 	# 	gradient = context.createLinearGradient(randomVal3,randomVal4,randomVal5,randomVal6)
		# 	# else if gradientType is 'radial'
		# 	# 	gradient = context.createRadialGradient(150,75,50,150,75,49)

		# 	grd = context.createRadialGradient( randomVal1, randomVal2, 0.000, randomVal3, randomVal4, randomVal5)

		# 	# Add colors
		# 	grd.addColorStop 0.000, "rgba(14, 14, 16, 1.000)"
		# 	grd.addColorStop 0.170, "rgba(14, 14, 16, 1.000)"
		# 	grd.addColorStop 0.270, "rgba(96, 109, 91, 1.000)"
		# 	grd.addColorStop 0.610, "rgba(75, 93, 103, 1.000)"
		# 	grd.addColorStop 0.620, "rgba(75, 93, 103, 1.000)"
		# 	grd.addColorStop 0.690, "rgba(255, 250, 250, 1.000)"
		# 	grd.addColorStop 0.920, "rgba(255, 250, 250, 1.000)"
		# 	grd.addColorStop 0.930, "rgba(0, 0, 0, 1.000)"
		# 	grd.addColorStop 0.940, "rgba(255, 255, 255, 1.000)"

		# 	# Fill with gradient
		# 	context.fillStyle = grd
		# 	context.fillRect 0, 0, context.canvas.width, context.canvas.height

		# 	# save options to current model
		# 	gen.options =
		# 		definedVal1: randomVal1
		# 		definedVal2: randomVal2
		# 		definedVal3: randomVal3
		# 		definedVal4: randomVal4
		# 		definedVal5: randomVal5



			# Create gradient
	]

	@draw = (canvas,model,args...) ->
		# console.log @options
		initColorScheme = ->
			scm = new ColorScheme()
			hue = app.getRandom(0.2, 359, 1)

			variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale' ]
			variation = variations[ app.getRandom(0, variations.length-1) ]
			console.log variation
			scm.from_hue(hue)
			.scheme('tetrade')
			.distance(0.1)
			.add_complement(false)
			.variation(variation)
			.web_safe(false)
			scm.colors()

		context = canvas.getContext("2d")
		$.extend( @options, model.get 'generators.gradientGen' )
		# console.log model
		if model.get 'generators.gradientGen.defaultOptions'
			gen.options.colorScheme = initColorScheme()
			console.log gen.options.colorScheme
			randomVariant = app.getRandom(0, @gradientVariants.length-1)

			@gradientVariants[ randomVariant ](context)
			@options.gradientVariantNum = randomVariant

			@options.defaultOptions = false

		else if !model.get 'generators.gradientGen.defaultOptions'

			@defaultOptions = false
			predefinedVariant = model.get 'generators.'+ @name+ '.gradientVariantNum'
			@gradientVariants[ predefinedVariant ](context)

		model.set 'generators.gradientGen', gen.options,
			silent: true


