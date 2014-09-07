app.module 'CardEditor.views', (views) ->

	class ToolbarPanelState extends Backbone.Model
		defaults:
			isOpened: true
			isVisible: true
			maxVisibleItems: 6
			templateOptions:
				title: 'Какая-то панель'
				addButtonText: 'Какая-то кнопка'
				removeButtonText: 'Какая-то кнопка'				

	class views.BaseToolbarPanelView extends Marionette.CompositeView
		logging: off

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

		state: new ToolbarPanelState()

		initialize: ->
			@bind 'all', ->
				console.log "PANEL VIEW:\t", arguments if @logging is on

		template: (model) =>
			options = @state.get 'templateOptions'
			templatizer.cardEditor.toolbar.baseToolbarPanel options

		onShow: =>
			@ui.childViewContainer.sortable()
			@ui.childViewContainer.disableSelection()
		
		onAddChildClicked: =>
			@collection.add name: 'one'

		onRemoveChildCkicked: =>
			@collection.models[@collection.models.length-1]?.destroy()

		onCollapseToggle: =>
			console.log 'toggle collapse'
			@ui.panel.toggleClass 'is-collapsed'

		onMouseEnter: =>
			@state.set 'currentOverflow', $('body').css('overflow')
			$('body').css 'overflow', 'hidden'

		onMouseLeave: =>
			$('body').css 'overflow', @state.get 'currentOverflow'
