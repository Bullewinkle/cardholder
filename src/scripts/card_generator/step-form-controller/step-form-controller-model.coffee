@app.module 'CardGenerator.stepForm', (StepForm) ->
	class StepForm.StepFormModel extends Backbone.DeepModel
		loger: off

		defaults:
			currentStep : 1

		initialize: ->
			@bind 'all', (trigger, args) => 
				if @loger is on
					console.info 'StepFormModel says :',trigger,args

