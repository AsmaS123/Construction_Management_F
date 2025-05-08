import React, { FC, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from 'js-cookie';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {  useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import axios from 'axios'
import GetUserRoles from '../CustomHook/GetUserRoles/GetUserRoles';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ChatBot() {
  const styles = {
    chatContainer: {
      // width: '300px',
      // height: '400px',
      border: '1px solid #ccc',
      // display: 'flex',
      // flexDirection:'column',
      // flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    },
    messages: {
      flex: 1,
      padding: '10px',
      // overflowY: 'auto',
      // display: 'flex',
      // flexDirection: 'column',
      gap: '5px'
    },
    message: {
      maxWidth: '70%',
      padding: '8px 12px',
      borderRadius: '10px',
      border: '1px solid #ddd'
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #ccc'
    },
    input: {
      flex: 1,
      padding: '8px',
      fontSize: '14px'
    },
    button: {
      marginLeft: '10px',
      padding: '8px 12px'
    }
  };
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  }, []);

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = { sender: 'bot', text: `You said: "${input}"` };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* { loading  && <Navigate to="/" replace />} */}
      {loading && (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <Layout />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <div style={styles.chatContainer}>
                        <div style={styles.messages}>
                          {messages.map((msg, i) => (
                            <div
                              key={i}
                              style={{
                                ...styles.message,
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#FFF'
                              }}
                            >
                              {msg.text}
                            </div>
                          ))}
                        </div>
                        <div style={styles.inputContainer}>
                          <input
                            style={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                          />
                          <button style={styles.button} onClick={handleSend}>Send</button>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}

