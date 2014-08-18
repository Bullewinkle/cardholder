@app.module 'CardGenerator', (CardGenerator) ->
	class CardGenerator.Router extends Marionette.AppRouter

		logger: off

		initialize: ->
			@bind 'all', ->
				console.info 'CardGenerator Router:', arguments if @logger is on

		appRoutes: 
			'(/)': 'showHome'
			'cards-generator(/)': 'showCardsGenerator'
			'page(/)': 'showPage'
			'*other': 'showNotFound'

		onRoute: (trigger, route, params) ->
			# add new current link class 'active'
			$activeLink = $('.main-menu').find("a[href='#{window.location.pathname}']").eq(0).parent()
			if $activeLink.length is 0 then $activeLink = $('.main-menu').find("a[href='/other-route']").eq(0).parent()
			$activeLink.addClass('active').siblings().removeClass('active')