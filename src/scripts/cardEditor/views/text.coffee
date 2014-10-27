app.module 'CardEditorLayout.views', (views, app) ->

	class TextModel extends Backbone.Model
		defaults:
			name: 'Иван'
			surname: 'Иванович'
			phone: 'Иванов'
			email: 'email@email.com'
			position: 'Должность Ивана Ивановича'

	
	class views.TextPanel extends views._BaseToolbarPanelView
		logging: on

		className: 'text'

		# childView: views.Icon

		# ui:
		# 	'inputs' : 'input'

		# onShow: =>
		# 	if @logging is on then @bind 'all', -> console.log "ICONS PANEL VIEW:\t", arguments
		modelEvents:
			'change': 'onModelChange'

		template: =>
			templatizer.cardEditor.toolbar.text @panelViewState.attributes

		initialize: ->
			super
			@ui.inputs = 'input'
			@events['input @ui.inputs'] = 'onInput'

			@model  = new TextModel()
			@panelViewState.set
				title: 'Текст'
				gotBody: false

		onInput: (e) =>
			key = $(e.currentTarget).attr('name')
			@model.set key, $(e.currentTarget).val()

		onModelChange: =>
			@trigger 'text:changed', @model.toJSON()

