import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Database, Brain, Zap } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import SuggestedPrompts from './SuggestedPrompts';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, isTyping, sendMessage, lastError } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const message = inputValue.trim();
    setInputValue('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Get the latest AI message metadata for display
  const latestAiMessage = messages
    .filter(m => m.sender === 'ai' && m.metadata)
    .slice(-1)[0];

  return (
    <div className="h-full flex flex-col">
      {/* Demo Status Banner (only show if we have metadata from latest AI response) */}
      {latestAiMessage?.metadata && (
        <div className="flex-shrink-0 bg-hit-gradient-dark text-white px-6 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {latestAiMessage.metadata.modelUsed || 'AWS Bedrock AI'}
                </span>
              </div>

              {latestAiMessage.metadata.knowledgeBaseUsed && (
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm">Knowledge Base</span>
                </div>
              )}

              {latestAiMessage.metadata.demoMode && (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Demo Mode</span>
                </div>
              )}
            </div>

            {latestAiMessage.metadata.dataSourcesQueried && (
              <div className="text-xs opacity-90">
                Data Sources: {latestAiMessage.metadata.dataSourcesQueried.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Banner */}
      {lastError && (
        <div className="flex-shrink-0 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Connection Error:</strong> {lastError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 space-y-6 bg-hit-light min-h-full">
            {messages.map((message) => (
              <div key={message.id}>
                <MessageBubble message={message} />

                {/* Show metadata for AI messages in demo mode */}
                {message.sender === 'ai' && message.metadata && message.metadata.demoMode && (
                  <div className="mt-2 ml-14 text-xs text-hit-secondary bg-white/50 rounded-lg p-2 border border-hit-light">
                    <div className="grid grid-cols-2 gap-2">
                      {message.metadata.dataSourcesQueried && (
                        <div>
                          <strong>Data Sources:</strong> {message.metadata.dataSourcesQueried.join(', ')}
                        </div>
                      )}
                      {message.metadata.knowledgeBaseUsed && (
                        <div>
                          <strong>Knowledge Base:</strong> Active
                        </div>
                      )}
                      {message.metadata.aiPlanUsed && (
                        <div className="col-span-2">
                          <strong>AI Strategy:</strong> {message.metadata.aiPlanUsed.datasets?.join(', ') || 'Multi-source analysis'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                  <img src="/logo-white.png" className="h-8 w-8 text-white text-sm font-medium" alt="" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 max-w-xs border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-hit-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-hit-secondary ml-2">
                      {latestAiMessage?.metadata?.knowledgeBaseUsed
                        ? 'מחפש בבסיס הידע...'
                        : 'MentorHIT חושב...'}
                    </span>
                  </div>

                  {/* Show additional processing info during typing */}
                  <div className="mt-1 text-xs text-hit-secondary/70">
                    🧠 Amazon Bedrock • 📚 HIT Knowledge Base
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggested Prompts - Only show when there's minimal chat history */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4 bg-hit-light flex-shrink-0">
          <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="...שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-hit-primary focus:border-hit-primary transition-colors text-right"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-hit-primary text-white p-3 rounded-full hover:bg-hit-primary-hover focus:ring-2 focus:ring-hit-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-hit-secondary">
            Press Enter to send, Shift+Enter for new line
          </p>

          {/* API Status Indicator */}
          <div className="flex items-center space-x-2 text-xs text-hit-secondary">
            <div className={`w-2 h-2 rounded-full ${lastError ? 'bg-red-400' : 'bg-green-400'}`}></div>
            <span>{lastError ? 'API Offline' : 'AWS Connected'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;