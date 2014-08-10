@app.module 'CardGenerator', (CardGenerator) ->

	class CardGenerator.Router extends Marionette.AppRouter

		initialize: ->
			console.log 'Init: Router1'
			@bind 'all', ->
				console.info 'CardGenerator Router:', arguments

		appRoutes: 
			'(/)': 'showHome'
			'cards-generator(/)': 'showCardsGenerator'
			'page(/)': 'showPage'
			'*other': 'showNotFound'

		onRoute: (trigger, route, params) ->
			$('.main_menu').find("a[href='#{window.location.pathname}']").eq(0).parent().addClass('active').siblings().removeClass('active')