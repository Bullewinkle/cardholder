delay = (ms, fn) -> setTimeout ms, fn

class window.App extends Marionette.Application
	logger: off
	
	view: new Backbone.View
		el: $('#app')

	regions:
		mainRegion: '#app'

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


window.app = new App
window.app.module 'Common'
window.app.addInitializer ->
	@bind 'all', (trigger, args) => 
		if @logger is on
			date = new Date()
			console.info("App says : #{ trigger } at #{date.getHours()}:#{date.getMinutes()}:#{date.getSeconds()}.#{date.getMilliseconds()}" ,args)
	@startTime = Date.now()
	@trigger 'initialize'
	
	# @on 'start', =>
	@controller = new @Common.Controller()
	@router = new @Common.Router controller: @controller

	# @controllerModel = new App.MainControllerModel
	# @controllerView = new App.MainControllerView
	# 	el: $('.step_form_controller_wrapper')
	# 	model: @controllerModel

	# @cardsCollection = new App.CardsCollection
	# @cardsCollection.reset dataFromServer.cardsConfig

	# @cardsCollectionView = new App.CardsCollectionView
	# 	el: $('.cards','#app')
	# 	collection: @cardsCollection

	
	# COMMON SETUP
	$("a[href^='/']","body").click  (e) =>
		href = $(e.target).attr 'href'
		if href.indexOf('/api') isnt 0
			e.preventDefault()
			@router.navigate href,
				trigger: true

	onResize = _.debounce => @trigger 'resize', 250
	$(window).on resize: onResize

	if not Backbone.history.started
		Backbone.history.start
			pushState: true

jQuery =>
	window.app.start()

