app.module 'CardEditor.views', (views, app) ->
	class views.LayersPanel extends views._BaseToolbarPanelView
		logging: off

		className: 'layers'

		childView: views.Layer

		# ui:
		# events:

		initialize: ->
			super
			@bind 'all', ->
				console.log "LAYERS PANEL VIEW:\t", arguments if @logging is on

			# @model = new Backbone.Model
			@collection = @editorModel.get 'layerCollection'
			@panelViewState.set
				title: 'Слои ( пока только на первом )'
				addRemoveButtons: true
				addButtonText: 'Добавить слой'
				removeButtonText: 'Удалить слой'

		onAddChildClicked: =>
			@collection.add layerName: "Слой #{ @collection.length }"

		onRemoveChildCkicked: =>
			if @collection.length < 3
				alert 'Необходим хотя бы 1 слой'
				return false
			super

		onAddChild: (layer) =>
		onRemoveChild: =>
