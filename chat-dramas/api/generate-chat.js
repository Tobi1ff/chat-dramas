import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const { plot } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const prompt = `Create a dramatic chat based on the plot: "${plot}". Format as JSON with this pattern: [{ "character": "Name", "message": "Message", "delay": 1000 }, ...]`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
    });

    res.status(200).json({ script: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate chat.' });
  }
}
