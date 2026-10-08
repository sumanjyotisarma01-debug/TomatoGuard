import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { TomatoDiagnosis } from '../types/disease';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PathologistChatProps {
  diagnosis: TomatoDiagnosis;
  specimenImage?: string;
}

export const PathologistChat: React.FC<PathologistChatProps> = ({
  diagnosis,
  specimenImage,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I've reviewed your specimen diagnosis of ${diagnosis.condition} (${diagnosis.scientificName}). Do you have questions about spray schedules, fruit consumption safety, pruning techniques, or protecting neighboring plants?`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    'Can I safely eat unaffected green or ripe tomatoes?',
    'Will this disease spread to my pepper or potato plants?',
    'How high up the stem should I prune the infected leaves?',
    'Can I apply neem oil and copper spray together?',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuestion;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-pathologist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          diagnosisSummary: {
            condition: diagnosis.condition,
            scientificName: diagnosis.scientificName,
            severity: diagnosis.severity,
            plantPart: diagnosis.plantPart,
            urgency: diagnosis.urgency,
            summary: diagnosis.summary,
          },
          imageBase64: specimenImage,
          chatHistory: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'No response generated.' },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, an error occurred while connecting with the plant pathologist service. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Consult Dr. Greenleaf (AI Plant Pathologist)
          </h3>
          <p className="text-[11px] text-slate-500">
            Ask targeted questions regarding harvest safety, pruning, or organic IPM protocols
          </p>
        </div>
      </div>

      {/* Suggested Fast Prompts */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/60 rounded-md px-2.5 py-1 transition-colors cursor-pointer disabled:opacity-50 text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-800 border border-slate-200/70 whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic">
            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <span>Pathologist consulting botanical reference...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={`Ask about ${diagnosis.condition} treatments, watering, or pruning...`}
          disabled={isLoading}
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isLoading}
          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
