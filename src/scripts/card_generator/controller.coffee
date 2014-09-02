@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			
			# console.log 'Initialize: CardGenerator Controller'

