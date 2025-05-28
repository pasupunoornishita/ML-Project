function uploadImage() {
  const input = document.getElementById('imageInput');
  const file = input.files[0];
  const language = document.getElementById('languageSelect').value;

  if (!file) {
    alert('Please select an image');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);
  formData.append('language', language);

  axios.post('http://localhost:3000/process', formData)
    .then(response => {
      const data = response.data;
      document.getElementById('objects').innerText = `Objects: ${data.objects.join(', ')}`;
      document.getElementById('landmarks').innerText = `Landmarks: ${data.landmarks.join(', ')}`;
      document.getElementById('extractedText').innerText = `Text: ${data.extractedText}`;
      document.getElementById('translatedText').innerText = `Translated: ${data.translatedText}`;
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
}
