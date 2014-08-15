@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.CardsView extends Marionette.CompositeView
		logging: off

		counter: 0

		template: (model) ->
			templatizer.cardsGenerator.cardsGreed @model

		initialize: ->
			@bind 'all', ->
				console.log "CARDS COMPOSITE VIEW:\t", arguments if @logging is on

			@childViewContainer = '.cards'
			@childView = CardGenerator.cards.CardView
			
			@state = new Backbone.Model()
			@model = new Backbone.DeepModel()
			@collection = new CardGenerator.cards.CardsCollection()

			@stepForm = new CardGenerator.stepForm.StepFormView
				model: new CardGenerator.stepForm.StepFormModel()
			console.log @$el

		# TODO append stepform controller!!!
		onRenderCollection:  =>
			# console.log '!!! render collection', arguments
		# onBeforeAddChild: (view) =>
		# 	if @children.length is 12
		# 		@$(@childViewContainer).append('<li class="card step_form_controller_wrapper"></li>')

		# getChildView: (model) =>
		# 	@counter++
		# 	if @children.length is 12
		# 		model = new CardGenerator.stepForm.StepFormModel()
		# 		return CardGenerator.stepForm.StepFormView
		# 	else
		# 		return CardGenerator.cards.CardView

		# getChildView: 
			# getChildView: function(item) {
			#     # Choose which view class to render,
			#     # depending on the properties of the item model
			#     if  (item.get('isFoo')) {
			#       return FooView;
			#     }
			#     else {
			#       return BarView;
		# onBeforeRenderCollection: =>
		# 	console.error 'BeforeRenderCollection: CardGenerator layout'
		# getChildView: (item) =>
		# 	return item

		# onRenderCollection: ->
		# 	console.log 'onRenderCollection'
		# onRender: =>
		# 	console.warn 'Render: CardGenerator layout'
		# 	# Cards.CardsCollectionView
		# 	# @cards.show new CardGenerator.cards.CardView()
		# 	# console.log new CardGenerator.stepForm.StepFormView()
		# 	# @stepForm.show new CardGenerator.stepForm.StepFormView()

		# onBeforeRender: =>
		# 	console.log 'BeforeRender: CardGenerator layout'
				# cards: model