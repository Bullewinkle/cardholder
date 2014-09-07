app.module 'CardEditor.views', (views) ->
	class views.LayerChild extends Marionette.CompositeView
		tagName: 'li'
		className: 'list-group-item ui-state-default ui-sortable-handle'

		template: =>
			templatizer.cardEditor.toolbar.layerChild @model.attributes

		initialize: ->
			console.log 'layerChild init'