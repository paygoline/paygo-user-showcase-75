
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const Support = ({ onBack }: { onBack: () => void }) => {
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/2347086445037', '_blank');
  };

  const handleLiveChat = () => {
    window.open('t.me/Paygofficial', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Support</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">How can we help you?</h2>

        {/* Live Chat */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <h3 className="text-xl font-bold">Live Chat</h3>
          </div>
          <p className="text-gray-600 mb-6">Chat with our support team directly in the app</p>
          
          <Button
            onClick={handleLiveChat}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg mb-4"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Live Chat
          </Button>
          
          <p className="text-gray-600 text-sm">
            Our support agents are available to assist you with any questions or issues.
          </p>
        </div>

        {/* WhatsApp Support */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <h3 className="text-xl font-bold">WhatsApp Support</h3>
          </div>
          <p className="text-gray-600 mb-6">Chat with our support team on WhatsApp for quick assistance</p>
          
          <Button
            onClick={handleWhatsAppChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-lg mb-4"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
          
          <p className="text-gray-600 text-sm">
            Our support team is available 24/7 to assist you with any issues or questions.
          </p>
        </div>

        <div className="text-center text-gray-500 mt-8">
          <p className="text-sm">Financial Services</p>
          <p className="text-sm">PayGo © 2023. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
