@app.module 'CardEditor', (CardEditor) ->
	class CardEditor.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			
			# console.log 'Initialize: CardEditor Controller'

