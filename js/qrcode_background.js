  chrome.contextMenus.create({
    type: 'normal',
    title: '生成二维码',
    id: 'qrcodeCm',
    contexts: ['selection']
  });

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    createQrcode(info, tab);
  });

  function createQrcode(info, tab) {
    sendMessageToContentScript({cmd:'qrcode', value:info.selectionText}, tab, function(response) {
      // console.log('来自content的回复：'+response);
    });
  }

  // 发送消息
  function sendMessageToContentScript(message, tab, callback) {
    port = chrome.tabs.connect(tab.id,{name: "createQrcode"}); 
    port.postMessage(message);
  }



