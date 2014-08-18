app.module 'CardGenerator', (CardGenerator) ->
	@addInitializer ->
		@controller =  new CardGenerator.Controller
		@router = new CardGenerator.Router controller: @controller
		@data = new Backbone.DeepModel dataFromServer
		@cardsView = new CardGenerator.CardsView

		# COMMON SETUP ( must be part off global app setup )
		$("a[href^='/']","body").click  (e) =>
			href = $(e.target).attr 'href'
			if href.indexOf('/api') isnt 0
				e.preventDefault()
				@router.navigate href,
					trigger: true

		if not Backbone.history.started
			Backbone.history.start
				pushState: true
