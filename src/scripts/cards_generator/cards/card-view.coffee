@app.module 'CardGenerator.cards', (Cards) ->	
	class Cards.CardView extends Marionette.ItemView
		logger: off


		tagName: 'li'
		className: 'card'

		ui:
			canvasFront: '.card-canvas.back'
			canvasBack: '.card-canvas.front'

		template: =>
			templatizer.cardsGenerator.card @model
		events:
			'mouseenter':  'onMouseEnter'
			'mouseleave':  'onMouseLeave'
			'click .js-lock-config-button': 'onLockButtonClicked'
			'transitionend': 'transitionCallback'

		# modelEvents: {}
		initialize: ->
			@bind 'all',  => 
				console.log "CARD ITEM VIEW:\t \t \t", arguments if @logger is on

			@model.view = @
			@listenTo @model,'change',@renderCanvas
			@listenTo app,'resize', @resize

		renderCanvas: =>
			if @$el.hasClass 'fliped'
				 canvas = @$el.find('.card-canvas.back')[0]
			else
				canvas = @$el.find('.card-canvas.front')[0]

			canvas.width = @$el.width()
			canvas.height = @$el.height()

			@renderLayer1(canvas)
			@renderLayer2(canvas)
			@renderLayer3(canvas)
			
			@
		onShow: =>
			@renderCanvas()

		# transitionCallback : (e) =>
		# 	e.view = @
		# 	propertyName = e.originalEvent.propertyName
		# 	if e.target is @$el.find('.card-perspective-inner-wrapper')[0] and propertyName.search('transform') > -1
		# 		if @$el.hasClass 'is-fliping'
		# 			@$el.removeClass 'is-fliping'
		# 	@trigger 'transitionend', e


		# animatedRender: =>
		# 	if !@$el.hasClass 'fliped'
		# 		canvas = @$el.find('.card-canvas.back')[0]
		# 	else
		# 		canvas = @$el.find('.card-canvas.front')[0]

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
		# 		# @$el.removeClass 'is-fliping'
		# 	# console.log ((@model.id-1) * transitionD*0.2).toFixed()
		# 	# setTimeout flip, ((@model.id-1) * 200).toFixed()
				
		# 	setTimeout @flip, 1000
		# 	@
			
		# flip: =>
		# 	@trigger 'flip'
		# 	@$el.toggleClass 'fliped'
		# 	@$el.addClass 'is-fliping'
		# 	# if @$el.hasClass 'fliped-90-0'
		# 	# 	@$el.removeClass 'fliped-90-0'
		# 	# 	@$el.addClass 'fliped-0-90'

		# 	# else if @$el.hasClass 'fliped-90-180'
		# 	# 	@$el.removeClass 'fliped-90-180'
		# 	# 	@$el.addClass 'fliped-180-90'
		# 	# else
		# 	# 	@$el.addClass 'fliped-0-90'

		# 	# @$el.addClass 'is-fliping'
		# 	setTimeout () =>
		# 		console.log animationD,transitionD
		# 		animationD = ( parseFloat @$el.find('.card-perspective-inner-wrapper').css 'animation-duration' ) * 1000
		# 		canvas = @$el.find('.card-canvas.front')[0]
		# 		canvas.width = @$el.width()
		# 		canvas.height = @$el.height()
		# 		@renderLayer1(canvas)
		# 		# @renderLayer2(canvas)
		# 		@renderLayer3(canvas)

		# 		if @$el.hasClass 'fliped-0-90'
		# 			@$el.removeClass 'fliped-0-90'
		# 			@$el.addClass 'fliped-90-180'

		# 		else if @$el.hasClass 'fliped-180-90'
		# 			@$el.removeClass 'fliped-180-90'
		# 			@$el.addClass 'fliped-90-0'
		# 		else
		# 			@$el.addClass 'fliped-90-180'
		# 		setTimeout () ->
		# 			@$el.removeClass 'is-fliping'
		# 		, parseFloat(@$el.find('.card-perspective-inner-wrapper').css 'animation-duration') * 1000z
		# 		# console.log transitionD/2
		# 	, parseFloat(@$el.find('.card-perspective-inner-wrapper').css 'animation-duration') * 1000
		# 	# flip = (@,canvas) ->
		# 		# delay = (transitionD * (@model.id-1)).toFixed()
		# 		# console.log transitionD
		# 		# setTimeout afterFlip, transitionD

		renderLayer1: (canvas)->
			app.CardGenerator.generators.gradientGen.draw canvas, @model

		renderLayer2: (canvas)->
			app.CardGenerator.generators.starsGen.draw canvas, @model

		renderLayer3: (canvas)->
			app.CardGenerator.generators.textGen.draw canvas, @model

		resize:-> 
			@renderCanvas()

		onLockButtonClicked: ->
			if @model.get('locked') is true
				@model.set 'locked', false,
					silent: true
				@$el.removeClass('locked')
				.find '.js-lock-config-button'
				.text 'Закрепить' 
			else
				@model.set 'locked', true,
					silent: true
				@$el.addClass('locked')
				.find '.js-lock-config-button'
				.text 'Открепить' 

		onMouseEnter: ->
			if !@model.has('locked') or @model.get('locked') isnt true 
				if @$el.hasClass('is-fliping')
					@$el.toggleClass 'fliped'
				@$el.prepend '<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>'
		onMouseLeave: ->
			if !@model.has('locked') or @model.get('locked') isnt true
				@$el.find('.js-lock-config-button-wrapper').remove()

