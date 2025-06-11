import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSlide } from '../hooks/useAutoSlide';
import { Bell, Eye, EyeOff, ArrowUp, CheckCircle, CreditCard, BarChart3, Database, Headphones, Globe, DollarSign, User, Tv } from 'lucide-react';
import BuyPayId from './BuyPayId';
import Transfer from './Transfer';
import Airtime from './Airtime';
import Data from './Data';
import Support from './Support';
import EarnMore from './EarnMore';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import About from './About';
import TransactionHistory from './TransactionHistory';
import ReferEarn from './ReferEarn';
import Upgrade from './Upgrade';
import JoinCommunities from './JoinCommunities';
import Onboarding from './Onboarding';
import ReferEarnPopup from './ReferEarnPopup';

const Dashboard = () => {
  const { user, logout, isOnboardingComplete, completeOnboarding, showReferPopup, hideReferPopup } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showOnboardingPopup, setShowOnboardingPopup] = useState(!isOnboardingComplete);

  useAutoSlide(api, 4000);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    setShowOnboardingPopup(false);
  };

  const quickActions = [
    { 
      icon: <CreditCard className="w-8 h-8 text-purple-600" />, 
      label: "Buy PAY ID",
      action: () => setCurrentView('buy-pay-id')
    },
    { 
      icon: <Tv className="w-8 h-8 text-gray-600" />, 
      label: "Watch",
      action: () => window.open('https://t.me/bluepay247', '_blank')
    },
    { 
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />, 
      label: "Airtime",
      action: () => setCurrentView('airtime')
    },
    { 
      icon: <Database className="w-8 h-8 text-blue-500" />, 
      label: "Data",
      action: () => setCurrentView('data')
    },
    { 
      icon: <Headphones className="w-8 h-8 text-gray-600" />, 
      label: "Support",
      action: () => setCurrentView('support')
    },
    { 
      icon: <Globe className="w-8 h-8 text-blue-500" />, 
      label: "Group",
      action: () => setCurrentView('join-communities')
    },
    { 
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />, 
      label: "Earn More",
      action: () => setCurrentView('earn-more')
    },
    { 
      icon: <User className="w-8 h-8 text-blue-500" />, 
      label: "Profile",
      action: () => setCurrentView('profile')
    }
  ];

  const promotions = [
    {
      title: "Transact & Win",
      subtitle: "Great prizes await",
      description: "All customers who pay with PayGo in store will stand a chance to win great prizes",
      image: "/lovable-uploads/3ce9f1fb-b753-4102-8a22-a51a0cf90c72.png"
    },
    {
      title: "Mobile Money",
      subtitle: "AUGUST 27-28",
      description: "Special promotion for mobile money transactions",
      image: "/lovable-uploads/c33112b4-8b2b-4d2d-97d5-5db6d30d2254.png"
    },
    {
      title: "Winners",
      subtitle: "of K20 airtime",
      names: ["Patience Ng'andwe", "Phiri John"],
      image: "/lovable-uploads/df8c5190-45dd-42bb-a63b-2d0ac0fe8e40.png"
    }
  ];

  if (currentView === 'buy-pay-id') {
    return <BuyPayId onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'transfer') {
    return <Transfer onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'airtime') {
    return <Airtime onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'data') {
    return <Data onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'support') {
    return <Support onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'earn-more') {
    return <EarnMore onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'profile') {
    return <Profile 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'profile-info') {
    return <ProfileInfo onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'about') {
    return <About onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'transaction-history') {
    return <TransactionHistory onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'refer-earn') {
    return <ReferEarn 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'upgrade') {
    return <Upgrade onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'join-communities') {
    return <JoinCommunities onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100">
      {/* Onboarding Popup */}
      {showOnboardingPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <Onboarding onComplete={handleCompleteOnboarding} />
          </div>
        </div>
      )}

      {/* Sliding Banner */}
      <div className="bg-white p-3 overflow-hidden border-b">
        <div className="animate-slide-banner whitespace-nowrap text-red-500">
          Dear user we're currently having issues with OPay bank kindly use another bank for your payment of pay Id
        </div>
      </div>

      {/* Header */}
      <div className="mx-2">
        <div className="bg-purple-900 text-white p-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Hi, {user?.name} 👋</h1>
              <p className="text-sm opacity-90">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => setCurrentView('transaction-history')}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              <Bell className="w-6 h-6" />
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-2">Your Balance</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {balanceVisible ? `₦${(user?.balance || 0).toLocaleString()}.00` : '₦***,***.00'}
              </h2>
              <p className="text-sm opacity-90">Weekly Rewards: ₦180,000.00</p>
            </div>
            <Button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={() => setCurrentView('upgrade')}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Upgrade</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('transfer')}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2"
            >
              <ArrowUp className="w-5 h-5" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className="text-center">
              <button 
                onClick={action.action}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow mb-2 w-full"
              >
                {action.icon}
              </button>
              <p className="text-xs text-gray-600">{action.label}</p>
            </div>
          ))}
        </div>

        {/* Promotions Carousel */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Current Promotions</h3>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {promotions.map((promotion, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-2xl overflow-hidden h-[240px]">
                    <img 
                      src={promotion.image} 
                      alt={promotion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <Button
                onClick={cancelLogout}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
              >
                No
              </Button>
              <Button
                onClick={confirmLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Refer & Earn Popup */}
      {showReferPopup && (
        <ReferEarnPopup onClose={hideReferPopup} />
      )}
    </div>
  );
};

export default Dashboard;
