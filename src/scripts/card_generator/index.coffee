window.app.module 'CardGenerator', (CardGenerator) ->
	@addInitializer ->
		@controller =  new CardGenerator.Controller
		@router = new CardGenerator.Router controller: @controller
		@data = new Backbone.DeepModel dataFromServer
		@cardsView = new CardGenerator.CardsView
