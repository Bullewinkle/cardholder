@app.module 'CardGenerator', (CardGenerator) ->

	class CardGenerator.Controller extends Marionette.Controller

		initialize: ->
			console.log 'Initialize: CardGenerator Controller'

		showHome: ->
			console.log 'Route to home'
			html = templatizer.welcome.welcomePage()
			app.mainRegion.$el.html html
		
		showCardsGenerator: ->
			console.log 'Route to Cards-generator'
			html = templatizer.cardsGenerator.cardsGreed()
			app.mainRegion.$el.html html

		showPage: ->
			console.log 'Route to page'
			html = templatizer.page()
			app.mainRegion.$el.html html
			
		showNotFound: ->
			console.log '!!! NOT FOUND !!!'
			html = templatizer['404']()
			app.mainRegion.$el.html html

