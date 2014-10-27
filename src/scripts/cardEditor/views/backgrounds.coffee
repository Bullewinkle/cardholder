app.module 'CardEditorLayout.views', (views, app) ->

	class views.BackgroundsPanel extends views._BaseToolbarPanelView
		logging: off

		className: 'backgrounds'

		# childView: views.Icon

		# ui:
		# events:
		# onShow: =>
		# 	if @logging is on then @bind 'all', -> console.log "ICONS PANEL VIEW:\t", arguments

		template: =>
			templatizer.cardEditor.toolbar.backgrounds @panelViewState.attributes

		initialize: ->
			super
			console.log app.module 'CardEditorLayout.models'
			@panelViewState.set
				title: 'Фон'
				gotBody: false
