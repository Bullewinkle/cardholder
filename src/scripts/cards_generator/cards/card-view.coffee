@app.module 'CardGenerator.cards', (Cards) ->	
	class Cards.CardView extends Marionette.ItemView
		logger: off


		tagName: 'li'
		className: 'card'

		ui:
			canvasFront: '.card_canvas.back'
			canvasBack: '.card_canvas.front'

		template: =>
			templatizer.cardsGenerator.card @model
		# events:
			# 'mouseenter':  'mouseenter'
			# 'mouseleave':  'mouseleave'
			# 'click .js_lock_config_button': 'locker'
			# 'transitionend': 'transitionCallback'
			# 'resize': 'resizer'

		# modelEvents: {}
		initialize: ->
			@bind 'all',  => 
				console.log "CARD ITEM VIEW:\t \t \t", arguments if @logger is on

			@model.view = @
			# @listenTo @model,'change',@render
			@listenTo app,'resize', @resize

		onShow: =>
			if @$el.hasClass 'fliped'
				 canvas = @$el.find('.card_canvas.back')[0]
			else
				canvas = @$el.find('.card_canvas.front')[0]

			canvas.width = @$el.width()
			canvas.height = @$el.height()
			# @initColorScheme()

			# console.log @model
			@renderLayer1(canvas)
			# @renderLayer2(canvas)
			@renderLayer3(canvas)
			@

		# onRender: =>


		# initColorScheme: =>
		# 	scm = new ColorScheme()
		# 	hue = app.getRandom(0.2, 359, 1)

		# 	variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale' ]
		# 	variation = variations[ app.getRandom(0, variations.length-1) ]
		# 	console.log variation
		# 	scm.from_hue(hue)
		# 	.scheme('tetrade')
		# 	.distance(0.1)
		# 	.add_complement(false)
		# 	.variation(variation)
		# 	.web_safe(false)
		# 	@model.set 'colorScheme', scm.colors()
		# 	console.log @model

		# transitionCallback : (e) =>
		# 	e.view = @
		# 	propertyName = e.originalEvent.propertyName
		# 	if e.target is @$el.find('.card_perspective_inner_wrapper')[0] and propertyName.search('transform') > -1
		# 		if @$el.hasClass 'is_fliping'
		# 			@$el.removeClass 'is_fliping'
		# 	@trigger 'transitionend', e


		# render: =>
		# 	if @$el.hasClass 'fliped'
		# 		canvas = @$el.find('.card_canvas.back')[0]
		# 	else
		# 		canvas = @$el.find('.card_canvas.front')[0]

		# 	canvas.width = @$el.width()
		# 	canvas.height = @$el.height()
		# 	# @initColorScheme()

		# 	# console.log @model
		# 	@renderLayer1(canvas)
		# 	# @renderLayer2(canvas)
		# 	@renderLayer3(canvas)
		# 	@
		
		# animatedRender: =>
		# 	if !@$el.hasClass 'fliped'
		# 		canvas = @$el.find('.card_canvas.back')[0]
		# 	else
		# 		canvas = @$el.find('.card_canvas.front')[0]

		# 	canvas.width = @$el.width()
		# 	canvas.height = @$el.height()


		# 	@renderLayer1(canvas)
		# 	# @renderLayer2(canvas)
		# 	@renderLayer3(canvas)

		# 		# delay = (transitionD * (@model.id-1)).toFixed()
		# 		# console.log transitionD
		# 		# setTimeout afterFlip, transitionD
			
		# 	# afterFlip = ->
		# 	# 	@trigger 'afterFlip' , 
		# 		# @$el.removeClass 'is_fliping'
		# 	# console.log ((@model.id-1) * transitionD*0.2).toFixed()
		# 	# setTimeout flip, ((@model.id-1) * 200).toFixed()
				
		# 	setTimeout @flip, 1000
		# 	@
			
		# flip: =>
		# 	@trigger 'flip'
		# 	@$el.toggleClass 'fliped'
		# 	@$el.addClass 'is_fliping'

		# 	@trigger 'flip'
		# 	@$el.addClass 'is_fliping'
		# 	# if @$el.hasClass 'fliped_90-0'
		# 	# 	@$el.removeClass 'fliped_90-0'
		# 	# 	@$el.addClass 'fliped_0-90'

		# 	# else if @$el.hasClass 'fliped_90-180'
		# 	# 	@$el.removeClass 'fliped_90-180'
		# 	# 	@$el.addClass 'fliped_180-90'
		# 	# else
		# 	# 	@$el.addClass 'fliped_0-90'

		# 	# @$el.addClass 'is_fliping'
		# 	setTimeout () =>
		# 		console.log animationD,transitionD
		# 		animationD = ( parseFloat @$el.find('.card_perspective_inner_wrapper').css 'animation-duration' ) * 1000
		# 		canvas = @$el.find('.card_canvas.front')[0]
		# 		canvas.width = @$el.width()
		# 		canvas.height = @$el.height()
		# 		@renderLayer1(canvas)
		# 		# @renderLayer2(canvas)
		# 		@renderLayer3(canvas)

		# 		if @$el.hasClass 'fliped_0-90'
		# 			@$el.removeClass 'fliped_0-90'
		# 			@$el.addClass 'fliped_90-180'

		# 		else if @$el.hasClass 'fliped_180-90'
		# 			@$el.removeClass 'fliped_180-90'
		# 			@$el.addClass 'fliped_90-0'
		# 		else
		# 			@$el.addClass 'fliped_90-180'
		# 		setTimeout () ->
		# 			@$el.removeClass 'is_fliping'
		# 		, parseFloat(@$el.find('.card_perspective_inner_wrapper').css 'animation-duration') * 1000z
		# 		# console.log transitionD/2
		# 	, parseFloat(@$el.find('.card_perspective_inner_wrapper').css 'animation-duration') * 1000
		# 	# flip = (@,canvas) ->
		# 		# delay = (transitionD * (@model.id-1)).toFixed()
		# 		# console.log transitionD
		# 		# setTimeout afterFlip, transitionD

		renderLayer1: (canvas)->
			app.CardGenerator.generators.gradientGen.draw canvas, @model

		renderLayer2: (canvas)->
			app.generators[@model.attributes.plugin.name].draw canvas, @model.attributes.plugin.options

		renderLayer3: (canvas)->
			app.CardGenerator.generators.textGen.draw canvas, @model

		resize:-> 
			@onShow()

		# locker: ->
		# 	if @model.get('locked') is true
		# 		@model.set 'locked', false,
		# 			silent: true
		# 		@$el.removeClass('locked')
		# 		.find '.js_lock_config_button'
		# 		.text 'Закрепить' 
		# 	else
		# 		@model.set 'locked', true,
		# 			silent: true
		# 		@$el.addClass('locked')
		# 		.find '.js_lock_config_button'
		# 		.text 'Открепить' 

		# mouseenter: ->
		# 	if !@model.has('locked') or @model.get('locked') isnt true 
		# 		if @$el.hasClass('is_fliping')
		# 			@$el.toggleClass 'fliped'
		# 		@$el.prepend '<div class="js_lock_config_button_wrapper"><button class="js_lock_config_button">Закрепить</button></div>'
		# mouseleave: ->
		# 	if !@model.has('locked') or @model.get('locked') isnt true
		# 		@$el.find('.js_lock_config_button_wrapper').remove()

