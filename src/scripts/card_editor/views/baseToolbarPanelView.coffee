app.module 'CardEditor.views', (views, app) ->

	class PanelViewState extends Backbone.Model
		defaults:
			isOpened: true
			isVisible: true
			maxVisibleItems: 6
			templateOptions:
				title: 'Какая-то панель'
				addButtonText: 'Какая-то кнопка'
				removeButtonText: 'Какая-то кнопка'				

	class views.BaseToolbarPanelView extends Marionette.CompositeView
		logging: on

		ui:
			'panel': '.panel'
			'childViewContainer': '.items-container'
			'collapseToggler': '.collapse-toggler'
			'addChild' : '.add-child'
			'removeChild' : '.remove-child'

		events:
			'click @ui.collapseToggler': 'onCollapseToggle'
			'click @ui.addChild' : 'onAddChildClicked'
			'click @ui.removeChild' : 'onRemoveChildCkicked'
			'mouseenter @ui.childViewContainer': 'onMouseEnter'
			'mouseleave @ui.childViewContainer': 'onMouseLeave'

		childViewContainer: '.items-container'

		panelViewState: new PanelViewState()

		initialize: (options) ->
			@editorState = options.state
			@editorModel = options.model

		template: (model) =>
			options = @panelViewState.get 'templateOptions'
			templatizer.cardEditor.toolbar.baseToolbarPanel options

		onShow: =>
			@ui.childViewContainer.sortable()
			@ui.childViewContainer.disableSelection()
		
		onCollapseToggle: =>
			@ui.panel.toggleClass 'is-collapsed'

		onMouseEnter: =>
			@panelViewState.set 'currentOverflow', 
				both: $('body').css('overflow')
				x: $('body').css('overflow-x')
				y: $('body').css('overflow-y')

			$('body').css 'overflow-y', 'hidden'

		onMouseLeave: =>
			$('body').css 'overflow-y', @panelViewState.get('currentOverflow').y

		onAddChildClicked: =>
			@collection.add {}

		onRemoveChildCkicked: =>
			@collection.pop()
