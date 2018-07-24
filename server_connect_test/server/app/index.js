var express = require('express');
const Cors = require("cors");
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })

var app = express();

app.use(Cors());

app.get('/', function (req, res) {
  const a = {
    name : 'tnrms',
    age : 26,

  }
  res.send(a);
});

app.post('/upload', upload.single('myfile'), function(req, res){
  res.send('Uploaded! : '+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
