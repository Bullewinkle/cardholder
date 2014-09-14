app.module 'CardEditor.models', (models, app) ->

	class models.PanelViewState extends Backbone.Model
		defaults:
			isOpened: true
			isVisible: true
			maxVisibleItems: 6
			title: 'Какая-то панель'
			gotBody: true
			addButtonText: 'Какая-то кнопка'
			removeButtonText: 'Какая-то кнопка'