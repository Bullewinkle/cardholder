@app.module 'CardGenerator.collections', (collections) ->
	class collections.CardsCollection extends Backbone.Collection
		url: '/cards'
		initialize: ->
			@model = App.CardModel
			@trigger 'ready'
