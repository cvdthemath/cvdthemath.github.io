const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();

  // === YOUR FULL CREATIVE FREEDOM HERE ===
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; }
        body {
          width: 1200px;
          height: 630px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Fredoka One', cursive;
          position: relative;
          overflow: hidden;
        }
        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          animation: float 6s ease-in-out infinite;
        }
        .circle:nth-child(1) { width: 300px; height: 300px; top: -50px; right: -50px; }
        .circle:nth-child(2) { width: 200px; height: 200px; bottom: -30px; left: -30px; animation-delay: 2s; }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
        }
        h1 {
          font-size: 72px;
          text-shadow: 4px 4px 0 rgba(0,0,0,0.2);
          margin-bottom: 20px;
        }
        .sub {
          font-size: 32px;
          opacity: 0.9;
          background: rgba(255,255,255,0.2);
          padding: 10px 30px;
          border-radius: 50px;
          backdrop-filter: blur(10px);
        }
      </style>
    </head>
    <body>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="content">
        <h1>✨ Dynamic Content</h1>
        <div class="sub">${new Date().toLocaleString()}</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Extra wait for fonts
  await page.waitForTimeout(1000);
  
  await page.screenshot({
    path: 'og-image.png',
    type: 'png',
    fullPage: false
  });

  await browser.close();
})();
