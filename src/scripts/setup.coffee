app.module 'setup', (Setup) ->
	
	# COMMON SETUP

	$("a[href^='/']","body").click  (e) =>
		link = e.target
		$link = $(link)
		href = $link.attr 'href'
		unless ( link.attributes['data-native-route'] or href.indexOf('/api') is 0 )
			e.preventDefault()
			app.router.navigate href,
				trigger: true

	
	# WINDOW RESIZE

	onResize = _.debounce => app.trigger 'resize', 250
	$(window).on resize: onResize	