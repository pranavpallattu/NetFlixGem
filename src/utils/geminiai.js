

// The client gets the API key from the environment variable `GEMINI_API_KEY`.


import OpenAI from 'openai';
import { OPENAI_API_KEY } from './constants';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // This is the default and can be omitted
});

export default openai;



// const geminiai = new GoogleGenAI({
//     apikey:GEMINI_API_KEY
// });

// export default geminiai;

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();




// import OpenAI from 'openai';
// import { OPENAI_API_KEY } from './constants';

// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true  // This is the default and can be omitted
// });


// export default openai;

// // const response = await client.responses.create({
// //   model: 'gpt-4o',
// //   instructions: 'You are a coding assistant that talks like a pirate',
// //   input: 'Are semicolons optional in JavaScript?',
// // });

// console.log(response.output_text);