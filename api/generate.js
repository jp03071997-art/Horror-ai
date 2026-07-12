export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "user",
            content: "Create a cinematic horror video prompt in Hindi: " + prompt
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      text: data.choices?.[0]?.message?.content || data.error?.message || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
