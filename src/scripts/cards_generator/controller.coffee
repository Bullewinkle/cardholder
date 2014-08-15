@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			
			# console.log 'Initialize: CardGenerator Controller'

		showHome: ->
			html = templatizer.welcome.welcomePage()
			app.mainRegion.$el.html html
		
		showCardsGenerator: ->
			app.mainRegion.show new CardGenerator.CardsView

		showPage: ->
			html = templatizer.page()
			app.mainRegion.$el.html html
			
		showNotFound: ->
			html = templatizer['404']()
			app.mainRegion.$el.html html

