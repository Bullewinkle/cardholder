@app.module 'CardGenerator.cards', (Cards) ->
	class Cards.CardsCollection extends Backbone.Collection		
		logging: off

		url: '/api/cards-generator'

		initialize: ->
			@bind 'all', =>
				console.log "CARDS COLLECTION:\t", arguments if @logging is on
			@model = Cards.CardModel
			@reset app.CardGenerator.data.get 'cardsConfig'
			@trigger 'ready'
