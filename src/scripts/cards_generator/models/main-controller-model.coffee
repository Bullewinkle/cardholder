@app.module 'CardGenerator.models', (Models) ->
	class Models.mainControllerModel extends Backbone.DeepModel
		loger: off

		defaults:
			formStep : 1

		initialize: ->
			@bind 'all', (trigger, args) => 
				if @loger is on
					console.info 'MainControllerModel says :',trigger,args

