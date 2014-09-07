app.module 'CardEditor.views', (views) ->

	class LayerChildModel extends Backbone.Model

	class LayerChildCollection extends Backbone.Collection
		model: LayerChildModel
	
	class views.LayerChildsPanel extends views.BaseToolbarPanelView
		logging: off

		className: 'row layer-childs'

		childView: views.LayerChild

		# ui:
		# events:

		initialize: ->
			@bind 'all', ->
				console.log "LAYER CHILDS PANEL VIEW:\t", arguments if @logging is on

			@model = new Backbone.Model()
			@collection = new LayerChildCollection()

			@state.set 'templateOptions',
				title: 'Фигуры'
				addButtonText: 'Добавить фигуру'
				removeButtonText: 'Удалить фигуру'