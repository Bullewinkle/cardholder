app.module 'CardEditor.views', (views) ->

	class LayerState extends Backbone.Model
		defaults:
			isCurrent: false

	class views.Layer extends Marionette.CompositeView
		tagName: 'li'
		className: 'list-group-item ui-state-default ui-sortable-handle'
				
		template: =>
			console.log @model.attributes
			templatizer.cardEditor.toolbar.layer @model.attributes

		initialize: ->
			console.log 'layer init'
			@state = new LayerState()