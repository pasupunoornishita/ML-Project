// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Setup file upload
const upload = multer({ dest: 'uploads/' });

// Handle POST from frontend
app.post('/process', upload.single('image'), (req, res) => {
  const language = req.body.language;
  const imageFile = req.file;

  // Simulate processing...
  const fakeObjects = ['car', 'tree'];
  const extractedText = 'Hello World';
  const translatedText = `Translated to ${language}`;

  res.json({
    objects: fakeObjects,
    landmarks: ['Statue of Liberty'],
    extractedText,
    translatedText
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
