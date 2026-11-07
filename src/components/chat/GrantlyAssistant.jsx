import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default function GrantlyAssistant() {
  const { isChatOpen, setIsChatOpen, scholarships, profile, openScholarshipDetails, setActiveTab } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Hello! I am your Grantly AI Scholarship Advisor 🎓. I analyze your profile (${profile?.course || 'Degree'}, ${profile?.category || 'General'}, income ₹${((profile?.familyIncome || 0)/100000).toFixed(1)}L) against 18+ verified Indian grants. How can I guide you today?`,
      time: 'Just now',
      recommendations: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Scholarships for B.Tech under ₹3L income?",
    "Exclusive scholarships for female engineering students?",
    "What documents are needed for National Scholarship Portal (NSP)?",
    "How to write a winning Statement of Purpose (SOP)?",
    "Compare Reliance Foundation vs HDFC Badhte Kadam"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  if (!isChatOpen) return null;

  // Local Rule-Based NLP Intelligence
  const generateResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Female / Girls in STEM
    if (q.includes('girl') || q.includes('female') || q.includes('women')) {
      const femaleSchemes = scholarships.filter(s => s.targetGender === 'Female' || s.category.includes('Women'));
      return {
        text: `Here are the premier verified scholarships specifically reserved for female Indian scholars:\n\n1. **Adobe India Women-in-Technology**: ₹2,50,000 + guaranteed Summer Internship for 2nd/3rd yr female engineering students.\n2. **Kotak Kanya Scholarship**: ₹1,50,000/yr for meritorious girls entering professional degrees.\n3. **AICTE Pragati Scheme**: ₹50,000/yr across all 4 years for technical degree/diploma courses.\n4. **L'Oréal India For Young Women in Science**: ₹2,50,000 for pure & applied sciences.`,
        recommendations: femaleSchemes.slice(0, 3)
      };
    }

    // 2. B.Tech / Engineering with income limits
    if (q.includes('b.tech') || q.includes('engineering') || q.includes('tech') || q.includes('3l') || q.includes('income')) {
      const engg = scholarships.filter(s =>
        (s.educationLevel || []).includes('B.Tech') && (s.maxIncome || 0) <= 600000
      );
      return {
        text: `Based on your family income bracket and engineering course, here are top recommendations:\n\n• **Reliance Foundation UG Scholarship** (₹2,00,000): Outstanding grant with 95% match for students with >60% in Class 12.\n• **Siemens Scholarship Program**: Covers 100% Tuition Fees + provides a high-spec Laptop for 1st-year government college engineers.\n• **HDFC Bank Badhte Kadam** (₹1,00,000): Direct crisis and merit grant for households earning < ₹6 Lakhs.\n• **Central Sector Scheme (NSP)** (₹20,000/yr): For students ranking in top 80th percentile of their 12th board.`,
        recommendations: engg.slice(0, 3)
      };
    }

    // 3. NSP / Documents Question
    if (q.includes('nsp') || q.includes('document') || q.includes('paper') || q.includes('certificate')) {
      return {
        text: `To ensure seamless approval on the National Scholarship Portal (NSP) and state portals, prepare these mandatory documents:\n\n1. **Aadhaar Card Linked to Bank**: Ensure NPCI Direct Benefit Transfer (DBT) is active in your bank account.\n2. **Income Certificate**: Issued by competent state authority (Tehsildar/Revenue Circle Officer) within the current fiscal year.\n3. **Bonafide Student Certificate**: Duly stamped by your college Dean/Registrar.\n4. **Previous Marksheets**: 10th and 12th original passing certificates.\n5. **Caste/Category Certificate**: If applying under OBC (Non-Creamy Layer), SC, ST, or EWS quotas.`,
        recommendations: []
      };
    }

    // 4. Statement of Purpose (SOP) advice
    if (q.includes('sop') || q.includes('purpose') || q.includes('essay') || q.includes('write')) {
      return {
        text: `Here is the winning 4-point structure for scholarship Statements of Purpose (SOPs):\n\n1. **The Hook (100 words)**: Introduce your background and the specific societal problem you wish to solve through your education.\n2. **Academic & Project Milestones (150 words)**: Highlight hackathons, competitive exam percentiles, or coding projects.\n3. **Financial Need Context (100 words)**: Explain respectfully how the grant will alleviate household burdens and allow focus on studies.\n4. **Future Contribution (100 words)**: Describe how you will pay it forward to the Indian tech or medical ecosystem.`,
        recommendations: []
      };
    }

    // 5. Comparison Reliance vs HDFC
    if (q.includes('reliance') || q.includes('hdfc') || q.includes('compare')) {
      return {
        text: `**Comparison: Reliance Foundation vs HDFC Badhte Kadam**\n\n• **Award Value**: Reliance awards up to ₹2,00,000 disbursed over degree duration; HDFC provides up to ₹1,00,000.\n• **Aptitude Evaluation**: Reliance requires an online computer-based aptitude test; HDFC focuses on previous marks and crisis interviews.\n• **Income Ceiling**: Reliance has a flexible cap up to ₹15 Lakhs (preference under 2.5L); HDFC has a strict ₹6 Lakh ceiling.\n• **Both can be tracked directly** inside your Grantly Application Tracker!`,
        recommendations: scholarships.filter(s => s.id === 'reliance-ug-2025' || s.id === 'hdfc-badhte-kadam-2025')
      };
    }

    // General Fallback
    const topMatches = scholarships.filter(s => s.matchScore >= 80).slice(0, 2);
    return {
      text: `I've analyzed your question against Grantly's national database. We recommend reviewing top matching schemes for your profile (${profile?.category || 'General'}, ${profile?.course || 'Degree'}):`,
      recommendations: topMatches
    };
  };

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(query);
      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        time: 'Just now',
        recommendations: response.recommendations || []
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: 'min(440px, 94vw)',
        height: 'min(620px, 85vh)',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl), 0 0 30px rgba(99, 102, 241, 0.25)',
        border: '1px solid var(--border-color)',
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* CHAT HEADER */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-indigo) 0%, #4f46e5 100%)',
          color: '#ffffff',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
              Grantly AI Advisor
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#c7d2fe' }}>
              Online • Real-time Scholarship NLP Engine
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* CHAT MESSAGES BODY */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'var(--bg-main)'
        }}
      >
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isBot ? 'flex-start' : 'flex-end',
                gap: '0.35rem'
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '0.875rem 1.125rem',
                  borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  background: isBot ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--accent-violet) 0%, var(--primary-indigo) 100%)',
                  color: isBot ? 'var(--text-primary)' : '#ffffff',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  boxShadow: 'var(--shadow-xs)',
                  border: isBot ? '1px solid var(--border-color)' : 'none',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}

                {/* Embedded Recommendations Card */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="flex-col gap-2" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    {msg.recommendations.map(rec => (
                      <div
                        key={rec.id}
                        onClick={() => openScholarshipDetails(rec)}
                        style={{
                          background: 'var(--bg-card-subtle)',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{rec.title}</p>
                          <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{rec.awardAmount}</span>
                        </div>
                        <ArrowRight size={14} color="var(--accent-violet)" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', padding: '0 0.5rem' }}>
                {msg.time}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            <Bot size={16} />
            <span>Grantly AI is searching verified databases...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* SUGGESTED CHIPS */}
      <div
        style={{
          padding: '0.65rem 1rem',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              padding: '0.25rem 0.65rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* INPUT BAR */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          padding: '0.875rem 1rem',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Ask anything about scholarships, eligibility, SOPs..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="input"
          style={{ fontSize: '0.875rem', padding: '0.5rem 0.85rem' }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          style={{ width: '38px', height: '38px', padding: 0, borderRadius: 'var(--radius-md)' }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
