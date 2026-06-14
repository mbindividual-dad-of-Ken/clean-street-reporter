# 行車違規檢舉產生器

快速產生台灣行車違規檢舉文字，支援雙北桃園，行車抽菸與亂丟菸蒂兩種違規類型。

## 功能

- 🚗 行車間抽菸 → 警察局（7天期限，罰 600 元）
- 🚬 亂丟菸蒂 → 環保局（罰 1,200–6,000 元，可領 30% 獎勵金）
- 📍 支援台北市、新北市、桃園市
- ⏰ 即時倒數 7 天期限提醒
- 📋 一鍵複製格式化檢舉文字
- 🔗 直連各縣市官方送件系統
- 📱 RWD 手機/桌機自適應
- 📲 PWA 支援，可安裝至主畫面，離線也能填表

## 部署到 GitHub Pages

1. 建立 GitHub repo（public 或 private 均可，Pages 需 public 或 Pro）
2. 將本資料夾所有檔案上傳至 repo 根目錄
3. 到 Settings → Pages → Source 選 `main` branch / `/ (root)`
4. 等待 1–2 分鐘，網址為 `https://{username}.github.io/{repo-name}/`

> ⚠️ 圖示檔（icon-192.png、icon-512.png）需自行產生，可用 [RealFaviconGenerator](https://realfavicongenerator.net/) 或手動建立。若未提供圖示，PWA 功能仍可運作但安裝圖示會缺失。

## 連結驗證

官方送件連結最後驗證日期：**2025-06-14**

| 縣市 | 違規類型 | 系統 |
|------|---------|------|
| 台北市 | 行車抽菸 | https://prsweb.tcpd.gov.tw/ |
| 新北市 | 行車抽菸 | https://tvrs.ntpd.gov.tw/Home/Report |
| 桃園市 | 行車抽菸 | https://tvrweb.typd.gov.tw:3444/ |
| 台北市 | 亂丟菸蒂（獎勵金）| https://wris.epib.gov.taipei/ |
| 新北市 | 亂丟菸蒂（獎勵金）| https://envir3.epd.ntpc.gov.tw/cert/login.aspx |
| 桃園市 | 亂丟菸蒂（獎勵金）| https://generalwaste.tyoem.gov.tw/Convenience/Details/8 |
| 全縣市 | 亂丟菸蒂（無獎金）| https://ww3.moenv.gov.tw/Public/Case_Add.aspx |

## 隱私聲明

本工具不儲存、不傳送任何個人資料。所有輸入僅在使用者裝置本機處理。

## 免責聲明

本工具僅協助產生格式化的檢舉文字，實際送件及案件處理結果依各主管機關規定辦理，本工具不負任何法律責任。

## 版本紀錄

- v1.0.0（2025-06-14）：初版，支援雙北桃園，PWA，RWD
