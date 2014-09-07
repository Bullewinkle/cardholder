app.module 'CardEditor.views', (views) ->

	class LayerModel extends Backbone.Model

	class LayerCollection extends Backbone.Collection
		model: LayerModel	
	
	class views.LayersPanel extends views.BaseToolbarPanelView
		logging: off

		className: 'row layers'

		childView: views.Layer

		# ui:
		# events:

		initialize: ->	
			@bind 'all', ->
				console.log "LAYERS PANEL VIEW:\t", arguments if @logging is on

			@model = new Backbone.Model
			@collection = new LayerCollection()

			@state.set 'templateOptions',
				title: 'Слои'
				addButtonText: 'Добавить слой'
				removeButtonText: 'Удалить слой'
