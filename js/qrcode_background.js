chrome.contextMenus.create({
  type: 'normal',
  title: '生成二维码',
  id: 'qrcodeCm',
  contexts: ['selection'],
  onclick: createQrcode
});

function createQrcode(info, tab) {
  console.log('点击我的右键菜单了!',info, tab);
  sendMessageToContentScript({cmd:'qrcode', value:info.selectionText}, function(response) {
    console.log('来自content的回复：'+response);
  });
}

// 发送消息
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, message, {},function(response){
          if(callback) callback(response);
      });
  });
}

