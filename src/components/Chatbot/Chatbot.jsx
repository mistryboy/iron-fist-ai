import { useState, useRef, useEffect, useCallback } from 'react';
import './Chatbot.css';

const API_ENDPOINT = '/api/chat';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey! 👋 I'm the Iron Core assistant. Ask me anything about memberships, schedules, or training programs!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || data.message },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I couldn't process that. ${err.message}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <button
        className={`chatbot__trigger${isOpen ? ' chatbot__trigger--open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        id="chatbot-trigger"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        )}
        {!isOpen && <span className="chatbot__trigger-pulse" />}
      </button>

      {/* Chat Window */}
      <div
        className={`chatbot${isOpen ? ' chatbot--open' : ''}`}
        role="dialog"
        aria-label="Chat assistant"
      >
        {/* Header */}
        <div className="chatbot__header">
          <div className="chatbot__header-info">
            <div className="chatbot__avatar">⚡</div>
            <div>
              <h4 className="chatbot__header-title">Iron Core AI</h4>
              <span className="chatbot__header-status">
                <span className="chatbot__status-dot" />
                Online
              </span>
            </div>
          </div>
          <button
            className="chatbot__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot__messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot__msg chatbot__msg--${msg.role}${
                msg.isError ? ' chatbot__msg--error' : ''
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="chatbot__msg-avatar">⚡</div>
              )}
              <div className="chatbot__msg-bubble">{msg.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className="chatbot__msg chatbot__msg--assistant">
              <div className="chatbot__msg-avatar">⚡</div>
              <div className="chatbot__msg-bubble chatbot__typing">
                <span className="chatbot__dot" />
                <span className="chatbot__dot" />
                <span className="chatbot__dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chatbot__input-area" onSubmit={sendMessage}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot__input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="chatbot__send"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
