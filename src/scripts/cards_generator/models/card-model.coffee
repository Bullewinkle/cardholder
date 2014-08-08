@app.module 'CardGenerator.models', (Models) ->
	class Models.CardModel extends Backbone.DeepModel
		defaults: 
			data:
				defaultData: true
				sex: 'male'
				name: 'Default'
				surname: 'Default'
				phone: 'Default'
				eMail: 'Default'
				position: 'Default'

			generators:
				gradientGen: 
					defaultOptions: true
					gradientVariantNum: 0
					gradientType: 'linear'
					gradientDirection: '45deg'
					colorScheme:["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]
					# from: '0%'
					# to: '100%'
					# fromColor: '#000'
					# toColor: 'transparent'
				textGen:
					defaultOptions: true
					textAlign: 'auto'
					fontFamily: 'sans-serif'
