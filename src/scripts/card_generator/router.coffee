@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.Router extends Marionette.AppRouter
		logger: off

		initialize: ->
			@bind 'all', ->
				console.info 'CardGenerator Router:', arguments if @logger is on