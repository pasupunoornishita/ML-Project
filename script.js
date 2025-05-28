function uploadImage() {
  const fileInput = document.getElementById('imageInput');
  const language = document.getElementById('languageSelect').value;

  if (!fileInput.files.length) {
    alert("Please select an image file.");
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('language', language);

  axios.post('http://localhost:3000/upload', formData)
    .then(response => {
      const data = response.data;
      document.getElementById('objects').textContent = "Objects: " + (data.objects || []).join(', ');
      document.getElementById('landmarks').textContent = "Landmarks: " + (data.landmarks || []).join(', ');
      document.getElementById('extractedText').textContent = "Extracted Text: " + (data.extracted_text || '');
      document.getElementById('translatedText').textContent = "Translated Text: " + (data.translated_text || '');
    })
    .catch(error => {
      console.log("Uploading file:", file);
      console.log("Processing started...");
      
      console.error("Upload or processing failed:", error.message);
      alert("Error uploading or processing the image.");
    });
}
