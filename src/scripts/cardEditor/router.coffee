@app.module 'CardEditorLayout', (CardEditorLayout) ->
	class CardEditorLayout.Router extends Marionette.AppRouter

		logger: off

		initialize: ->
			@bind 'all', ->
				console.info 'CardEditorLayout Router:', arguments if @logger is on

		# appRoutes: