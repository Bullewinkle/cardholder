@app.module 'CardGenerator', (CardGenerator) ->

	class CardGenerator.Controller extends Marionette.Controller

		initialize: ->
			console.log 'Init: Controller1'
		index: ->
			console.log 'Route to index'
		any: ->
			console.log 'Route to any'

		notFound: ->
			console.log '!!! NOT FOUND !!!'

	# @addInitializer ->
	# 	console.log 'Init: Controller2', @
	# 	# @controller = new @Controller()

