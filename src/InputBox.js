import React, { useState } from "react"
import styled from "styled-components"

const Form = styled.form`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`

export default function InputBox({ onMessageSend }) {
  const [message, setMessage] = useState("")

  const sendMessage = async (event) => {
    event.preventDefault()

    if (!message) return

    onMessageSend({
      text: message,
      sender: "user",
    })

    // Make API call
    try {
      setTimeout(() => {
        onMessageSend({ text: "This is a fake bot response", sender: "bot" })
      }, 1000)

      setMessage("")
    } catch (error) {
      console.error(error)
      onMessageSend({ text: "An error occurred", sender: "bot" })
    }
  }
  return (
    <Form onSubmit={sendMessage}>
      <Input
        id="inputbox"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit">Send</Button>
    </Form>
  )
}
