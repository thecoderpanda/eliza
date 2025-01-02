import React from 'react';
import { HiUser, HiOutlineLightningBolt } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
interface Message {
  id: string;
  sender: string;
  timestamp: number;
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex space-x-3 p-4 rounded-lg ${
            message.sender === 'user'
              ? 'bg-white border border-gray-100'
              : 'bg-blue-50'
          }`}
        >
          <div
            className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
              message.sender === 'user' ? 'bg-gray-200' : 'bg-blue-200'
            }`}
          >
            {message.sender === 'user' ? (
              <HiUser className="h-6 w-6 text-gray-600" />
            ) : (
              <HiOutlineLightningBolt className="h-6 w-6 text-blue-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900">
                {message.sender === 'user' ? 'You' : 'Hemera'}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="mt-1 text-sm text-gray-700">
              <ReactMarkdown
                className="prose max-w-none"
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className="list-none space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="flex items-start space-x-2">
                      <span className="h-2 w-2 mt-2 rounded-full bg-blue-400" />
                      <span {...props} />
                    </li>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;