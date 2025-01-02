import React from 'react';
import { HiOutlineLightningBolt, HiOutlineQuestionMarkCircle, HiOutlineChatAlt } from 'react-icons/hi';

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionSelect }) => {
  const actions = [
    {
      icon: <HiOutlineLightningBolt className="h-6 w-6" />,
      title: 'Quick Start',
      description: 'Get started with Hemera',
      action: 'Tell me about Hemera AI Studio',
    },
    {
      icon: <HiOutlineQuestionMarkCircle className="h-6 w-6" />,
      title: 'Help',
      description: 'Get assistance',
      action: 'What can you help me with?',
    },
    {
      icon: <HiOutlineChatAlt className="h-6 w-6" />,
      title: 'Chat',
      description: 'Start a conversation',
      action: 'Let\'s have a conversation',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={() => onActionSelect(action.action)}
          className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{action.icon}</div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;