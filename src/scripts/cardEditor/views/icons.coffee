app.module 'CardEditorLayout.views', (views, app) ->

	class views.Icon extends Marionette.ItemView
		tagName: 'li'
		className: 'list-group-item'
		
		# events:
		# 	'click': 'onIconClicked'

		triggers:
			'click':
				event: 'click:icon'

		template: =>
			"#{ @model.get('content') } #{ @model.get('className') }"

		# onIconClicked: =>
		# 	console.warn 'icon', @model.attributes

	
	class views.IconsPanel extends views._BaseToolbarPanelView
		logging: off

		className: 'icons'

		childView: views.Icon

		# ui:
		# events:
		# onShow: =>
		# 	if @logging is on then @bind 'all', -> console.log "ICONS PANEL VIEW:\t", arguments

		initialize: ->
			super
			@panelViewState.set
				title: 'Иконки'
				gotBody: false

			@collection = new Backbone.Collection
			@collection.reset appIconsData
