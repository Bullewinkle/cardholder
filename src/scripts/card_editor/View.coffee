@app.module 'CardEditor', (CardEditor) ->
	class CardEditor.CardEditorView extends Marionette.ItemView
		logging: off
		counter: 0

		className: 'card-editor-view'

		ui:
			'canvasContainer': '#canvas-container'
			'slider': '#kaleidoscope-slider'
			'layerList': '.ui-layer-list'
			'addLayer' : '.add-layer'
			'removeLayer' : '.remove-layer'

			'shapeList': '.ui-shape-list'
			'addShape': '.add-shape'
			'removeShape': '.remove-shape'

			'saveToImage': '.save-to-image'
					
		events:
			'change @ui.slider': 'onSliderChange'
			'click @ui.addLayer': 'addLayer'
			'click @ui.removeLayer': 'removeLayer'
			'click @ui.addShape': 'addShape'
			'click @ui.removeShape': 'removeShape'
			'click @ui.saveToImage': 'saveGeneratedCardToImage'

		# collectionEvents:
		# 	'add': 'addLayer'	

		template: (model) ->
			templatizer.cardEditor.editor @model

		initialize: ->
			@bind 'all', ->
				console.log "CARDS COMPOSITE VIEW:\t", arguments if @logging is on

			@state      = new Backbone.Model
				currentLayer: {}
			@model      = new Backbone.Model()
			@collection = new LayerCollection()

		onShow: =>

			@ui.layerList.sortable()
			@ui.layerList.disableSelection()
			
			@ui.shapeList.sortable()
			@ui.shapeList.disableSelection()

			stageWidth = @ui.canvasContainer.width()
			stageHeight = @ui.canvasContainer.height()

			@stage = new Kinetic.Stage
				container: "canvas-container"
				width: stageWidth
				height: 600

		addLayer: (e, layer, params) =>
			params = params or
				name: 'default layer'
			layer = layer or new Kinetic.Layer params

			@stage.add layer
			@state.set 'currentLayer', layer
			@collection.add layer.toObject()
			@ui.layerList.append "<li class='ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Слой #{ @stage.getLayers().length }</li>"
			console.log @stage.getLayers().length
		
		removeLayer: =>
			layers = @stage.getLayers()
			if layers.length > 0
				@ui.layerList.find(".ui-sortable-handle").eq(layers.length-1).remove()
				layers[layers.length-1].destroy()
				@state.set 'currentLayer', layers[layers.length-1]
			console.log @stage.getLayers().length

		addShape: =>
			console.log 'addShape'
			layer = @state.get 'currentLayer'

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

			@ui.shapeList.append "<li class='ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Случайная фигура #{ @state.get('currentLayer').children.length }</li>"

		removeShape: =>
			console.log 'removeShape'
			layer = @state.get 'currentLayer'
			shapes = layer.children
			if shapes.length > 0
				@ui.shapeList.find(".ui-sortable-handle").eq(shapes.length-1).remove()
				shapes[shapes.length-1].destroy()
				layer.draw()

		saveGeneratedCardToImage: =>
			@stage.toDataURL
				miteType: "image/png"
				callback: (data) ->
					# image = data.replace("image/png", "image/octet-stream")
					image = data
					imageWindow = window.open(image)
					$(imageWindow.document.body).prepend("<p>Нажмите сохранить (ctrl/cmd + s)</p>");


			

	class Layer extends Backbone.Model
		# defaults:
		# 	zIndex: 0

	class LayerCollection extends Backbone.Collection
		model: Layer
