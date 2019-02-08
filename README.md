# LineSampleBot

這個Bot是一個空白的Bot，可透過Node.js語言量身打造出你專屬的Bot

如何建立自己的Line骰子機器人
準備動作：
先申請好Line帳號（廢話）
先申請好Github帳號
先申請好Heroku帳號
以下全部選擇用免費的服務就夠了，請不要手殘選到付費。 


Step1：先把這個專案Fork回去
到右上角的 Fork 按鈕嗎，按下去。
把這個專案存到你的Github裡。 



Step2：建立lineBot賬號
到https://business.line.me/zh-hant/companies/1253547/services/bot申請一個帳號，
點選「開始使用Messaging API」，按照指示建立你的line賬號。
開始使用Messaging API


當你看到這個畫面的時候，點右邊那個「前往LINE@MANAGER」
前往LINE@MANAGER


你會看到這個，總之還是點下去
警告


照著這個畫面設定
設定


接下來移到上面，看到「LINE Developers」了嗎？按下去，然後開著網頁不要關。
LINE Developers



Step3：將LineBot部署到Heroku
按一下下面這個按鈕
按它→Deploy to Heroku←按它


你會看到這個
Heroku


當然，先取一個App name，那底下兩個要在哪裡找呢，回到上個步驟的LINE Developers網頁



Step4：取得Channel Access Token和Channel Secret
先取得Channel Secret，按右邊的按鈕
Channel Secret
把取得的字串複製到Step3的LINE_CHANNEL_SECRET


再取得Channel Access Token，按右邊的按鈕
Channel Access Token
把取得的字串複製到Step3的LINE_CHANNEL_ACCESSTOKEN

接著，按下Deploy app，等他跑完之後按下Manage App
距離部署完機器人只差一步啦！ 



Step5：鏈接Line與Heroku
點選settings
setting


找到Domains and certificates這個條目，旁邊會有個「Your app can be found at……」加一串網址，把網址複製起來。
Domain


回到LINE Developers網頁，選取最底下的edit，找到Webhook URL，把那串網址複製上去，尾巴加上 /LINE/
webhook


按下Save。看到在 Webhook URL 旁邊有個 VERIFY 按鈕嗎，按下去。
如果出現 Success. 就表示你成功完成啦！
Success


如何修改並上傳程式碼咧
回到Heroku網頁，點選上面的Deploy，你會看到四種配置程式碼的方法。
Deploy

我猜想如果你是會用第一種（Heroku Git）或是第四種（Container Registry）的人，應該是不會看這種教學文～所以我就不介紹了～
絕、絕對不是我自己也不會的關係哦（眼神漂移）

以第二種（Github）來說的話，你可以綁定你的Github賬號——剛剛我們不是fork了一份程式碼回去嗎？把它連接上去，這樣你就可以在Github那邊修改你要的程式碼，再Deploy過來。
或是你可以使用第三種（Dropbox），當你鏈接之後，它會自動幫你把你剛剛上線的程式碼下載到你的dropbox裡面。你修改完之後再上來Deploy就好咯。
