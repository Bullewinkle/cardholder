app.module 'CardEditorLayout', (CardEditorLayout) ->
	@addInitializer ->
		# @views = {}
		@controller =  new CardEditorLayout.Controller()
		@router = new CardEditorLayout.Router controller: @controller
		@cardEditorLayout = new CardEditorLayout.CardEditorLayoutLayout()


# common card view models
app.module 'CardEditorLayout.models', (models, app) ->
	console.log ('1 common card view models')

	class models.PanelViewState extends Backbone.Model
		defaults:
			isOpened: true
			isVisible: true
			maxVisibleItems: 6
			title: 'Какая-то панель'
			gotBody: true
			addButtonText: 'Какая-то кнопка'
			removeButtonText: 'Какая-то кнопка'		

# common card view classes
app.module 'CardEditorLayout.views', (views, app) ->
	console.log ('2 common card view classes')

	class PanelViewState extends Backbone.Model
		defaults:
			isOpened: true
			isVisible: true
			maxVisibleItems: 6
			title: 'Какая-то панель'
			gotBody: true
			addButtonText: 'Какая-то кнопка'
			removeButtonText: 'Какая-то кнопка'	

	class views._BaseToolbarPanelView extends Marionette.CompositeView
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
			# 'mouseenter @ui.childViewContainer': 'onMouseEnter'
			# 'mouseleave @ui.childViewContainer': 'onMouseLeave'
			# 'DOMMouseScroll @ui.childViewContainer': 'onScroll'
			# 'mousewheel @ui.childViewContainer': 'onScroll'

		childViewContainer: '.items-container'

		panelViewState: new PanelViewState()
		# panelViewState: new app.CardEditorLayout.models.PanelViewState

		initialize: (options) ->
			# set params to the view
			if options.template then @template = options.template
			@editorState = options.state
			@editorModel = options.model

		template: =>
			options = @panelViewState.attributes
			console.log options
			templatizer.cardEditor.toolbar.baseToolbarPanel options

		onShow: =>
			@ui.childViewContainer.sortable( containment: "parent" )
			@ui.childViewContainer.disableSelection()
		
		onCollapseToggle: =>
			@ui.panel.toggleClass 'is-collapsed'

		onScroll: (ev) =>
			# enable this code ( from http://jsfiddle.net/TroyAlford/4wrxq/1/ )
			`alert('hello')
			var $this = $(this),
			    scrollTop = this.scrollTop,
			    scrollHeight = this.scrollHeight,
			    height = $this.height(),
			    delta = ev.originalEvent.wheelDelta,
			    up = delta > 0;

			var prevent = function() {
			    ev.stopPropagation();
			    ev.preventDefault();
			    ev.returnValue = false;
			    return false;
			}

			if (!up && -delta > scrollHeight - height - scrollTop) {
			    // Scrolling down, but this will take us past the bottom.
			    $this.scrollTop(scrollHeight);
			    return prevent();
			} else if (up && delta > scrollTop) {
			    // Scrolling up, but this will take us past the top.
			    $this.scrollTop(0);
			    return prevent();
			}`

		onMouseEnter: (e) =>
		onMouseLeave: (e) =>

		onAddChildClicked: =>
			@collection.add {}

		onRemoveChildCkicked: =>
			@collection.pop()



