const data = await response.json();

console.log(JSON.stringify(data, null, 2));

res.status(200).json({
  text: data.candidates?.[0]?.content?.parts?.[0]?.text,
  error: data.error
});
