@app.module 'CardGenerator.generators.gradientGen', (GradientGen) ->
	# TODO
	# [] save new values to model properly and in one place ( may be render by promises and then save velues )
	GradientGen.options = {}
	@gradientVariants = [
	]

	@draw = (svg, model,args...) ->
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

		console.log svg.attr 'id'
		svgId = svg.attr 'id'
			# "#{@model.get 'id'}-front"
			# "#{@model.get 'id'}-back"

		draw = SVG(svgId)
		draw.rect(100, 100).attr({ fill: '#f06' })

		# $.extend( GradientGen.options, model.get 'generators.gradientGen' )
		# if model.get 'generators.gradientGen.isDefault'

		# 	randomVariant = app.getRandom(0, @gradientVariants.length-1)

		# 	GradientGen.options.colorScheme = initColorScheme()

		# 	@gradientVariants[ randomVariant ](context)
		# 	GradientGen.options.gradientVariantNum = randomVariant

		# 	GradientGen.options.isDefault = false
			
		# 	model.set 'generators.gradientGen', GradientGen.options,
		# 		silent: true

		# else if !model.get 'generators.gradientGen.isDefault'

		# 	definedVariant = model.get 'generators.gradientGen.gradientVariantNum'
		# 	@gradientVariants[ definedVariant ](context)



