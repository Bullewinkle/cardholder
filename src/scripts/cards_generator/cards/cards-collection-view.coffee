@app.module 'CardGenerator.cards', (Cards) ->
	class Cards.CardsCollectionView extends Marionette.CollectionView

		initialize: ->
			console.log 'Initialize: CardGenerator.views.CardsCollectionView'

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


