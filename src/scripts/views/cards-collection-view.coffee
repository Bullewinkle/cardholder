@App.CardsCollectionView = class App.CardsCollectionView extends Backbone.View

	initialize: ->

		@listenToOnce @collection, "add", @render
		@listenTo @collection, "change", @change

		@render()
	
	render: (model, collection) =>

		@$('.card').each (i,el) =>
			view = new App.CardView
				el: $(el)
				model: @collection.models[i]
			view.render()
		this

	change: (args...) =>       


