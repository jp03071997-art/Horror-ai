export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an expert horror movie prompt writer."
          },
          {
            role: "user",
            content: "Create a cinematic horror video prompt in Hindi: " + prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({
        error: data.error.message
      });
    }

    res.status(200).json({
      text: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
