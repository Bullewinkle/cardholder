app.module 'CardEditor', (CardEditor) ->
	@addInitializer ->
		@controller =  new CardEditor.Controller()
		@router = new CardEditor.Router controller: @controller
		@cardEditorLayout = new CardEditor.CardEditorLayout()

