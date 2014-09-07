app.module 'CardEditor.views', (views) ->
	class views.Layer extends Marionette.CompositeView
		tagName: 'li'
		className: 'list-group-item ui-state-default ui-sortable-handle'
				
		template: =>
			templatizer.cardEditor.toolbar.layer {}

		initialize: ->
			console.log 'layer init'