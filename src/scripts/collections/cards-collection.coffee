@App.CardsCollection = class App.CardsCollection extends Backbone.Collection
	url: '/cards'
	initialize: ->
		@model = App.CardModel
		@trigger 'ready'
