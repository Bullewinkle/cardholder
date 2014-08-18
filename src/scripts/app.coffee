delay = (ms, fn) -> setTimeout ms, fn

@App = class App extends Marionette.Application
	logger: off

	# router: new Router
	
	view: new Backbone.View
		el: $('#app')

	intervalRenderer: =>
		prevCard = {}

		renderRandom = =>
			
			randomModel = app.cardsCollection.get app.getRandom(1,app.cardsCollection.length)
			if randomModel isnt prevCard

				prevCard = randomModel
				
				# Set defaut values
				randomModel.set 'generators.gradientGen', randomModel.defaults.generators.gradientGen,
					silent: true
				randomModel.set 'data', randomModel.defaults.data,
					silent: true

				# If not hover and not locked - animated render
				if randomModel.view.$el.is(':not(:hover)') and not randomModel.view.$el.hasClass('locked')
					randomModel.view.animatedRender()

			else renderRandom()

		setInterval renderRandom, 2000

	cacheNodes: =>
		@rootNode = $('.cards').eq(0)

	regions:
		mainRegion: '#app'
	# initColorScheme: =>
	# 	scm = new ColorScheme()
	# 	hue = app.getRandom(0.2, 359, 1)

	# 	scm.from_hue(hue)
	# 	.scheme('tetrade')
	# 	.distance(0.1)
	# 	.add_complement(false)
	# 	.variation('soft')
	# 	.web_safe(false)
	# 	@colorScheme = scm.colors()

	getRandom: (min = 0,max = 100,decimal = 0) ->
		+(Math.random() * (max - min) + min).toFixed(decimal)

	# use this function if you want to add your own generator, and do not know how to do this
	getGenerators = =>
		generatorsList = [
			# 'scripts/generators/random-css-gradient-generator.js'
		]
		generatorsCounter = 0
		if generatorsList.length >0
			for i in [0...generatorsList.length]
				$.get generatorsList[i],(res) -> 
					generatorsCounter++
					if generatorsCounter is generatorsList.length
						readyTime = Date.now()
						console.info 'generators loaded at : ' + (readyTime-startTime) + ' miliseconds'
		else
			'no plugin'

	generators : {}

	started : false


@app = new App
@app.addInitializer ->
	date = new Date()
	@trigger 'initialize', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
	@bind 'all', (trigger, args) => 
		if @logger is on
			console.info 'App says :',trigger,args
	@startTime = Date.now()
	@trigger 'start', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
	@started = true
	# @initColorScheme()


	# @controllerModel = new App.MainControllerModel
	# @controllerView = new App.MainControllerView
	# 	el: $('.step_form_controller_wrapper')
	# 	model: @controllerModel

	# @cardsCollection = new App.CardsCollection
	# @cardsCollection.reset dataFromServer.cardsConfig

	# @cardsCollectionView = new App.CardsCollectionView
	# 	el: $('.cards','#app')
	# 	collection: @cardsCollection

	onResize = _.debounce =>
		@trigger 'resize'
	, 250
	$(window).on
		resize: onResize

jQuery =>
	@app.start()

