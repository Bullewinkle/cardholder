@app.module 'Cards', (Cards) ->	
	class Cards.CardView extends Marionette.ItemView
		logger: off

		tagName: 'li'
		className: 'card'

		ui:
			cardFront: '.card-svg.back'
			cardBack: '.card-svg.front'

		events:
			'mouseenter':  'onMouseEnter'
			'mouseleave':  'onMouseLeave'
			'click .js-lock-config-button': 'onLockButtonClicked'
			'transitionend': 'transitionCallback'

		template: => templatizer.cards.card @model

		# modelEvents: {}
		initialize: ->
			@bind 'all',  => 
				console.log "CARD ITEM VIEW:\t \t \t", arguments if @logger is on
			@model.view = @
			@state = new Backbone.Model()
			@listenTo @model,'change', @drawCard

			# @listenTo app,'resize', =>
			# 	@svgFront.viewbox 0, 0, @ui.cardFront.width() ,@ui.cardFront.height()
			# 	@svgBack.viewbox 0, 0, @ui.cardBack.width() ,@ui.cardBack.height()
			# 	@renderOnFront

			cardFront: '.card-svg.back'
			cardBack: '.card-svg.front'

		onShow: =>
			@drawCard()
			@ui.cardFront.attr 'id', "svg-#{@model.get 'id'}-front"
			@ui.cardBack.attr 'id', "svg-#{@model.get 'id'}-back"

			@svgFront = SVG(@ui.cardFront[0]).fixSubPixelOffset()
			@svgFront.width '101%'
			@svgFront.height '101%'
			# @svgFront.viewbox 0, 0, @ui.cardFront.width() ,@ui.cardFront.height()
			@svgFront.viewbox 0, 0, 96.6*4,54*4

			@svgBack = SVG(@ui.cardBack[0]).fixSubPixelOffset()
			@svgBack.width '101%'
			@svgBack.height '101%'
			# @svgBack.viewbox 0, 0, @ui.cardBack.width() ,@ui.cardBack.height()
			@svgBack.viewbox 0, 0, 96.6*4,54*4

		drawCard: =>
			if @model.get 'data.isDefault'
				if @model.get 'generators.textGen.isDefault'
					@loadFont @getRandomFont(), @renderOnBackWithAnimate
				else
					@renderOnBackWithAnimate()
			else
				if @model.get('generators.textGen.isDefault') or @model.get('generators.gradientGen.isDefault')
					@renderOnBackWithAnimate()
				else	
					@renderOnFront()

		loadFont: (fontFamily, successCallback, errorCallback) =>
			successCallback = successCallback or -> console.info 'font loading success'
			errorCallback = errorCallback or -> console.error 'font loading fail'

			# Load fonts dinamicaly through google web loader
			errorCallback = -> console.error 'error loading font'

			WebFont.load
				custom:
					families: [fontFamily]
					urls: ['/assets/font/card_fonts/' + fontFamily + '/' + fontFamily + '.css']
				fontloading:  =>
					# console.log 'fontloading:\t', arguments
				fontactive: (fontFamily, fontOptions)  =>
					@model.set 'generators.textGen.fontFamily', fontFamily, silent: true
					# console.log 'fontactive', @model.get 'generators.textGen.fontFamily'
					# console.info 'fontactive:\t \t', fontFamily, @
					# wait fot common custom fonts
					successCallback.apply(@)
					# if document.fonts
					# 	console.log 'loading font by document.fonts', arguments
					# 	document.fonts.load("10px cardholder-icons")
					# 	.then successCallback, errorCallback
					# else
					# 	console.log 'loading font by AJAX', arguments
					# 	$.get "/assets/font/cardholder-icons.woff?-a7jq52"
					# 	.then successCallback, errorCallback
				fontinactive:  =>
					console.warn 'fontinactive', @model.get 'generators.textGen.fontFamily'
					errorCallback.apply(@)
					# console.warn 'fontinactive:\t \t', arguments
					# wait fot common custom fonts
					# if document.fonts then document.fonts.load("10px cardholder-icons").then @renderOnBackWithAnimate, errorCallback
					# else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => @renderOnBackWithAnimate()f
			# # wait fot common custom fonts
			# if document.fonts then document.fonts.load("10px cardholder-icons").then @renderOnBackWithAnimate, errorCallback
			# else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => @renderOnBackWithAnimate()

		transitionCallback : (e) =>
			propertyName = e.originalEvent.propertyName
			# if e.target is @$el.find('.card-perspective-inner-wrapper')[0] and propertyName.search('transform') > -1
			if propertyName.search('transform') > -1
				@state.set 'is-flipping', false, silent: true
				@$el.removeClass 'is-fliping'
			# @trigger 'transitionend', e

		renderOnBack: =>
			unless @$el.hasClass 'fliped'
				 svg = @svgFront
			else
				svg = @svgBack
			@renderCard svg		

		renderOnFront: =>
			if @$el.hasClass 'fliped'
				 svg = @svgFront
			else
				svg = @svgBack
			@renderCard svg

		renderOnBackWithAnimate: =>
			@renderOnBack()
			@flip()	

		renderCard: (svg) =>
			# svg.width = @$el.width()
			# svg.height = @$el.height()
			svg.clear()
			@renderLayer1(svg)
			# @renderLayer2(svg)
			@renderLayer3(svg)
			svg

		renderLayer1: (svg) =>
			console.log svg
			app.shared.generators.gradientGen.draw svg, @model

		renderLayer2: (svg) =>
			app.shared.generators.iconsGen.draw svg, @model

		renderLayer3: (svg) =>
			# (new app.shared.generators.TextGen(svg, @model)).draw()

		getRandomFont: =>
			fontsList = dataFromServer.appData.fontsList
			fontFamily = ''+ fontsList[ app.getRandom(0, fontsList.length-1) ]
			fontFamily

		flip: =>
			@trigger 'flip'
			@$el.toggleClass 'fliped'
			@$el.addClass 'is-fliping'
			@state.set 'is-flipping', true, silent: true

		onLockButtonClicked: ->
			if @state.get('is-locked') is true
				@state.set 'is-locked', false,
					silent: true
				@$el.removeClass('is-locked')
				.find '.js-lock-config-button'
				.text 'Закрепить' 
			else
				@state.set 'is-locked', true,
					silent: true
				@$el.addClass('is-locked')
				.find '.js-lock-config-button'
				.text 'Открепить' 

		onMouseEnter: ->
			@$el.addClass 'is-hovered'
			@state.set 'is-hovered', true, silent: true
			if not (@state.has('is-locked') or @state.get('is-locked') )
				if @$el.hasClass('is-fliping')
					@$el.toggleClass 'fliped'
				@$el.prepend '<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>'
		onMouseLeave: ->
			@$el.removeClass 'is-hovered'
			@state.set 'is-hovered', false, silent: true
			if @state.get('is-locked') isnt true
				@$el.find('.js-lock-config-button-wrapper').remove()

