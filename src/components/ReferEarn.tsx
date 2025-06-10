
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Users, DollarSign, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReferEarn = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) => {
  const { user, updateReferralBalance, addTransaction } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [payId, setPayId] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);

  const referralLink = "https://bestearnig9jaupdatespaygo.netlify.app";
  const referralMessage = `Join PayGo and start earning! Get ₦5,000 welcome bonus when you sign up using my link: ${referralLink}`;

  // Auto-redirect for withdrawal processing
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

  const handleWithdraw = () => {
    if (payId !== 'PAYID528212') {
      alert('Invalid PAY ID. Please enter the correct PAY ID.');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > (user?.referralBalance || 0)) {
      alert('Invalid withdrawal amount.');
      return;
    }

    setCurrentStep(4);
  };

  const completeWithdrawal = () => {
    const amount = parseFloat(withdrawAmount);
    updateReferralBalance(amount);
    addTransaction({
      type: 'Referral Withdrawal',
      amount: amount,
      date: new Date().toISOString()
    });
    setCurrentStep(5);
  };

  useEffect(() => {
    if (currentStep === 4 && countdown === 0) {
      completeWithdrawal();
    }
  }, [countdown, currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Referral Balance</h3>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold">₦{(user?.referralBalance || 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm opacity-90">Total Referrals</p>
                  <p className="text-xl font-bold">{user?.totalReferrals || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-90">Earning Per Referral</p>
                  <p className="text-xl font-bold">₦5,000</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Share Your Referral Link</h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your referral message:</p>
                <p className="text-gray-800 mb-3">{referralMessage}</p>
                <Button
                  onClick={() => handleCopy(referralMessage)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Message</span>
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Your referral link:</p>
                <p className="text-gray-800 mb-3 break-all">{referralLink}</p>
                <Button
                  onClick={() => handleCopy(referralLink)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h4 className="text-lg font-bold text-gray-800 mb-4">How It Works</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-gray-600">Share your referral link with friends</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-gray-600">They sign up using your link</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-gray-600">You earn ₦5,000 for each successful referral</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-lg"
            >
              Withdraw Earnings
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Withdraw Referral Earnings</h3>
              <p className="text-gray-600">Available Balance: ₦{(user?.referralBalance || 0).toLocaleString()}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Withdrawal Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">PAY ID</label>
                <input
                  type="text"
                  placeholder="Enter your PAY ID"
                  value={payId}
                  onChange={(e) => setPayId(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-sm text-gray-500 mt-1">Required PAY ID:</p>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              Submit Withdrawal
            </Button>

            <Button
              onClick={() => setCurrentStep(1)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
            >
              Back
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Processing Withdrawal</h3>
            <p className="text-gray-600 text-center">Please wait while we process your withdrawal...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">Withdrawal Successful!</h3>
            
            <div className="bg-white rounded-lg p-6 border w-full">
              <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Withdrawal Receipt</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold">₦{parseFloat(withdrawAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PAY ID:</span>
                  <span className="font-bold">{payId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-bold">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-bold">Completed</span>
                </div>
              </div>
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              Back to Dashboard
            </Button>
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
          <h1 className="text-xl font-bold">Refer & Earn</h1>
        </div>
      </div>

      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default ReferEarn;
