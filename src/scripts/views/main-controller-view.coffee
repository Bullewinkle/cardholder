@App.MainControllerView = class App.MainControllerView extends Backbone.View
	loger: off

	tagName: 'li'
	className: 'main_controller_wrapper'
	el: $('.main_controller_wrapper')[0]

	events: 
		'submit .main_controller_form': 'submit'
		'click .main_controller_form_control.prev': 'stepPrev'
		'click .main_controller_form_control.next': 'stepNext'
		'select2-selecting .main_controller_form_input': 'select2ChoiseSelected'
		'select2-removed .main_controller_form_input': 'select2choiseRemoved'

	initialize: =>
		@bind 'all', (trigger, args) => 
			if @loger is on
				console.info 'MainControllerView says :',trigger,args

		@elements = 
			formNode : @$('.main_controller_form')
			questionNode : @$('.main_controller_form_label')
			inputNode : @$('.main_controller_form_input')
			currentStepNode : @$('.main_controller_form_statusbar_current')
			questionsQuantityNode : @$('.main_controller_form_statusbar_quantity')
			controls : 
				prev: @$('.main_controller_form_control.prev')
				next: @$('.main_controller_form_control.next')
		@start()

	start: =>
		@trigger 'start'
		@formStep = @model.get 'formStep'
		@questions  = app.data.get 'questions'

		window.onkeydown = (e) =>
			switch e.keyCode
				when 37
					e.preventDefault()
					@elements.controls.prev.trigger 'click'
				when 39
					e.preventDefault()
					@elements.controls.next.trigger 'click'

		@names = []
		@surnames = []

		names = app.data.get('names')
		emails = app.data.get('emails')
		phones = false
		positions = app.data.get('positions')
		questions = app.data.get('questions')
		surnames = app.data.get('surnames')

		@src = [ names, surnames, emails, phones, positions] 


		@elements.inputNode.select2
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
				if @formStep
					return @src[@formStep-1] or []
				else 
					return []
			multiple: true

		@changeStep(1)

	changeStep : (step) =>
		@formStep = step
		@model.set 'formStep', step
		@elements.currentStepNode.text(@formStep+' ')
		@elements.questionsQuantityNode.text(@questions.length)
		@elements.questionNode.text(@questions[@formStep-1])

	submit: (e) =>
		e.preventDefault()
		formVal = @$('.main_controller_form_statusbar_value')
		questionNum = @formStep
		questionNum++
		formVal.width (100/ @questions.length * (questionNum-1) + '%')
		@elements.inputNode.select2('val','')
		if questionNum is @questions.length+1

			console.info('The questions is over!')
			@elements.questionNode.text('Вопросы кончились!')
			@completed=true
			@elements.inputNode.select2 'val',''
			@elements.inputNode.select2 'enable', false
			return
		else
			@elements.inputNode.select2 'enable', true
			@changeStep(questionNum)

	stepNext : =>
		if @formStep <= @questions.length
			@elements.formNode.trigger 'submit'

	stepPrev : =>
		if @formStep > 1
			@formStep = @formStep-2
			@elements.formNode.trigger 'submit'

	select2ChoiseSelected: (e) => 
		console.log @
		switch @formStep
			when 1
				console.log "step: 1",e.object.sex
				app.cardsCollection.each (model,i) ->
					if !model.get('locked') or model.get('locked') is not true
						model.set('data.name',e.object.text)
						model.set('data.sex',e.object.sex)
			when 2
				console.log "step: 2"
				app.cardsCollection.each (model,i) ->
					if !model.get('locked') or model.get('locked') is not true
						model.set('data.surname',e.object.text)
			when 3
				console.log "step: 3"
				app.cardsCollection.each (model,i) ->
					if !model.get('locked') or model.get('locked') is not true
						model.set('data.eMail',e.object.text)
			when 4
				console.log "step: 4"
				app.cardsCollection.each (model,i) ->
					if !model.get('locked') or model.get('locked') is not true
						model.set('data.phone',e.object.text)
			when 5
				console.log "step: 5"
				app.cardsCollection.each (model,i) ->
					if !model.get('locked') or model.get('locked') is not true
						model.set('data.position',e.object.text)

	select2choiseRemoved: (e) =>
		if e.choice.text is @names[0]
			@names.shift()

		if e.choice.text is @names[1]
			@names.pop()
		if @formStep is 1
			@names = []
		if @formStep is 2
			@surnames = []

	render: =>
