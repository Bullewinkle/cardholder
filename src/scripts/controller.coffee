window.app.module 'Common', (Common) ->
	class Common.Controller extends Marionette.Controller
		logging: off

		initialize: ->
			@bind 'all', =>
				console.log arguments if @logging is on			

		showHome: ->
			html = templatizer.welcome.welcomePage()
			app.mainRegion.$el.html html
		
		showCardGenerator: ->
			app.mainRegion.show new app.CardGenerator.CardsView

		showCardEditor: ->
			app.mainRegion.show new app.CardEditor.CardEditorView

		showPage: ->
			html = templatizer.page()
			app.mainRegion.$el.html html
			
		showNotFound: ->
			html = templatizer['404']()
			app.mainRegion.$el.html html

