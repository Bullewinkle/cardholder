window.app.module 'Common', (Common) ->
	class Common.Router extends Marionette.AppRouter
		logger: off

		appRoutes: 
			'(/)': 'showHome'
			'card-generator(/)': 'showCards'
			'card-editor(/)': 'showCardEditorLayout'
			'page(/)': 'showPage'
			'*other': 'showNotFound'

		initialize: ->
			@bind 'all', ->
				console.info 'Cards Router:', arguments if @logger is on

		onRoute: (trigger, route, params) ->
			# add new current link class 'active'
			$activeLink = $('.main-menu').find("a[href='#{window.location.pathname}']").eq(0).parent()
			if $activeLink.length is 0 then $activeLink = $('.main-menu').find("a[href='/other-route']").eq(0).parent()
			$activeLink.addClass('active').siblings().removeClass('active')