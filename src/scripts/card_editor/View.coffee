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
				stage = new Kinetic.Stage
					container: "canvas-container"
					width: 800
					height: 640

				layer = new Kinetic.Layer()

				stripesJPG = new Kinetic.Image
					x: 10
					y: 10
					image: imageObj
					draggable: true
					blurRadius: 0

				text = new Kinetic.Text
					x: 20
					y: 20
					text: 'Таскаемый рыба-текст'
					fontSize: '50'
					fontFamily: 'sans-serif'
					fill: 'white'
					stroke: 'red'
					strokeWidth: 2
					draggable: true

				layer.add stripesJPG
				layer.add text
				stage.add layer

				stripesJPG.cache()
				stripesJPG.filters [Kinetic.Filters.Kaleidoscope]
				stripesJPG.kaleidoscopePower 5
				layer.draw()
				slider = document.getElementById("kaleidoscope-slider")
				slider.onchange = ->
					stripesJPG.kaleidoscopeAngle slider.value
					layer.batchDraw()
					return

				return

			imageObj.src = "/assets/img/stripes.jpg"
