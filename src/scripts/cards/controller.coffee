@app.module 'Cards', (Cards) ->
	class Cards.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			
			# console.log 'Initialize: Cards Controller'

