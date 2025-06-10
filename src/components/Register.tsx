
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register = ({ onSwitchToLogin }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (name && email && password) {
      const result = register(name, email, password);
      if (!result.success && result.error) {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-right mb-4">
            <a 
              href="https://wa.me/2347086445037" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 text-sm hover:underline"
            >
              Need Help?
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white text-2xl font-bold py-8 px-12 rounded-2xl mb-8 mx-auto w-fit overflow-hidden relative">
            <div className="animate-slide-left text-white font-bold">
              PAYGO
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-black mb-8">
            Register to continue
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                required
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-4 text-lg font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Register
            </Button>
          </form>

          <p className="text-center mt-6 text-purple-600 cursor-pointer hover:underline" onClick={onSwitchToLogin}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
