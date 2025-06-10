
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const JoinCommunities = ({ onBack }: { onBack: () => void }) => {
  const handleJoinWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VbBFTkBLI8YguYWtvH3D', '_blank');
  };

  const handleJoinTelegram = () => {
    window.open('t.me/Paygofficial', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Join Our Communities</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">Connect With Us</h2>
          <p className="text-gray-600">Join our official channels for updates and support</p>
        </div>

        {/* WhatsApp Channel */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-bold">WhatsApp Channel</h3>
          </div>
          
          <Button
            onClick={handleJoinWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-lg mb-4"
          >
            <span className="mr-2">💬</span>
            Join WhatsApp
          </Button>
        </div>

        {/* Telegram Channel */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✈️</span>
            </div>
            <h3 className="text-xl font-bold">Telegram Channel</h3>
          </div>
          
          <Button
            onClick={handleJoinTelegram}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-lg mb-4"
          >
            <span className="mr-2">✈️</span>
            Join Telegram
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunities;
