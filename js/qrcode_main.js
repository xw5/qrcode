let nowUrl = "https://www.baidu.com";
let qrcodeMain = null;
let winId = null;
chrome.windows.getCurrent((win) => {
  winId = win.id;
  chrome.tabs.query({
    active:true,
    windowId:winId
  },(tab) => {
    nowUrl = tab[0].url;
    createQrcode(nowUrl);
  });
});

// 生成自定义二维码
$('#createBtn').on('click', function () {
  let str = $("#qrcodeCon").val();
  if (str.trim().length <= 0 ) {
    alert('请输入你想生成二维码的内容！');
    return;
  }
  createQrcode(str);
})

// 创建标签到指定网站
$("#qrcodeWebsiteLink").on("click", ".qrcode-website__item", function (e) {
  createTab(e.currentTarget.dataset.href);
});

// 生成二维码
function createQrcode (str) {
  // 如果对象已存则无必再new
  if (!qrcodeMain) {
    qrcodeMain = new QRCode($("#qrcodeMain")[0], {
      text: str,
      width: 200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  } else {
    qrcodeMain.makeCode(str);
  }
}
// 生成标签页
function createTab(url) {
  chrome.tabs.create({
    windowId: winId,
    url: url,
    active: true
  })
}