@app.module 'CardGenerator.cards', (Cards) ->
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
				gradientGen: 
					isDefault: true
					gradientVariantNum: 0
					gradientType: 'linear'
					gradientDirection: '45deg'
					colorScheme:["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]

				textGen:
					isDefault: true
					textAlign: 'auto'
					fontFamily: 'sans-serif'

				starsGen:
					isDefault: true