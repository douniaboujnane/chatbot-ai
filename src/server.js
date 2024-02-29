import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

// setup OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.get("/", (req, res) => {
  res.send("Welcome to the AI Chatbot API!")
})

// chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      //temperature: can be used to control if the AI gives deterministic or random responses
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: userMessage },
      ],
    })

    console.log("OpenAI API Response:", aiResponse.choices[0].message)
    res.json({
      message: aiResponse.choices[0].message.content,
      role: aiResponse.choices[0].message.role,
    })
  } catch (error) {
    console.error(error)
  }
})

const PORT = process.env.PORT || 1330

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
