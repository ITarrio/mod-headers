var headers = [
	{"name":"X-Version-Override","value":"nevo-service=b|nevo-resources=b|nevo-external-services=b"},
	{"name":"XD-Vr-Ui-search-Disable-EhCache-NEVO","value":"true"},
	{"name":"XD-Vr-Ui-detail-Disable-EhCache-NEVO","value":"true"}
]

function rewriteUserAgentHeader(e) {
	for (var toEdit of headers){
		var edited = false;
		for (var header of e.requestHeaders) {
			if (header.name == toEdit.name) {
		  		header.value = toEdit.value;
		  		edited = true;
			}
		}
		if (!edited) {
			e.requestHeaders.push(toEdit);
		}
	}
  return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);