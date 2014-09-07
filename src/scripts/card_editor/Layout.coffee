@app.module 'CardEditor', (CardEditor) ->

	#Define editors data strucrure
	class AbstractShapeModel extends Backbone.Model

	class ShapeCollection extends Backbone.Collection
		model: AbstractShapeModel

	class LayerModel extends Backbone.Model
		defaults:
			layerName: 'Default'
			shapeCollection: new ShapeCollection()

	class LayerCollection extends Backbone.Collection
		model: LayerModel

	class EditorModel extends Backbone.Model
		defaults:
			layerCollection: new LayerCollection()

	class EditorState extends Backbone.Model
		defaults:
			currentLayer: {}		

	# Define editors layout		
	class CardEditor.CardEditorLayout extends Marionette.LayoutView
		logging: on
		counter: 0

		className: 'card-editor-layout'

		ui:
			'canvasContainer': '#canvas-container'
			'saveImageFileButton': '.save-to-image'
					
		events:
			'click @ui.saveImageFileButton': 'saveGeneratedCardToImage'

		regions:
			panel1: '#panel-1'
			panel2: '#panel-2'
			panel3: '#panel-3'



		initialize: ->
			@bind 'all', ->
				console.log "CARD EDITOR LAYOUT:\t", arguments if @logging is on

			@editorState = new EditorState()
			@model = new EditorModel()
		template: (model) ->
			templatizer.cardEditor.editor @model

		onShow: =>
			@listenTo app, 'resize', @resize

			#Define Kinetic stage
			stageWidth = @ui.canvasContainer.width()
			stageHeight = @ui.canvasContainer.height()
			@stage = new Kinetic.Stage
				container: "canvas-container"
				width: stageWidth
				height: 600
			stageParams =
				scale: @stage.scale()
				width: @ui.canvasContainer.innerWidth()
				height: @ui.canvasContainer.innerHeight()
			@editorState.set 'stageParams', stageParams
			

			# Define GUI panels, must be in the end of showing logic, because of canvas rendering
			@panel1.show new CardEditor.views.LayersPanel 
				state: @editorState
				model: @model
			@panel2.show new CardEditor.views.LayerChildsPanel 
				state: @editorState
				model: @model


			@listenTo @model, 'change', @draw
			@listenTo @model.get('layerCollection'), 'add', @addLayer
			@listenTo @model.get('layerCollection'), 'remove', @removeLayer
			@listenTo @model.get('layerCollection'), 'reset set sync fetch', @draw

			# Add first layer
			@model.get('layerCollection').add layerName: "Слой #{ @model.get('layerCollection').length+1 }" if @model.get('layerCollection').length is 0
			@editorState.set 'currentLayer', @model.get('layerCollection').models[0]
			console.log @editorState.get 'currentLayer'

			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'add', @onAddShape
			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'remove', @onRemoveShape
			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'reset set sync fetch', @draw


		resize: =>
			@trigger 'resize'
			stageParams = @editorState.get 'stageParams'
			newStageParams = {}

			newStageParams.width = @ui.canvasContainer.innerWidth() # new width of page
			newStageParams.height = newStageParams.width * 0.5625 # new height of page

			xScale = (newStageParams.width / stageParams.width) * stageParams.scale.x # percent change in width (Ex: 1000 - 400/1000 means the page scaled down 60%, you should play with this to get wanted results)
			yScale = (newStageParams.height / stageParams.height) * stageParams.scale.y
			
			newStageParams.scale =
				x: xScale
				y: yScale

			@stage.setAttr "width", newStageParams.width
			@stage.setAttr "height", newStageParams.height
			@stage.setAttr "scale", newStageParams.scale

			@editorState.set 'stageParams', newStageParams

			@stage.draw()

		saveGeneratedCardToImage: =>
			@stage.toDataURL
				miteType: "image/png"
				callback: (data) ->
					# image = data.replace("image/png", "image/octet-stream")
					image = data
					imageWindow = window.open(image)
					$(imageWindow.document.body).prepend("<p>Нажмите сохранить (ctrl/cmd + s)</p>")

		addLayer: (layerModel, layerCollection, options) =>
			console.log 'add layer to stage'
			params = layerModel.toJSON()
			layer = new Kinetic.Layer params
			@stage.add layer

		removeLayer: (layerModel, layerCollection, options) =>
			console.log 'add layer to stage'
			layers = @stage.getLayers()
			if layers.length > 0
				layers[layers.length-1].destroy()

		onAddShape: =>
			console.log 'addShape'

			layer = @stage.children[0]

			shape = new Kinetic.RegularPolygon
				x: app.getRandom 0, @stage.getWidth()
				y: app.getRandom 0, @stage.getHeight()
				sides: app.getRandom 3, 9
				radius: app.getRandom 10, 140
				fillRed: app.getRandom 1, 255
				fillGreen: app.getRandom 1, 255
				fillBlue: app.getRandom 1, 255
				opacity: app.getRandom 0.1, 1, 2
				draggable: true
			layer.add shape
			layer.draw()

			
		onRemoveShape: =>
			console.log 'removeShape'
			layer = @stage.children[0]
			shapes = layer.children
			if shapes and shapes.length > 0
				shapes[shapes.length-1].destroy()
				layer.draw()	

		draw: =>
			# console.log 'editor model changed, draw ', arguments
			@stage.draw()
