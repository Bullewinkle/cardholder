app.module 'CardEditor', (CardEditor) ->
	@addInitializer ->
		@controller =  new CardEditor.Controller()
		@router = new CardEditor.Router controller: @controller
		@cardsView = new CardEditor.CardEditorView()

