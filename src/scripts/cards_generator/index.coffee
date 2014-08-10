app.module 'CardGenerator', (CardGenerator) ->
	@addInitializer ->
		console.log 'Initializing: CardGenerator module...'

		@controller =  new CardGenerator.Controller
		@router = new CardGenerator.Router
			controller: @controller

		@data = new Backbone.Model
		@state = new Backbone.Model
		@data.set dataFromServer.appdata

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
			console.log 'backbone history started'