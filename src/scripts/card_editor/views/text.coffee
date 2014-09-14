app.module 'CardEditor.views', (views, app) ->
	
	class views.TextPanel extends views.BaseToolbarPanelView
		logging: off

		className: 'icons'

		# childView: views.Icon

		# ui:
		# events:
		# onShow: =>
		# 	if @logging is on then @bind 'all', -> console.log "ICONS PANEL VIEW:\t", arguments

		initialize: ->
			super
			@panelViewState.set
				title: 'Текст'
				gotBody: false
