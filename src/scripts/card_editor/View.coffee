@app.module 'CardEditor', (CardEditor) ->
	class CardEditor.CardEditorView extends Marionette.ItemView
		logging: off
		counter: 0

		className: 'card-editor-view'

		# ui:
					
		# events:

		template: (model) ->
			templatizer.cardEditor.editor @model

		initialize: ->
			@bind 'all', ->
				console.log "CARDS COMPOSITE VIEW:\t", arguments if @logging is on
			
			# @state      = new Backbone.Model()
			# @model      = new CardGenerator.stepForm.StepFormModel()
			# @collection = new CardGenerator.cards.CardsCollection()

		onShow: =>
