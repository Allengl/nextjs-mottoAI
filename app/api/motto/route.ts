import { type NextRequest } from 'next/server'
import { OpenAI } from 'openai'

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey,
  baseURL: 'https://api.openai-proxy.com/v1',
})
if (!apiKey) {
  throw Error("OPENAI_API_KEY is not set");
}

export async function GET(
  req: NextRequest,
) {
  const searchParams = req.nextUrl.searchParams
  const prompt = searchParams.get('prompt')

  if (!prompt) {
    return Response.json({ error: "Prompt missing" }, { status: 400 });

  }

  if (prompt.length > 100) {
    return Response.json({ error: "Prompt too long" }, { status: 400 });
  }


  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Respond in the corresponding language version according to the language version of the topic. Create a cringy motivational quote based on the following topic.\n
      Topic: ${prompt}\n
      Cringy motivational quote:`
      }],
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  })

  const quote = completion.choices[0].message.content

  return Response.json({ quote })
}
