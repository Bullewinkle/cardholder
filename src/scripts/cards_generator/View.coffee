@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.CardsView extends Marionette.CompositeView
		logging: off

		counter: 0

		ui:
			'stepForm'          : '.step-form-controller-form'
			'mainInput'         : '.step-form-controller-form-input'
			'controlNext'       : '.step-form-controller-form-control.next'
			'controlPrev'       : '.step-form-controller-form-control.prev'
			'question'          : '.step-form-controller-form-label'
			'currentStep'       : '.step-form-controller-form-statusbar-current'
			'questionsQuantity' : '.step-form-controller-form-statusbar-quantity'
					
		events: 
			'submit @ui.stepForm'             : 'submit'
			'select2-selecting @ui.mainInput' : 'select2ChoiseSelected'
			'select2-removed @ui.mainInput'   : 'select2choiseRemoved'
			'click @ui.controlNext'           : 'stepNext'
			'click @ui.controlPrev'           : 'stepPrev'

		template: (model) ->
			templatizer.cardsGenerator.cardsGreed @model

		initialize: ->
			@bind 'all', ->
				console.log "CARDS COMPOSITE VIEW:\t", arguments if @logging is on

			@data = app.CardGenerator.data.get 'appData'

			@childViewContainer = '.cards'
			@childView = CardGenerator.cards.CardView
			
			@state      = new Backbone.Model()
			@model      = new CardGenerator.stepForm.StepFormModel()
			@collection = new CardGenerator.cards.CardsCollection()

			# @modelView  = new CardGenerator.stepForm.StepFormView()
			# @stepForm = new CardGenerator.stepForm.StepFormView
			# 	model: new CardGenerator.stepForm.StepFormModel()

			# @start()	

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

			@changeStep(1)

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
			console.log @
			switch @currentStep
				when 1
					console.log "step: 1",e.object.sex
					@collection.each (model,i) ->
						if !model.get('locked') or model.get('locked') is not true
							model.set('data.name',e.object.text)
							model.set('data.sex',e.object.sex)
				when 2
					console.log "step: 2"
					@collection.each (model,i) ->
						if !model.get('locked') or model.get('locked') is not true
							model.set('data.surname',e.object.text)
				when 3
					console.log "step: 3"
					@collection.each (model,i) ->
						if !model.get('locked') or model.get('locked') is not true
							model.set('data.eMail',e.object.text)
				when 4
					console.log "step: 4"
					@collection.each (model,i) ->
						if !model.get('locked') or model.get('locked') is not true
							model.set('data.phone',e.object.text)
				when 5
					console.log "step: 5"
					@collection.each (model,i) ->
						if !model.get('locked') or model.get('locked') is not true
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

