import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './ui/Logo';

interface ChatDemoProps {
  locale: string;
}

interface DialogMessage {
  type: 'bot' | 'user';
  text: string;
}

export function ChatDemo({ locale }: ChatDemoProps) {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [userInputValue, setUserInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Define dialog messages based on current locale
  const dialogMessages: DialogMessage[] = locale === 'zh' ? [
    { type: 'bot', text: "你好，我是Polly，你的中文老师。想了解更多关于我如何帮助你学习语言的信息吗？" },
    { type: 'user', text: "当然！博语通到底是什么？" },
    { type: 'bot', text: "博语通是一款由人工智能驱动的语言学习应用，专注于帮助你快速提升会话和口语能力。与专注于重复练习的传统应用不同，我的设计目的是像真实语言伙伴一样与你交流，让你在实际对话中练习和掌握语言！" },
    { type: 'user', text: "这与多邻国等其他应用有什么不同？" },
    { type: 'bot', text: "好问题！虽然多邻国专注于游戏化练习和翻译，但博语通专门通过真实对话来提升你的口语流利度。我们的核心优势在于：针对你的发音和语调提供个性化反馈，根据你的熟练程度调整对话难度，以及创建你在实际生活中真正会用到的实用对话场景。我们的设计目标就是帮助你说出更自然更自信的语言！" },
    { type: 'user', text: "我是语言初学者，可以使用博语通学习吗？" },
    { type: 'bot', text: "非常感谢你的提问！博语通最适合已经掌握了基本语言知识的学习者。如果你是初学者，我们建议先使用多邻国等应用学习基础词汇和语法，然后再使用博语通来提升你的对话能力和流利度。我们的优势在于帮助你进阶，让你从\"知道语言\"到\"自然使用语言\"！" },
    { type: 'user', text: "听起来很有趣。我每天需要投入多少时间？" },
    { type: 'bot', text: "这完全取决于你！有些学习者每天只与我聊10分钟，而其他人则喜欢进行30分钟的长时间对话。关键是坚持——即使是短暂的定期练习也会随着时间的推移带来显著的进步。" },
    { type: 'user', text: "使用这个应用我真的能流利吗？" },
    { type: 'bot', text: "流利来自于定期练习和实际应用。博语通提供了传统学习中常常缺失的对话练习。我会帮助你建立信心，培养自然的语言模式，为真实世界的对话做好准备。我们的许多用户在出国旅行时都有突破性的时刻！" },
    { type: 'user', text: "费用是多少？" },
    { type: 'bot', text: "博语通提供有限日常对话的免费计划，以及收费低至不足两美元每小时的多种可选高级计划。为什么不先尝试我们的免费计划，看看你是否喜欢呢？" }
  ] : [
    { type: 'bot', text: "Hi, I'm Polly, your English tutor. Would you like to know more about how I can help you learn languages?" },
    { type: 'user', text: "Sure! What exactly is PollyTalkie?" },
    { type: 'bot', text: "PollyTalkie is an AI-powered language learning app that helps you quickly improve your conversational and spoken language skills. Unlike traditional apps that focus on repetitive exercises, I'm designed to chat with you like a real language partner, allowing you to practice and master languages through actual conversations!" },
    { type: 'user', text: "How is this different from other apps like Duolingo?" },
    { type: 'bot', text: "Great question! While apps like Duolingo focus on gamified exercises and translation, PollyTalkie specializes in developing your speaking fluency through real conversations. Our key strengths are: personalized feedback on your pronunciation and intonation, adaptive conversations that match your proficiency level, and practical dialog scenarios you'll actually use in real life. We're specifically designed to help you sound more natural and confident when you speak!" },
    { type: 'user', text: "I'm new to the language, can I use PollyTalkie to learn it?" },
    { type: 'bot', text: "Thanks for asking! PollyTalkie is best suited for learners who already have some basic knowledge of the language. If you're a complete beginner, we recommend starting with apps like Duolingo to learn fundamental vocabulary and grammar, then switching to PollyTalkie to enhance your conversation skills and fluency. Our strength is helping you progress from 'knowing the language' to 'naturally using the language'!" },
    { type: 'user', text: "That sounds interesting. How much time would I need to commit each day?" },
    { type: 'bot', text: "That's entirely up to you! Some learners chat with me for just 10 minutes daily, while others enjoy longer 30-minute conversations. The key is consistency - even short, regular practice sessions lead to significant improvement over time." },
    { type: 'user', text: "Will I actually become fluent using this app?" },
    { type: 'bot', text: "Fluency comes from regular practice and real-world application. PollyTalkie provides the conversation practice that's often missing from traditional learning. I'll help you build confidence, develop natural speech patterns, and prepare you for real-world conversations. Many of our users report breakthrough moments when traveling abroad!" },
    { type: 'user', text: "How much does it cost?" },
    { type: 'bot', text: "PollyTalkie offers a free plan with limited daily conversations, and premium plans with hourly costs below 2 dollars! Why not just start with our free plan and see how you like it?" }
  ];

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentDialogIndex, isTyping]);

  // Start the conversation automatically
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCurrentDialogIndex(0); // Start with first message (bot)
    }, 1000);
    
    return () => clearTimeout(startTimer);
  }, []); // Only run once on mount

  useEffect(() => {
    let timer: number | null = null;
    
    // Auto-advance the conversation with appropriate animations
    if (currentDialogIndex < dialogMessages.length - 1) {
      const currentMessage = dialogMessages[currentDialogIndex];
      const nextMessage = dialogMessages[currentDialogIndex + 1];
      
      if (currentMessage.type === 'bot' && nextMessage.type === 'user') {
        // After bot message, simulate user typing
        timer = window.setTimeout(() => {
          // Start user typing animation
          setUserTyping(true);
          
          // Gradually type out the user message in the input field
          let charIndex = 0;
          const userMessage = nextMessage.text;
          const typingInterval = window.setInterval(() => {
            if (charIndex <= userMessage.length) {
              setUserInputValue(userMessage.substring(0, charIndex));
              charIndex++;
            } else {
              clearInterval(typingInterval);
              
              // After typing completes, wait a moment then send the message
              setTimeout(() => {
                setUserTyping(false);
                setUserInputValue("");
                setCurrentDialogIndex(prev => prev + 1);
              }, 500);
            }
          }, 50);
        }, 2000);
      } else if (currentMessage.type === 'user' && nextMessage.type === 'bot') {
        // After user message, show bot typing indicator
        timer = window.setTimeout(() => {
          setIsTyping(true);
          
          // Simulate typing time based on message length
          const typingDelay = nextMessage.text.length * 20 + 500;
          
          const botTypingTimer = window.setTimeout(() => {
            setIsTyping(false);
            
            // After typing is done, show the bot message
            setTimeout(() => {
              setCurrentDialogIndex(prev => prev + 1);
            }, 300);
          }, typingDelay);
          
          timer = botTypingTimer;
        }, 1800);
      }
    } else {
      // When conversation is complete, restart after a delay
      timer = window.setTimeout(() => {
        setCurrentDialogIndex(0);
        setUserInputValue("");
        setUserTyping(false);
        setIsTyping(false);
      }, 15000); // Wait 15 seconds before restarting
    }
    
    // Cleanup function to clear any timers
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [currentDialogIndex, dialogMessages]);

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
      <div className="bg-muted rounded-xl shadow-lg overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center p-4 border-b bg-background/80">
          <div className="p-2 bg-primary/10 rounded-full mr-3">
            <Logo size={32} locale={locale} />
          </div>
          <div>
            <h3 className="font-bold">Polly</h3>
            <p className="text-sm text-muted-foreground">
              {locale === 'zh' ? '您的AI语言老师' : 'Your AI Language Tutor'}
            </p>
          </div>
        </div>
        
        {/* Chat messages */}
        <div 
          ref={chatContainerRef}
          className="p-4 space-y-4 h-[400px] overflow-y-auto scroll-smooth"
        >
          {dialogMessages.slice(0, currentDialogIndex + 1).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[90%] p-3 rounded-lg ${message.type === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-secondary text-secondary-foreground rounded-tl-none'}`}
              >
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && currentDialogIndex < dialogMessages.length - 1 && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none p-3 max-w-[90%]">
                <div className="flex space-x-1">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="w-2 h-2 bg-current rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                    className="w-2 h-2 bg-current rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                    className="w-2 h-2 bg-current rounded-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat input with simulated user typing */}
        <div className="p-3 border-t bg-background/80">
          <div className="flex items-center bg-background rounded-lg border px-3 py-2">
            <input 
              type="text" 
              disabled
              value={userInputValue}
              placeholder={locale === 'zh' ? "输入您的消息..." : "Type your message..."}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
            <button 
              disabled
              className={`ml-2 p-1 rounded-full transition-colors ${userInputValue.length > 0 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </button>
          </div>
          {userTyping && (
            <div className="text-xs text-muted-foreground mt-1 ml-2">
              {locale === 'zh' ? "正在输入..." : "Typing..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
