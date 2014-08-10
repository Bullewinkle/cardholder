app.module 'CardGenerator', ->
	@addInitializer ->




		html = templatizer.cardsgreed()		
		$('#app').html html





		console.log 'Init: CardGenerator', @Router

		@router = new @Router()
		
		@data = new Backbone.Model
		@state = new Backbone.Model

		@data.set dataFromServer.appdata
		$.ajax 
			url: '/fonts-list'
			async: false
			success: (fontList) =>
				@data.set 'fontsList', fontList

			error: (xhr) =>
				console.error 'Error: ',xhr.responseText