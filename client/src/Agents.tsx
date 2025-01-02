import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import QuickActions from './components/QuickActions';
import LoadingIndicator from './components/LoadingIndicator';

interface AgentResponse {
    text: string;
    error?: string;
}

const Agents: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Check for existing session on component mount
    useEffect(() => {
        // Check localStorage for existing session
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setUserEmail(savedEmail);
        }
    }, []);

    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);

        // Add user message immediately
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('http://localhost:1010/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    userId: userEmail, // Use email as userId for now
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data: AgentResponse = await response.json();

            if (data.error) {
                // If the error is about registration, show auth form
                if (data.error.includes('register')) {
                    setUserEmail(null);
                    return;
                }
                throw new Error(data.error);
            }

            // Add bot response
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.text,
                sender: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email: string) => {
        try {
            // You might want to store this in localStorage or cookies
            setUserEmail(email);
            localStorage.setItem('userEmail', email); // Store in localStorage for persistence


            // Add welcome message
            const welcomeMessage: Message = {
                id: Date.now().toString(),
                content: `Welcome ${email}! How can I help you today?`,
                sender: 'assistant',
                timestamp: new Date(),
            };

            setMessages([welcomeMessage]);
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to log in. Please try again.');
        }
    };

    // If no user email, show auth form
    if (!userEmail) {
        return <AuthForm onLogin={handleLogin} />;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header userEmail={userEmail} />

            <main className="flex-1 overflow-hidden">
                <div className="max-w-4xl mx-auto h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <MessageList messages={messages} />
                        {isLoading && (
                            <div className="p-4">
                                <LoadingIndicator />
                            </div>
                        )}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                                {error}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 0 && (
                        <div className="p-4">
                            <QuickActions onActionSelect={handleSendMessage} />
                        </div>
                    )}

                    <div className="border-t border-gray-200 bg-white p-4">
                        <ChatInput
                            onSendMessage={handleSendMessage}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Agents;
