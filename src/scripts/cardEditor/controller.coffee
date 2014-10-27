@app.module 'CardEditorLayout', (CardEditorLayout) ->
	class CardEditorLayout.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			
			# console.log 'Initialize: CardEditorLayout Controller'

