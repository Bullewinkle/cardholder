@app.module 'CardGenerator.stepForm', (StepForm) ->
	class StepForm.StepFormView extends Backbone.View
		loger: off

		# template: (model) ->
		# 	templatizer.cardGenerator.stepForm
		# 		data: model
				
		tagName: 'li'
		className: 'card step-form-controller-wrapper'

		