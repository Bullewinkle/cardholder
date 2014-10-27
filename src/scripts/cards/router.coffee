@app.module 'Cards', (Cards) ->
	class Cards.Router extends Marionette.AppRouter
		logger: off

		initialize: ->
			@bind 'all', ->
				console.info 'Cards Router:', arguments if @logger is on