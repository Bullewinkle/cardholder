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
			'drawRandomBackgroundButton': '.draw-random-background'
			'saveImageFileButton': '.save-to-image'
			'iconsContainer': '.icons-container'
					
		events:
			'click @ui.drawRandomBackgroundButton': 'drawRandomBackgroundButton'
			'click @ui.saveImageFileButton': 'saveGeneratedCardToImage'

		regions:
			layersPanelRegion: '#layers-panel-region'
			textPanelRegion: '#text-panel-region'
			shapesPanelRegion: '#shapes-panel-region'
			iconsPanelRegion: '#icons-panel-region'
			backgroundsPanelRegion: '#backgrounds-panel-region'

		initialize: ->
			@bind 'all', ->
				console.log "CARD EDITOR LAYOUT:\t", arguments if @logging is on

			@editorState = new EditorState()
			@model = new EditorModel()
		template: ->
			templatizer.cardEditor.editor @model

		onShow: =>
			@listenTo app, 'resize', @resize

			#Define Kinetic stage
			stageWidth = @ui.canvasContainer.width()
			stageHeight = @ui.canvasContainer.height()
			@stage = new Kinetic.Stage
				container: "canvas-container"
				width: stageWidth
				height: stageWidth * 0.5625
			stageParams =
				scale: @stage.scale()
				width: @ui.canvasContainer.innerWidth()
				height: @ui.canvasContainer.innerHeight()
			@editorState.set 'stageParams', stageParams

			# Define GUI panels, must be in the end of showing logic, because of canvas rendering
			@_showGuiPanels()

			@listenTo @model, 'change', @draw
			@listenTo @model.get('layerCollection'), 'add', @addLayer
			@listenTo @model.get('layerCollection'), 'remove', @removeLayer
			@listenTo @model.get('layerCollection'), 'reset set sync fetch', @draw

			# Add first layers
			@model.get('layerCollection').add layerName: "Фон" if @model.get('layerCollection').length is 0
			@model.get('layerCollection').add layerName: "Слой #{ @model.get('layerCollection').length }" if @model.get('layerCollection').length is 1
			@editorState.set 'currentLayer', @model.get('layerCollection').models[0]
			console.log 'current layer',@editorState.get 'currentLayer'
			
			layer = @stage.children[0]
			if layer and layer.canvas
				app.CardGenerator.generators.gradientGen.draw(layer.canvas._canvas, (new app.CardGenerator.cards.CardModel()))

			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'add', @onAddShape
			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'remove', @onRemoveShape
			@listenTo @editorState.get('currentLayer').get('shapeCollection'), 'reset set sync fetch', @draw

			# icons-container
			@draw()

			# SHOW FIXES
			# randomIcon = app.getRandom(0, @iconsPanelRegion.currentView.children.length-1)
			# console.log @iconsPanelRegion.currentView.children, "view#{randomIcon}"
			# @iconsPanelRegion.currentView.children.toArray()[randomIcon].$el.trigger('click')
			@textPanelRegion.currentView.model.set 'name', 'Семен'


		_showGuiPanels: =>
			@layersPanelRegion.show new CardEditor.views.LayersPanel 
				state: @editorState
				model: @model

			@textPanelRegion.show new CardEditor.views.TextPanel 
				state: @editorState
				model: @model
			@listenTo @textPanelRegion.currentView, 'text:changed', @onTextChange

			@shapesPanelRegion.show new CardEditor.views.LayerChildsPanel 
				state: @editorState
				model: @model

			@iconsPanelRegion.show new CardEditor.views.IconsPanel 
				state: @editorState
				model: @model
			@listenTo @iconsPanelRegion.currentView, 'childview:click:icon', @onAddIcon

			# debugger;
			@backgroundsPanelRegion.show new CardEditor.views.BackgroundsPanel
				state: @editorState
				model: @model

		onAddIcon: (view, options, args...) =>
			layer = @stage.children[@stage.children.length-2]

			# shape = new Kinetic.RegularPolygon
			# 	x: app.getRandom 0, @stage.getWidth()
			# 	y: app.getRandom 0, @stage.getHeight()
			# 	sides: app.getRandom 3, 9
			# 	radius: app.getRandom 10, 140
				# fillRed: app.getRandom 1, 255
				# fillGreen: app.getRandom 1, 255
				# fillBlue: app.getRandom 1, 255
			# 	opacity: app.getRandom 0.1, 1, 2
			# 	draggable: true


			icon = new Kinetic.Text
				x: (@stage.getWidth()/2)-100
				y: (@stage.getHeight()/2)-100
				text: options.model.get 'content'
				fontSize: 200
				fontFamily: 'icomoon'
				fillRed: app.getRandom 1, 255
				fillGreen: app.getRandom 1, 255
				fillBlue: app.getRandom 1, 255
				width: 200
				height: 200
				align: 'center'
				draggable: true


			layer.add icon
			layer.draw()

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
			@stage.setWidth newStageParams.width
			@stage.setHeight newStageParams.height
			@stage.setScale newStageParams.scale

			@editorState.set 'stageParams', newStageParams

			@draw()

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
			if layers.length > 1
				layers[layers.length-1].destroy()

		onAddShape: =>
			console.log 'addShape'

			layer = @stage.children[@stage.children.length-1]

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
			layer = @stage.children[@stage.children.length-1]
			shapes = layer.children
			if shapes and shapes.length > 0
				shapes[shapes.length-1].destroy()
				layer.draw()	

		drawRandomBackgroundButton: =>
			# layer = @stage.children[0].canvas._canvas
			# layer.getContext('2d').clearRect(0,0,layer.width,layer.height)
			@stage.background = new app.CardGenerator.cards.CardModel()
			# app.CardGenerator.generators.gradientGen.draw(layer, @stage.background )
			@draw()

		onTextChange: (text) =>
			console.info text
			# unless @textLayer then 
			# 	@textLayer = new Kinetic.FastLayer clearBeforeDraw: true
			# 	@stage.add @textLayer
			unless @textLayer
				@textLayer = new Kinetic.Layer()
				@stage.add @textLayer
			# layer = @stage.children[@stage.children.length-1]
			console.log @textLayer

			unless @textLayer.children[0]
				cardText = new Kinetic.Text
					x: 20
					y: 20
					fontSize: 22
					fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
					fill: '#333'
					width: @stage.width()/1.25
					padding: 20
					align: 'left'
					draggable: true
				@textLayer.add cardText
			else
				cardText = @textLayer.children[0]	

			console.log cardText
			cardText.setText "Имя: \t\t#{text.name} \nФамилия: \t\t#{ text.surname } \nEmail: \t\t#{text.email} \nТелефон: \t\t#{text.phone} \nДолжность: \t\t#{text.position}"



			@textLayer.draw()


		draw: =>
			@trigger 'draw'
			# console.log 'editor model changed, draw ', arguments
			# layer = new Kinetic.FastLayer()
			# layer.add new Kinetic.Rect
			# 	x:0, y:0, width: @stage.width(), height: @stage.height()

			# 	# cornerRadius
			# 	# fill
			# 	fillRed: app.getRandom 0, 255
			# 	fillGree:n: app.getRandom 0, 255
			# 	fillBlue: app.getRandom 0, 255
			# 	fillAlpha: app.getRandom 0, 255
			# 	# fillPatternImage
			# 	# fill
			# 	# fillPatternX
			# 	# fillPatternY
			# 	# fillPatternOffset
			# 	# object
			# 	# fillPatternOffsetX
			# 	# fillPatternOffsetY
			# 	# fillPatternScale
			# 	# object
			# 	# fillPatternScaleX
			# 	# fillPatternScaleY
			# 	# fillPatternRotation
			# 	# fillPatternRepeat
			# 	# can
			# 	# fillLinearGradientStartPoint
			# 	# object
			# 	# fillLinearGradientStartPointX
			# 	# fillLinearGradientStartPointY
			# 	# fillLinearGradientEndPoint
			# 	# fillLinearGradientEndPointX
			# 	# fillLinearGradientEndPointY
			# 	# fillLinearGradientColorStops
			# 	# array
			# 	# fillRadialGradientStartPoint
			# 	# object
			# 	# fillRadialGradientStartPointX
			# 	# fillRadialGradientStartPointY
			# 	# fillRadialGradientEndPoint
			# 	# object
			# 	# fillRadialGradientEndPointX
			# 	# fillRadialGradientEndPointY
			# 	# fillRadialGradientStartRadius
			# 	# fillRadialGradientEndRadius
			# 	# fillRadialGradientColorStops
			# 	# array
			# 	# fillEnabled
			# 	# flag
			# 	# fillPriority
			# 	# can
			# 	# stroke
			# 	# stroke
			# 	# strokeRed
			# 	# set
			# 	# strokeGreen
			# 	# set
			# 	# strokeBlue
			# 	# set
			# 	# strokeAlpha
			# 	# set
			# 	# strokeWidth
			# 	# stroke
			# 	# strokeScaleEnabled
			# 	# flag
			# 	# strokeEnabled
			# 	# flag
			# 	# lineJoin
			# 	# can
			# 	# lineCap
			# 	# can
			# 	# shadowColor
			# 	# shadowRed
			# 	# set
			# 	# shadowGreen
			# 	# set
			# 	# shadowBlue
			# 	# set
			# 	# shadowAlpha
			# 	# set
			# 	# shadowBlur
			# 	# shadowOffset
			# 	# object
			# 	# shadowOffsetX
			# 	# shadowOffsetY
			# 	# shadowOpacity
			# 	# shadow
			# 	# shadowEnabled
			# 	# flag
			# 	# dash
			# 	# dashEnabled
			# 	# flag
			# 	# visible
			# 	# listening
			# 	# whether
			# 	# id
			# 	# unique
			# 	# name
			# 	# non
			# 	# opacity
			# 	# determines
			# 	# scale
			# 	# set
			# 	# scaleX
			# 	# set
			# 	# scaleY
			# 	# set
			# 	# rotation
			# 	# rotation
			# 	# offset
			# 	# offset
			# 	# offsetX
			# 	# set
			# 	# offsetY
			# 	# set
			# 	# draggable
			# 	# makes
			# 	# dragDistance
			# 	# dragBoundFunc

			# @stage.add layer
			@stage.draw()
			layer = @stage.children[0]
			@stage.background = @stage.background or new app.CardGenerator.cards.CardModel()
			if layer and layer.canvas
				app.CardGenerator.generators.gradientGen.draw(layer.canvas._canvas, @stage.background )

