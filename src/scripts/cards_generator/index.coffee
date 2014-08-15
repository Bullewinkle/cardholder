app.module 'CardGenerator', (CardGenerator) ->
	@addInitializer ->
		console.debug 'Initializing: CardGenerator module...'

		# @bind 'all', =>
		# 	console.log arguments

		@controller =  new CardGenerator.Controller
		@router = new CardGenerator.Router controller: @controller

		@data = new Backbone.DeepModel dataFromServer

		@cardsView = new CardGenerator.CardsView

		$("a[href^='/']","body").click  (e) =>
			href = $(e.target).attr 'href'
			if href.indexOf('/api') isnt 0
				e.preventDefault()
				@router.navigate href,
					trigger: true

		$.ajax 
			url: '/api/fonts-list'
			async: false
			success: (fontList) =>
				@data.set 'fontsList', fontList

			error: (xhr) =>
				console.error 'Error: ',xhr.responseText

		if not Backbone.history.started
			Backbone.history.start
				pushState: true
