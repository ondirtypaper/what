import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// 서버 포트 설정
const port = 3000;
const __dirname = './';

// MIME 타입 설정
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
};

// 파일을 제공하는 함수
function serveFile(filePath, contentType, response) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 파일을 찾을 수 없는 경우 404 상태 코드와 함께 오류 메시지 전송
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404 - Not Found');
            } else {
                // 그 외의 오류는 500 상태 코드와 함께 오류 메시지 전송
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('500 - Internal Server Error');
            }
        } else {
            // 파일을 성공적으로 읽은 경우 200 상태 코드와 함께 파일 전송
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

// 서버 생성
const server = http.createServer((req, res) => {
    // 요청된 URL 경로에 따라 파일 제공
    if (req.url === '/') {
        // index.html 파일 제공
        serveFile(path.join(__dirname, 'index.html'), 'text/html', res);
    } else if (req.url.startsWith('/public/')) {
        // CSS 및 JS 파일 제공
        const filePath = path.join(__dirname, req.url);
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        serveFile(filePath, contentType, res);
    } else {
        // 그 외의 경로는 404 상태 코드와 함께 오류 메시지 전송
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// 서버 시작
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
