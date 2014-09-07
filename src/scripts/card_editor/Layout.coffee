@app.module 'CardEditor', (CardEditor) ->
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
			console.log 'CardEditorLayout', @options
			@bind 'all', ->
				console.log "CARD EDITOR LAYOUT:\t", arguments if @logging is on

			@state = new Backbone.Model currentLayer: {}
			@model = new Backbone.Model()

		template: (model) ->
			templatizer.cardEditor.editor @model

		onShow: =>
			@panel1.show new CardEditor.views.LayersPanel
			@panel2.show new CardEditor.views.LayerChildsPanel


			@listenTo app, 'resize', @resize

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

			@state.set 'stageParams', stageParams

		resize: =>
			@trigger 'resize'
			stageParams = @state.get 'stageParams'
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

			@state.set 'stageParams', newStageParams

			@stage.draw()
			
		saveGeneratedCardToImage: =>
			@stage.toDataURL
				miteType: "image/png"
				callback: (data) ->
					# image = data.replace("image/png", "image/octet-stream")
					image = data
					imageWindow = window.open(image)
					$(imageWindow.document.body).prepend("<p>Нажмите сохранить (ctrl/cmd + s)</p>")

		# addLayer: (e, layer, params) =>
		# 	params = params or
		# 		name: 'default layer'
		# 	layer = layer or new Kinetic.Layer params

		# 	@stage.add layer
		# 	@state.set 'currentLayer', layer
		# 	@collection.add layer.toObject()
		# 	@ui.layerList.append "<li class='list-group-item ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Слой #{ @stage.getLayers().length }</li>"
		# 	console.log @stage.getLayers().length
		
		# removeLayer: =>
		# 	layers = @stage.getLayers()
		# 	if layers.length > 0
		# 		@ui.layerList.find(".ui-sortable-handle").eq(layers.length-1).remove()
		# 		layers[layers.length-1].destroy()
		# 		@state.set 'currentLayer', layers[layers.length-1] or {}
		# 	console.log @stage.getLayers().length

		# addShape: =>
		# 	console.log 'addShape'
		# 	if @stage.getLayers().length < 1
		# 		@addLayer()

		# 	layer = @state.get 'currentLayer'

		# 	shape = new Kinetic.RegularPolygon
		# 		x: app.getRandom 0, @stage.getWidth()
		# 		y: app.getRandom 0, @stage.getHeight()
		# 		sides: app.getRandom 3, 9
		# 		radius: app.getRandom 10, 140
		# 		fillRed: app.getRandom 1, 255
		# 		fillGreen: app.getRandom 1, 255
		# 		fillBlue: app.getRandom 1, 255
		# 		opacity: app.getRandom 0.1, 1, 2
		# 		draggable: true
		# 	layer.add shape
		# 	layer.draw()

		# 	@ui.shapeList.append "<li class='list-group-item ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Случайная фигура #{ @state.get('currentLayer').children.length }</li>"

		# removeShape: =>
		# 	console.log 'removeShape'
		# 	layer = @state.get 'currentLayer'
		# 	shapes = layer.children
		# 	if shapes and shapes.length > 0
		# 		@ui.shapeList.find(".ui-sortable-handle").eq(shapes.length-1).remove()
		# 		shapes[shapes.length-1].destroy()
		# 		layer.draw()
