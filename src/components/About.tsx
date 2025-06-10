
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const About = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">About</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* PayGo Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-orange-400 rounded-lg p-6">
            <h1 className="text-white text-2xl font-bold">DIGITAL PAYGO</h1>
          </div>
        </div>

        {/* About PayGo */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">About PayGo</h2>
        </div>

        <div className="space-y-6 text-gray-700">
          <p>
            PayGo is a leading financial services platform that provides users with convenient access to 
            digital transactions, airtime and data purchases, and fund withdrawals.
          </p>

          <p>
            Our mission is to make financial services accessible to everyone, with a user-friendly 
            interface and reliable service.
          </p>

          <div>
            <h3 className="font-bold text-gray-800 mb-3">With PayGo, you can:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></span>
                Purchase airtime and data for all major networks
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></span>
                Transfer funds to any bank account
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></span>
                Track your transaction history
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></span>
                Earn rewards and cashback on transactions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></span>
                Get 24/7 customer support
              </li>
            </ul>
          </div>

          <p>
            PayGo was founded in 2023 and has quickly grown to become a trusted platform for digital 
            financial services.
          </p>
        </div>

        {/* Contact Us */}
        <div className="border-t pt-6 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
          <div className="space-y-2 text-gray-700">
            <p>Phone: +2347086445037</p>
            <p>Address: 33 Financial Street, Lagos, Nigeria</p>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8 pt-6 border-t">
          <p>PayGo © 2023. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
