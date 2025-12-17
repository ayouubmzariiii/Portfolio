import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/Button';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = usePortfolio();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-white/10 rounded-2xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white/5 rounded-full mb-4">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display text-white">Admin Access</h1>
          <p className="text-secondary mt-2">Enter password to manage portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
