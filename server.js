import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); 

// مسار الترجمة
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
       messages: [
  {
    role: "system",
    content: `
    You are an Arabic translation and normalization assistant.

    Your task is:

    1) If the input is NOT in Arabic:
   - Translate it into clear Modern Standard Arabic (العربية الفصحى المعاصرة).
   - Preserve the full meaning and tone of the original text.

   2) If the input is in Arabic dialect (any regional dialect such as Gulf, Egyptian, Levantine, etc.):
     - Rewrite the text in clear Modern Standard Arabic.
     - Preserve the same meaning and intent without adding new information.

   3) If the input is already in Modern Standard Arabic:
   - Lightly correct spelling and grammar if needed.
   - Keep the style and meaning as close as possible to the original.

    Important rules:
    - Always reply ONLY with the final text in Arabic (no English, no transliteration).
    - Do NOT explain, comment, or describe what you did.
    - Do NOT add examples, notes, or extra sentences.
    - Do NOT put the answer inside quotes.
`
  },
  {
    role: "user",
    content: text
  }
]

        
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const translation =
      response.data.choices?.[0]?.message?.content?.trim() ||
      "تعذر جلب الترجمة.";

    res.json({ translation });
  } catch (error) {
    console.error("Groq error:", error.response?.data || error.message);
    res.status(500).json({ error: "Translation error from Groq" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
