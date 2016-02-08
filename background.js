const workspacesSupported = chrome.app.window.canSetVisibleOnAllWorkspaces();

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('base.html', {
		state:"maximized",
		frame:"none",
		visibleOnAllWorkspaces:workspacesSupported
	},function(osui){
		osui.show();
		osui.fullscreen();
	});
});
