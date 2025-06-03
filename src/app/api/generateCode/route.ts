// import OpenAI from "openai";
// import { USER_PROMPT, SYSTEM_PROMPT } from "../../constants/prompt";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "edge";

export async function POST(/*req: Request*/) {
  // try {
  //   const { url, img } = await req.json();
  //   const imageUrl = url ?? img;
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4-vision-preview",
  //     max_tokens: 4096,
  //     messages: [
  //       {
  //         role: "system",
  //         content: SYSTEM_PROMPT,
  //       },
  //       {
  //         role: "user",
  //         content: [
  //           { type: "text", text: USER_PROMPT },
  //           {
  //             type: "image_url",
  //             image_url: imageUrl,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   return new Response(
  //     JSON.stringify({ result: response.choices[0]?.message?.content ?? "" }),
  //     {
  //       status: 200,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // } catch (error) {
  //   return new Response(
  //     JSON.stringify({ error: "Erro ao gerar código", details: String(error) }),
  //     { status: 500, headers: { "Content-Type": "application/json" } }
  //   );
  // }
  return new Response(JSON.stringify({ result: "" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
