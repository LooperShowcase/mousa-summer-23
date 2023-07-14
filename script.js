let open_ai_response;

let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can I help you today" },
];

async function conversationUserAdd(question, senteiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10:" + senteiment + "my question is:" + question,
  });
}
async function conversationAssistantAdd(respons) {
  conversation.push({ role: "assistant", content: respons });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let part1 = "sk";
  let part2 = "-A4pJboCGCsukQ34LZOpi";
  let part3 = "T3BlbkFJDNu6lmdk1FMM5VigWyXe";

  let allParts = part1 + part2 + part3;

  let data = { model: "gpt-3.5-turbo", messages: conversation };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      conversationAssistantAdd(message);

      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("Request error: ", response.status);
    }
  } catch (error) {
    console.error("there is an error:", error);
  }
}
