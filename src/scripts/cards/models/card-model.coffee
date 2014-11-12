@app.module 'Cards', (Cards) ->
	class Cards.CardModel extends Backbone.DeepModel
		defaults: 
			data:
				isDefault: true
				sex: 'male'
				name: 'Default'
				surname: 'Default'
				phone: 'Default'
				eMail: 'Default'
				position: 'Default'

			generators:
				gradientGenerator: 
					isDefault: true
					gradientVariantNum: 0
					gradientType: 'linear'
					gradientDirection: '45deg'
					colorScheme:["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]
					variantConfig:
						isDefault: true

				textGenerator:
					isDefault: true
					heading:
						color: "#000"
						padding:
							top: 20 
							left: 0 
							bottom: 0
							right: 0 
						margin:
							top: 0
							left: 0 
							bottom: 0
							right: 0 
						textAlign: 'auto'
						maxWidth: '100%'
						font: 
							family: 'sans-serif'
							size: 30
							anchor: 'middle'
							leading: 1

					info:
						color: "#000"
						padding:
							top: 20 
							left: 0 
							bottom: 0
							right: 0 
						margin:
							top: 0
							left: 0 
							bottom: 0
							right: 0 
						textAlign: 'auto'
						maxWidth: '100%'
						font: 
							family: 'sans-serif'
							size: 20
							anchor: 'middle'
							leading: 1

	class Cards.CardsCollection extends Backbone.Collection		
		logging: off

		url: '/api/cards-generator'
		model: Cards.CardModel
		initialize: ->
			@bind 'all', =>
				console.log "CARDS COLLECTION:\t", arguments if @logging is on
			@reset dataFromServer.cardsConfig
			@trigger 'ready'							