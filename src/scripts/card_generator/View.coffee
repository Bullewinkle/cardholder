window.app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.CardsView extends Marionette.CompositeView
		logging: off
		counter: 0

		className: 'card-generator-view'

		ui:
			'stepForm'          : '.step-form-controller-form'
			'mainInput'         : '.step-form-controller-form-input'
			'controlNext'       : '.step-form-controller-form-control.next'
			'controlPrev'       : '.step-form-controller-form-control.prev'
			'question'          : '.step-form-controller-form-label'
			'currentStep'       : '.step-form-controller-form-statusbar-current'
			'questionsQuantity' : '.step-form-controller-form-statusbar-quantity'
			'printButton'       : '.print-selected-cards'
					
		events: 
			'submit @ui.stepForm'             : 'submit'
			'select2-selecting @ui.mainInput' : 'select2ChoiseSelected'
			'select2-removed @ui.mainInput'   : 'select2choiseRemoved'
			'click @ui.controlNext'           : 'stepNext'
			'click @ui.controlPrev'           : 'stepPrev'
			'click @ui.printButton'           : 'printSelectedCards'

		template: (model) ->
			templatizer.cardGenerator.cardsGreed @model

		initialize: ->
			@bind 'all', ->
				console.log "CARDS COMPOSITE VIEW:\t", arguments if @logging is on
			
			@data = dataFromServer.appData

			@childViewContainer = '.cards'
			@childView = CardGenerator.cards.CardView
			
			@state      = new Backbone.Model()
			@model      = new CardGenerator.stepForm.StepFormModel()
			@collection = new CardGenerator.cards.CardsCollection()

		onShow: =>
			@currentStep = @model.get 'currentStep'
			@questions  = @data.questions

			window.onkeydown = (e) =>
				switch e.keyCode
					when 37
						e.preventDefault()
						@ui.controls.prev.trigger 'click'
					when 39
						e.preventDefault()
						@ui.controls.next.trigger 'click'

			@names = []
			@surnames = []

			names = @data.names
			emails = @data.emails
			phones = false
			positions = @data.positions
			questions = @data.questions
			surnames = @data.surnames

			@src = [ names, surnames, emails, phones, positions] 

			$( @ui.mainInput ).select2
				width: '100%'
				placeholder : 'введите ответ'
				allowClear: true
				maximumSelectionSize: 2
				allowClear: true
				initSelection : (element, callback) ->
					data = []
					$(element.val().split(",")).each ->
						data.push({id: this, text: this})
						return
					callback(data)
				tags: =>
					if @currentStep
						return @src[@currentStep-1] or []
					else 
						return []
				multiple: true

						# wait fot common custom fonts
			if document.fonts then document.fonts.load("10px cardholder-icons").then => 
				@changeStep(1)
	
				# @randomRender()
				setTimeout =>
					setInterval @randomRender, 2000
				, 1000

			else $.get "/assets/font/cardholder-icons.woff?-a7jq52", => 
				@changeStep(1)
	
				# @randomRender()
				setTimeout =>
					setInterval @randomRender, 2000
				, 1000


		randomRender: =>
			notLockedViews = @children.filter (view) ->
				return view.model.get('is-locked') isnt true
			randomView = notLockedViews[ app.getRandom(0, notLockedViews.length-1) ]
			if notLockedViews.length > 0 and randomView and not ( randomView.model.get('is-hovered') or randomView.model.get('is-locked') )
				if notLockedViews.length < 3
					@previousViewCid = randomView.cid
					randomView.model.clear({silent: true}).set(randomView.model.defaults)
				else
					if randomView.cid isnt @previousViewCid
						@previousViewCid = randomView.cid
						randomView.model.clear({silent: true}).set(randomView.model.defaults)
					else
						@randomRender()

		changeStep : (step) =>
			@currentStep = step
			@model.set 'formStep', step
			@ui.currentStep.text(@currentStep+' ')
			@ui.questionsQuantity.text(@questions.length)
			@ui.question.text(@questions[@currentStep-1])

		submit: (e) =>
			e.preventDefault()
			formVal = @$('.step-form-controller-form-statusbar-value')
			questionNum = @currentStep
			questionNum++
			formVal.width (100/ @questions.length * (questionNum-1) + '%')
			@ui.mainInput.select2('val','')
			if questionNum is @questions.length+1

				console.info('The questions is over!')
				@ui.question.text('Вопросы кончились!')
				@completed=true
				@ui.mainInput.select2 'val',''
				@ui.mainInput.select2 'enable', false
				return
			else
				@ui.mainInput.select2 'enable', true
				@changeStep(questionNum)

		stepNext : =>
			if @currentStep <= @questions.length
				@ui.stepForm.trigger 'submit'

		stepPrev : =>
			if @currentStep > 1
				@currentStep = @currentStep-2
				@ui.stepForm.trigger 'submit'

		select2ChoiseSelected: (e) => 
			switch @currentStep
				when 1
					console.log "step: 1",e.object.sex
					@collection.each (model,i) ->
						if !model.get('is-locked') or model.get('is-locked') is not true
							model.set('data.name',e.object.text)
							model.set('data.sex',e.object.sex)
				when 2
					console.log "step: 2"
					@collection.each (model,i) ->
						if !model.get('is-locked') or model.get('is-locked') is not true
							model.set('data.surname',e.object.text)
				when 3
					console.log "step: 3"
					@collection.each (model,i) ->
						if !model.get('is-locked') or model.get('is-locked') is not true
							model.set('data.eMail',e.object.text)
				when 4
					console.log "step: 4"
					@collection.each (model,i) ->
						if !model.get('is-locked') or model.get('is-locked') is not true
							model.set('data.phone',e.object.text)
				when 5
					console.log "step: 5"
					@collection.each (model,i) ->
						if !model.get('is-locked') or model.get('is-locked') is not true
							model.set('data.position',e.object.text)

		select2choiseRemoved: (e) =>
			if e.choice.text is @names[0]
				@names.shift()

			if e.choice.text is @names[1]
				@names.pop()
			if @currentStep is 1
				@names = []
			if @currentStep is 2
				@surnames = []

		printSelectedCards: =>
			$('body').find('#overlay').addClass 'rendering-pdf'

			# <----------------------------- RENDERING ON SERVERSIDE -------------------------------->

			# card = @children.findByIndex(0).$el
			# if card.$el.hasClass 'fliped'
			# 	 dataImg = card.$el.find('.card-canvas.front')[0].toDataURL()
			# else
			# 	dataImg = card.$el.find('.card-canvas.back')[0].toDataURL()
			# console.log dataImg
			# $.post('/pdf-generator', data: dataImg)

			#$('body').find('#overlay').removeClass 'rendering-pdf'

			# <----------------------------- END RENDERING ON SERVERSIDE ----------------------------->



			# <----------------------------- END RENDERING ON CLIENTSIDE ----------------------------->

			deffer = =>

				# TODO calculate proper mm with meazurement of DPI like this: 
				# +( app.getUnits($('canvas')[0],'width').cm*10 ).toFixed()

				pdfOptions =
					pdfWidth:  291.17
					pdfHeight:  442.98
					margin:
						top: 3
						left: 6.5
						bottom: 3.3
						right: 4.7

					cardPerLine: 3
					cardWidth: 94
					cardHeight: 54
					linesCounter: 0



				pdf = new jsPDF('p','mm', [ pdfOptions.pdfWidth, pdfOptions.pdfHeight ] )

				window.renderingPDF = true
				@$el.find('#cardsGreed').addClass 'prepare-to-pdf'
				app.trigger 'resize'


				selectedCards = @children.filter (view) ->
					view.model.get('is-locked') is true

				cardsCounter = selectedCards.length


				onLineCounter = 0
				for i in [0...24]
					cardIndex = i%selectedCards.length
					card = selectedCards[cardIndex]

					if not card.$el.hasClass 'fliped'
						 cardCanvas = card.$el.find('.card-canvas.front')[0]
					else
						cardCanvas = card.$el.find('.card-canvas.back')[0]
					imgData = cardCanvas.toDataURL()

					newLineCounter = Math.floor(i/pdfOptions.cardPerLine)
					if newLineCounter > pdfOptions.linesCounter
						pdfOptions.linesCounter++
						onLineCounter = 0

					x = (pdfOptions.cardWidth*onLineCounter++)+pdfOptions.margin.left
					y = (pdfOptions.cardHeight*pdfOptions.linesCounter)+pdfOptions.margin.top

					pdf.addImage(imgData , 'JPEG', x, y, pdfOptions.cardWidth, pdfOptions.cardHeight )

				pdf.save 'card_holder.pdf'
				window.renderingPDF = false

				@$el.find('#cardsGreed').removeClass 'prepare-to-pdf'
				$('body').find('#overlay').removeClass 'rendering-pdf'
			
			setTimeout deffer, 300

			# <----------------------------- END RENDERING ON CLIENTSIDE ----------------------------->



