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
      width: 200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request);
  if (request.cmd === "qrcode") {
    if (request.value) {
      createQrcode (request.value);
      sendResponse (request.value);
    } else {
      alert('请选择你想要生成二维码的文本！');
    }
  }
});