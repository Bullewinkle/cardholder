app.registerGenerator 'starsGen', (Generator) ->
	gen = new Generator		
		options: {}
		methods:
			variants: [
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

			]
			draw: (canvas,model,args...) ->
				alert 'hi'
				context = canvas.getContext("2d")

				$.extend( @options,model.get 'generators.'+ @name )
				if model.get 'generators.'+ @name+ '.defaultOptions'

					randomVariant = app.getRandom(0, @gradientVariants.length-1)

					@gradientVariants[ randomVariant ](context)
					@options.gradientVariantNum = randomVariant
	
					@options.defaultOptions = false

				else if !model.get 'generators.'+ @name+ '.defaultOptions'
					@defaultOptions = false
					predefinedVariant = model.get 'generators.'+ @name+ '.gradientVariantNum'
					@gradientVariants[ predefinedVariant ](context)


				# TODO make new options to automatic save to model without triggering change event
				# saveOptions(model.attributes.gen.options, @options)

				model.set 'generators.'+@name, @options,
					silent: true

	return gen

