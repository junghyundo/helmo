// const express = require("express");
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(3000, () => console.log("Server ready on port 3000."));

// module.exports = app;
const PDFDocument = require('pdfkit'); 
const express = require('express');
const app = express();
const port = 3000;

// app.use(express.static());
app.use('/', express.static(__dirname+"/public"));

// Home 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/detail', (req, res) => {
//   const selectedDate = req.query.date;
//   res.sendFile(__dirname + '/public/detail.html');
// });

app.get('/result-pdf', (req, res) => {
  const selectedDate = req.query.date || '날짜미지정';
  
  try {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
    });
    
    // 응답 헤더 설정
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(`${selectedDate}_결과.pdf`)}`);
    
    // PDF를 응답으로 파이프
    doc.pipe(res);

    // 한글 폰트 설정 (Windows 시스템 폰트 사용)
    const fontPath = './public/fonts/malgun.ttf'; // 맑은 고딕
    
    // PDF 내용 작성
    doc.fontSize(24)
       .font(fontPath)
       .text(`${selectedDate} 기록`, {
         align: 'center',
         lineGap: 10
       });
    
    doc.moveDown(2);
    
    doc.fontSize(16)
       .font(fontPath)
       .text('오늘의 기록:', {
         lineGap: 5
       });
    
    doc.moveDown();
    
    doc.fontSize(14)
       .font(fontPath)
       .text('• 오늘의 주요 활동들을 여기에 기록하세요.');
    
    doc.moveDown();
    
    doc.text('• 감정이나 생각을 자유롭게 적어보세요.');
    
    doc.moveDown();
    
    doc.text('• 내일의 계획이나 목표를 설정해보세요.');
    
    doc.moveDown(3);
    
    doc.fontSize(12)
       .fillColor('gray')
       .text(`생성일: ${new Date().toLocaleDateString('ko-KR')}`, {
         align: 'right'
       });

    // PDF 완료
    doc.end();
    
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    res.status(500).send('PDF 생성 중 오류가 발생했습니다.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

