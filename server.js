const express = require('express');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const {Translate} = require('@google-cloud/translate').v2;
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const visionClient = new vision.ImageAnnotatorClient();
const translateClient = new Translate();

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, req.file.path);
    const targetLanguage = req.body.language || 'en';

    const [objectResult] = await visionClient.objectLocalization(imagePath);
    const objects = objectResult.localizedObjectAnnotations.map(obj => obj.name);

    const [landmarkResult] = await visionClient.landmarkDetection(imagePath);
    const landmarks = landmarkResult.landmarkAnnotations.map(landmark => landmark.description);

    const [textResult] = await visionClient.textDetection(imagePath);
    const extractedText = textResult.textAnnotations.length ? textResult.textAnnotations[0].description : '';

    const [translation] = await translateClient.translate(extractedText, targetLanguage);

    res.json({
      objects,
      landmarks,
      extracted_text: extractedText,
      translated_text: translation
    });

    // Clean up uploaded file
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
