import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_API_KEY;

const Auth = () => {
  const navigator = useNavigate();
  useEffect(() => {
    localStorage.setItem('api-key', API_KEY);

    const id = setTimeout(() => {
      navigator('/');
    }, 3000);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm text-gray-500">
          보안 처리 중입니다...
        </div>
      </div>
    </div>
  );
};

export default Auth;
