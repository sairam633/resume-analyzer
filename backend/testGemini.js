const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent("Hello Gemini, just say hi in JSON: {\"hi\":\"there\"}");
  console.log(result.response.text());
}

testGemini().catch(err => console.error(err));
