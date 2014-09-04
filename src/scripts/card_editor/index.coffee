app.module 'CardEditor', (CardEditor) ->
	@addInitializer ->
		@controller =  new CardEditor.Controller()
		@router = new CardEditor.Router controller: @controller
		@editorView = new CardEditor.CardEditorView()

