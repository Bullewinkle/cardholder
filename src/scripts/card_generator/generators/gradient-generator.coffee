@app.module 'CardGenerator.generators.gradientGen', (GradientGen) ->
	# TODO
	# [] save new values to model properly and in one place ( may be render by promises and then save velues )

	# Privat properties
	gradientVariants = [

		(svg, options) -> 
			prepareOptions = ->
				preparedOptions = if options.variantConfig.isDefault
					val1: app.getRandom 0, options.colorScheme.length-1
				else
					options.variantConfig
				
				preparedOptions
			
			readyOptions = prepareOptions()

			svg.rect(svg.width(), svg.height()).move(0, 0).attr({ fill: "##{options.colorScheme[readyOptions.val1]}" })

			readyOptions

		(svg, options) -> 
			prepareOptions = ->
				preparedOptions = if options.variantConfig.isDefault
					val1: app.getRandom 0, options.colorScheme.length-1
				else
					options.variantConfig
				
				preparedOptions

			readyOptions = prepareOptions()

			svg.rect(svg.width(), svg.height()).move(0, 0).attr({ fill: "##{options.colorScheme[readyOptions.val1]}" })

			readyOptions
		
		(svg, options) -> 
			prepareOptions = ->
				preparedOptions = if options.variantConfig.isDefault
					val1: app.getRandom 0, options.colorScheme.length-1
				else
					options.variantConfig

				preparedOptions

			readyOptions = prepareOptions()

			svgWidth = $(svg.parent).width()
			svgHeight = $(svg.parent).height()

			svg.rect( '50%', '100%')
			.move 0,0
			.fill "##{options.colorScheme[readyOptions.val1]}"

			readyOptions
	]
	options = {}
	
	# Public properties
	# empty


	# Privat methods
	initColorScheme = ->
		scm = new ColorScheme()
		hue = app.getRandom(0.2, 359, 1)

		variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale' ]
		variation = variations[ app.getRandom(0, variations.length-1) ]
		scm.from_hue(hue)
		.scheme('tetrade')
		.distance(0.1)
		.add_complement(false)
		.variation(variation)
		.web_safe(false)
		scm.colors()	

	generateRandomData = (model) =>
		options.isDefault = false
		options.colorScheme = initColorScheme()
		options.gradientVariantNum = app.getRandom(0, gradientVariants.length-1)
		
		options

	prepareData = (model) ->
		variandConfig = model.get 'generators.gradientGen.variantConfig'
		if model.get 'generators.gradientGen.isDefault'

			randomData = generateRandomData( model )

		# unless variandConfig.isDefault

		# 	randomData.variantConfig = variandConfig

		model.set 'generators.gradientGen', randomData,
			silent: true
			

	# Public methods
	@draw = (svg, model,args...) ->

		prepareData.call @, model

		_.extend options, model.get('generators.gradientGen')

		# variantNum = model.get 'generators.gradientGen.gradientVariantNum'
		variantNum = app.getRandom 0, 2

		gradientVariants[ variantNum ].call @, svg, options




