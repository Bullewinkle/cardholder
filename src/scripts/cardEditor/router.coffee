@app.module 'CardEditor', (CardEditor) ->
	class CardEditor.Router extends Marionette.AppRouter

		logger: off

		initialize: ->
			@bind 'all', ->
				console.info 'CardEditor Router:', arguments if @logger is on

		# appRoutes: