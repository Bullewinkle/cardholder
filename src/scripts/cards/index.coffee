window.app.module 'Cards', (Cards) ->
	@addInitializer ->
		@controller =  new Cards.Controller
		@router = new Cards.Router controller: @controller
		@data = new Backbone.DeepModel dataFromServer
		@cardsView = new Cards.CardsView
