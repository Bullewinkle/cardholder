window.app.module 'Common', (Common) ->
	class Common.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			

		showHome: ->
			html = templatizer.welcome.welcomePage()
			app.mainRegion.$el.html html
		
		showCards: ->
			app.mainRegion.show new app.Cards.CardsView()

		showCardEditorLayout: ->
			app.mainRegion.show new app.CardEditor.CardEditorLayout()

		showPage: ->
			html = templatizer.pages.page()
			app.mainRegion.$el.html html
			
		showNotFound: ->
			html = templatizer.pages['404']()
			app.mainRegion.$el.html html

