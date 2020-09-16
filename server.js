'use strict';

const express = require('express');
const cors = require('cors');
var multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', (req, res) =>{
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file;
  console.log(req.file.originalname);
  const originalName = req.file.originalname;
  const fileType = req.file.mimetype;
  const sizeInBytes = req.file.size;

  // need name, type, size
    if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({"name": originalName, "type": fileType, "size": sizeInBytes})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
