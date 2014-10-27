app.module 'CardEditor.views', (views, app) ->
	
	class views.LayerChildsPanel extends views._BaseToolbarPanelView
		logging: off

		className: 'layer-childs'

		childView: views.LayerChild

		# ui:
		# events:

		initialize: ->
			super
			@bind 'all', ->
				console.log "LAYER CHILDS PANEL VIEW:\t", arguments if @logging is on
			@listenTo @editorState, 'change', @update
			# @model = new Backbone.Model()
			# console.log @editorState.get('currentLayer')

			@collection = new Backbone.Collection()
			@panelViewState.set
				title: 'Случайные фигуры'
				gotBody: true
				addRemoveButtons: true
				addButtonText: 'Добавить фигуру'
				removeButtonText: 'Удалить фигуру'

		update: =>
			@currentLayerShapeCollection = @editorState.get('currentLayer').get('shapeCollection')
			@collection.reset @currentLayerShapeCollection.models
			# @collection.on 'add', (model, collection, options) ->
			# 	currentLayerShapeCollection.add model
			# 	console.warn arguments, currentLayerShapeCollection
			# @collection.on 'remove', (model, collection, options) ->
			# 	currentLayerShapeCollection.pop()
			# 	console.warn arguments, currentLayerShapeCollection

			# addToCurrentLayerShapeCollection: (model, collection, options) =>
			# 	@currentLayerShapeCollection.add model
			# popFromCurrentLayerShapeCollection: (model, collection, options) =>
			# 	@currentLayerShapeCollection.pop()
		onAddChildClicked: =>
			@collection.add shapeName: "Фигура #{ @collection.length+1 }"
			@editorState.get('currentLayer').get('shapeCollection').add shapeName: "Фигура #{ @collection.length+1 }"

		onRemoveChildCkicked: =>
			@collection.pop()
			@editorState.get('currentLayer').get('shapeCollection').pop()

		onAddChild: =>
		onRemoveChild: =>
