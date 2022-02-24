const MAX_QRCODE_COUNT = 256;
let qrcodeCodexw = null;

// 生成弹窗二维码html
function createQrcodeWinHtml () {
  var html=`<div class="xw-qrcode__win555" id="xwQrcodeWin555">
              <div class="xw-qrcode__con555" id="xwQrcodeCon555">
              </div>
              <a class="xw-qrcode__close555" id="xwQrcodeClose555">×</a>
            </div>`;
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  document.body.appendChild(tempDiv);
  // 关闭按钮功能
  document.getElementById("xwQrcodeClose555").addEventListener("click", function() {
    hideQrcodeWin ();
  },false);
}

// 生成二维码
function createQrcode (str) {
  // 如果对象已存在则无必再new
  if (!qrcodeCodexw) {
    qrcodeCodexw = new QRCode(document.getElementById("xwQrcodeCon555"), {
      text: str,
      width: 256,
      height: 256,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.Q
    });
  } else {
    qrcodeCodexw.makeCode(str);
  }
  showQrcodeWin ();
}

// 显示二维码弹窗
function showQrcodeWin () {
  document.getElementById("xwQrcodeWin555").className = "xw-qrcode__win555 xw-qrcode__win555--show";
}

// 关闭二维码弹窗
function hideQrcodeWin () {
  document.getElementById("xwQrcodeWin555").className = "xw-qrcode__win555";
}


// 创建用于放二维码的元素
window.onload = function () {
  createQrcodeWinHtml();
}

chrome.runtime.onConnect.addListener(function(port){
  if (port.name === "createQrcode") {
    port.onMessage.addListener(function(response) {
      if (response.cmd === "qrcode") {
        let tips = response.value;
        if (tips) {
          if (tips.length > MAX_QRCODE_COUNT) {
            notification('过长的文本只会截取前256个字符生成二维码！');
          }
          createQrcode(tips.slice(0, MAX_QRCODE_COUNT));
        } else {
          notification('请选择你想要生成二维码的文本！');
        }
      }
    });
  }
});

/**
 * 消息通知
 * @param {String} tips 
 */
function notification(tips) {
  // // 创建一个简单的文字通知：
  // var notification = webkitNotifications.createNotification(
  //   'icon48.png',  // icon url - can be relative
  //   '温馨提示',  // notification title
  //   tips  // notification body text
  // );

  // // 显示通知
  // notification.show();

  chrome.notifications.create(
    'countExceed',
    {
      type: 'basic',
      iconUrl: 'icon48.png',
      title: '温馨提示',
      message: 'tips'
    }
  )
}
