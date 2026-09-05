const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();


// اجازه اتصال سایت به API
app.use(cors());


// دریافت JSON
app.use(express.json());


// اتصال به OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// تست سرور
app.get("/", (req, res) => {
  res.send("Study Assistance Server is running!");
});


// API وضعیت
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    model: "gpt-5.6-luna"
  });
});


// دریافت سؤال
app.post("/api/chat", async (req, res) => {

  try {

    const { message } = req.body;


    if (!message) {

      return res.status(400).json({
        error: "Message is required"
      });

    }


    const response =
      await client.responses.create({

        model: "gpt-5.6-luna",

        input: message

      });


    res.json({

      answer: response.output_text

    });


  } catch (error) {

    console.error("OPENAI ERROR:", error);


    res.status(500).json({

      error:
        error.message ||
        "Something went wrong"

    });

  }

});


// پورت Render
const PORT =
  process.env.PORT || 3000;


// اجرای سرور
app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);ک
