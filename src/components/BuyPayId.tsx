
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BuyPayId = ({ onBack }: { onBack: () => void }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showServiceNotice, setShowServiceNotice] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || ''
  });

  // Countdown for step 2
  useEffect(() => {
    if (currentStep === 2 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setProgress((10 - countdown + 1) / 10 * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === 2 && countdown === 0) {
      setShowServiceNotice(true);
    }
  }, [currentStep, countdown]);

  // Auto-redirect for step 4 with proper countdown
  useEffect(() => {
    if (currentStep === 4) {
      let countdownTimer = 10;
      const timer = setInterval(() => {
        countdownTimer--;
        setProgress((10 - countdownTimer) / 10 * 100);
        if (countdownTimer <= 0) {
          clearInterval(timer);
          setCurrentStep(5);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleServiceNoticeClose = () => {
    setShowServiceNotice(false);
    setCurrentStep(3);
  };

  const renderServiceNotice = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold">Service Notice</h3>
          </div>
          <Button onClick={handleServiceNoticeClose} className="bg-transparent p-1">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
        
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-orange-600">⚠</span>
            <h4 className="font-bold text-orange-800">Opay Bank Service Down</h4>
          </div>
          <p className="text-orange-700 text-sm">
            We're currently experiencing issues with Opay bank transfers. Please use other banks for your payments.
          </p>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          We apologize for any inconvenience. All other banks are working normally and your payment will be processed immediately.
        </p>
        
        <Button
          onClick={handleServiceNoticeClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
        >
          I Understand
        </Button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Amount</label>
              <div className="bg-gray-100 p-4 rounded-lg">
                <span className="text-2xl font-bold">₦7,250</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Your Email Address</label>
              <input
                type="email"
                placeholder="email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              Pay
            </Button>

            <p className="text-center text-gray-600 text-sm">
              Your PAY ID will be displayed on the app once your payment is confirmed.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Preparing Payment Account</h3>
            <p className="text-gray-600">Please wait while we set up your payment...</p>
            <div className="text-3xl font-bold text-purple-600">{countdown}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">NGN 7,250</p>
              </div>
            </div>

            <p className="text-center text-lg font-medium">
              Complete this bank transfer to proceed
            </p>

            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Amount</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">NGN 7,250</span>
                  <Button onClick={() => handleCopy('7,250')} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">34</span>
                  <span className="font-medium">Account Number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">5026987248</span>
                  <Button onClick={() => handleCopy('5026987248')} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs">$</span>
                  <span className="font-medium">Bank Name</span>
                </div>
                <span className="text-xl font-bold">MONIEPOINT PSB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">i</span>
                  <span className="font-medium">Account Name</span>
                </div>
                <span className="text-xl font-bold">SAMUEL KALLY</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Kindly proceed with the payment for your PAY ID. Complete the bank transfer to activate your PAY ID.
            </p>

            <Button
              onClick={() => setCurrentStep(4)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-lg"
            >
              I have made this bank Transfer
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Confirming Your Payment</h3>
            <p className="text-gray-600">Please wait while we verify your transaction...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments</p>
            <p className="text-sm text-gray-500">Please do not close this page</p>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">×</span>
            </div>
            <h3 className="text-2xl font-bold text-orange-500">Transaction verification failed!</h3>
            <div className="text-center">
              <p className="text-gray-800">Your payment could not be completed.</p>
              <p className="text-gray-600">Reason: No Payment received from you/ invalid payment method.</p>
            </div>
            
            <div className="w-full border border-gray-300 rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-600">••••••••••••</span>
              <Button className="bg-transparent border-none p-0">
                <span className="text-gray-400">👁</span>
              </Button>
            </div>

            <div className="w-full space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg">
                Try Again
              </Button>
              <Button 
                onClick={onBack}
                className="w-full bg-transparent border border-gray-300 text-gray-700 py-4 text-lg rounded-lg hover:bg-gray-50"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Buy PAY ID</h1>
        </div>
      </div>

      <div className="p-6">
        {renderStep()}
      </div>

      {showServiceNotice && renderServiceNotice()}
    </div>
  );
};

export default BuyPayId;
