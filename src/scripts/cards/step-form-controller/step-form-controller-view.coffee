@app.module 'Cards.stepForm', (StepForm) ->
	class StepForm.StepFormView extends Backbone.View
		loger: off

		# template: (model) ->
		# 	templatizer.cards.stepForm
		# 		data: model
				
		tagName: 'li'
		className: 'card step-form-controller-wrapper'

		