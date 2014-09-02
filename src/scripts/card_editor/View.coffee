@app.module 'CardEditor', (CardEditor) ->
	class CardEditor.CardEditorView extends Marionette.ItemView
		logging: on
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
			imageObj = new Image()
			imageObj.onload = ->
				stage = new Kinetic.Stage(
					container: "canvas-container"
					width: 700
					height: 600
				)
				layer = new Kinetic.Layer()
				darth = new Kinetic.Image(
					x: 10
					y: 10
					image: imageObj
					draggable: true
					blurRadius: 20
				)
				layer.add darth
				stage.add layer
				darth.cache()
				darth.filters [Kinetic.Filters.Kaleidoscope]
				darth.kaleidoscopePower 3
				layer.draw()
				slider = document.getElementById("slider")
				slider.onchange = ->
					darth.kaleidoscopeAngle slider.value
					layer.batchDraw()
					return

				return

			imageObj.src = "/assets/img/darth-vader.jpg"
