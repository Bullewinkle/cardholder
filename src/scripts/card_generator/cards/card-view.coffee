@app.module 'CardGenerator.cards', (Cards) ->	
	class Cards.CardView extends Marionette.ItemView
		logger: off

		tagName: 'li'
		className: 'card'

		ui:
			canvasFront: '.card-canvas.back'
			canvasBack: '.card-canvas.front'

		template: =>
			templatizer.cardGenerator.card @model
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
			@listenTo @model,'change', @renderOnBackWithAnimate
			@listenTo app,'resize', @resize

		onShow: =>
			handleError = -> console.error 'error loading font'
			fontsList = dataFromServer.appData.fontsList
			fontFamily = ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]


			# Load fonts dinamicaly through google web loader
			WebFont.load
				custom:
					families: [fontFamily]
					urls: ['/assets/font/card_fonts/' + fontFamily + '/' + fontFamily + '.css']
				fontloading:  =>
					# console.log 'fontloading:\t', arguments
				fontactive: (fontFamily, fontOptions)  =>
					@model.set 'generators.textGen.fontFamily', fontFamily, silent: true
					console.log 'fontactive', @model.get 'generators.textGen.fontFamily'
					# console.info 'fontactive:\t \t', fontFamily, @
					# wait fot common custom fonts
					if document.fonts then document.fonts.load("10px cardholder-icons").then @renderOnBackWithAnimate, handleError
					else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => @renderOnBackWithAnimate()
				fontinactive:  =>
					@model.set 'generators.textGen.fontFamily', fontFamily, silent: true
					console.log 'fontinactive', @model.get 'generators.textGen.fontFamily'
					# console.warn 'fontinactive:\t \t', arguments
					# wait fot common custom fonts
					if document.fonts then document.fonts.load("10px cardholder-icons").then @renderOnBackWithAnimate, handleError
					else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => @renderOnBackWithAnimate()

			# # wait fot common custom fonts
			# if document.fonts then document.fonts.load("10px cardholder-icons").then @renderOnBackWithAnimate, handleError
			# else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => @renderOnBackWithAnimate()

		transitionCallback : (e) =>
			propertyName = e.originalEvent.propertyName
			# if e.target is @$el.find('.card-perspective-inner-wrapper')[0] and propertyName.search('transform') > -1
			if propertyName.search('transform') > -1
				@$el.removeClass 'is-fliping'
			@trigger 'transitionend', e

		renderOnFront: =>
			console.log 
			if not @$el.hasClass 'fliped'
				 canvas = @$el.find('.card-canvas.front')[0]
			else
				canvas = @$el.find('.card-canvas.back')[0]
			@renderCanvas canvas

		renderOnBack: =>
			if @$el.hasClass 'fliped'
				 canvas = @$el.find('.card-canvas.front')[0]
			else
				canvas = @$el.find('.card-canvas.back')[0]
			@renderCanvas canvas

		renderOnBackWithAnimate: =>
			@renderOnBack()
			@flip()			

		renderCanvas: (canvas) =>
			canvas.width = @$el.width()
			canvas.height = @$el.height()

			@renderLayer1(canvas)
			@renderLayer2(canvas)
			@renderLayer3(canvas)
			
			canvas

		renderLayer1: (canvas) ->
			app.CardGenerator.generators.gradientGen.draw canvas, @model

		renderLayer2: (canvas)->
			app.CardGenerator.generators.iconsGen.draw canvas, @model

		renderLayer3: (canvas)->
			app.CardGenerator.generators.textGen.draw canvas, @model

		resize:-> 
			@renderOnFront()

		flip: =>
			@trigger 'flip'
			@$el.toggleClass 'fliped'
			@$el.addClass 'is-fliping'			

		onLockButtonClicked: ->
			if @model.get('is-locked') is true
				@model.set 'is-locked', false,
					silent: true
				@$el.removeClass('is-locked')
				.find '.js-lock-config-button'
				.text 'Закрепить' 
			else
				@model.set 'is-locked', true,
					silent: true
				@$el.addClass('is-locked')
				.find '.js-lock-config-button'
				.text 'Открепить' 

		onMouseEnter: ->
			@$el.addClass 'is-hovered'
			@model.set 'is-hovered', true, silent: true
			if not (@model.has('is-locked') or @model.get('is-locked') )
				if @$el.hasClass('is-fliping')
					@$el.toggleClass 'fliped'
				@$el.prepend '<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>'
		onMouseLeave: ->
			@$el.removeClass 'is-hovered'
			@model.set 'is-hovered', false, silent: true
			if @model.get('is-locked') isnt true
				@$el.find('.js-lock-config-button-wrapper').remove()

