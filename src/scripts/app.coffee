delay = (ms, fn) -> setTimeout ms, fn

class window.App extends Marionette.Application
	logger: off
	
	view: new Backbone.View
		el: $('#app')

	regions:
		mainRegion: '#app'
		
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

	@controller = new @Common.Controller()
	@router = new @Common.Router controller: @controller

	if not Backbone.history.started
		Backbone.history.start
			pushState: true

jQuery =>
	window.app.start()

