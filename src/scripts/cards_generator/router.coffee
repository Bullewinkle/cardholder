@app.module 'CardGenerator', (CardGenerator) ->

	class CardGenerator.Router extends Marionette.AppRouter

		initialize: ->
			console.log 'Init: Router'

		appRoutes: 
			'(/)': 'index'
			'any(/)': 'any'
			'*other': 'notFound'

		controller: new CardGenerator.Controller()

		onRoute: (args...) ->
			console.log args

	@addInitializer ->	
		console.log 'Init: Router', new CardGenerator.Controller()
		# @router = new CardGenerator.Router()
	# @addInitializer ->