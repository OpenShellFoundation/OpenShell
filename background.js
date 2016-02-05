const workspacesSupported = chrome.app.window.canSetVisibleOnAllWorkspaces();

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('os.html', {
		state:"maximized",
		frame:"none",
		hidden:true,
		visibleOnAllWorkspaces:workspacesSupported
	},function(osui){
		osui.show();
		osui.fullscreen();
	});
});
