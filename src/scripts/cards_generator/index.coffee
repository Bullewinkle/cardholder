app.module 'CardGenerator', ->
	@addInitializer ->
		console.log 'Init: CardGenerator', @

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