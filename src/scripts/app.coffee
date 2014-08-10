delay = (ms, fn) -> setTimeout ms, fn

@Router = class Router extends Backbone.Router
	logger: off

	initialize: =>
		@bind 'all', (trigger, args) => 
			if @logger is on
				console.info 'Router says :',trigger,args

	routes:
		'(/)' : 'root'
		'json' : 'getJson'

	getJson: =>
		console.log window.location.href
		$('#app').find('.cards').hide()
		$('#app').find('.js_json_route').text('Back').attr('href','#')

		mainJson = {}
		mainJson.cardsCollection = app.cardsCollection.toJSON()
		mainJson.userAgent = window.navigator.userAgent
		$('#app').append '<pre id="main-json">' + JSON.stringify(mainJson, null, "\t") + '</pre>'

	root: =>
		console.log window.location.href
		$('#app').find('.js_json_route').text('View JSON').attr('href','#/json')
		$('#main-json').remove()
		$('#app').find('.cards').show()

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
	console.info 'App started', window.location.pathname
	date = new Date()
	@trigger 'initialize', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
	@bind 'all', (trigger, args) => 
		if @logger is on
			console.info 'App says :',trigger,args
	@started = true

	date = new Date()
	@startTime = Date.now()
	@trigger 'start', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
	# @initColorScheme()


	# @controllerModel = new App.MainControllerModel
	# @controllerView = new App.MainControllerView
	# 	el: $('.main_controller_wrapper')
	# 	model: @controllerModel

	# @cardsCollection = new App.CardsCollection
	# @cardsCollection.reset dataFromServer.cardsConfig

	# @cardsCollectionView = new App.CardsCollectionView
	# 	el: $('.cards','#app')
	# 	collection: @cardsCollection

	# onResize = _.debounce =>
	# 	@trigger 'resize'
	# 	console.log  @cardsCollectionView.$el.height()

	# $(window).on
	# 	resize: onResize

jQuery =>
	@app.start()

