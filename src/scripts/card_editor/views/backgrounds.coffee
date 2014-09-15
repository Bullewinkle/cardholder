app.module 'CardEditor.views', (views, app) ->

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
			console.log app.module 'CardEditor.models'
			@panelViewState.set
				title: 'Фоны'
				gotBody: false
