// import * as deepl from 'deepl-node';


// const authKey = '3e4b2d4d-f3c2-425f-884b-ab80f490a19d:fx';
// const text = 'Hola, mundo!';

// (async () => {
//   try {
//     const translator = new deepl.Translator(authKey);
//     const result = await translator.translateText(text, null, targetLang);
//     console.log(result.text); // Output: Hello, world! (translation in French)
//   } catch (error) {
//     if (error instanceof deepl.AuthorizationError) {
//       console.error('Authorization Error: Check your DeepL API key.');
//     } else {
//       console.error('An error occurred:', error); // Handle other errors
//     }
//   }
// })();


import { readFileSync } from 'fs'; // Import for reading file contents
import * as deepl from 'deepl-node';
import { JSDOM } from 'jsdom';

const authKey = '3e4b2d4d-f3c2-425f-884b-ab80f490a19d:fx';
const targetLang = 'en-US'; // Assuming you want to translate to French

const translateParagraph = async () => {
  // Read the HTML content of your index.html file
  const htmlContent = readFileSync('index.html', 'utf-8');

  // Create a JSDOM instance to interact with the HTML string
  const { window } = new JSDOM(htmlContent, {
    features: {
      FetchAPI: false,
      JavaScript: false, // Disable JavaScript execution (not required)
      MutationObserver: true, // Enable for dynamic content (optional)
    },
  });

  // Get the paragraph element with the ID "parrafo_a_traducir"
  const paragraphElement = window.document.getElementById('parrafo_a_traducir');

  // Extract the paragraph text
  const paragraphText = paragraphElement.textContent;

  // Create a DeepL translator object
  const translator = new deepl.Translator(authKey);

  // Translate the paragraph text to the target language
  try {
    const result = await translator.translateText(paragraphText, null, targetLang);
    console.log('Traducción:', result.text); // Output translation to console
  } catch (error) {
    console.error('Error:', error); // Handle errors
  }
};

// Call the translateParagraph function to execute translation
translateParagraph();
