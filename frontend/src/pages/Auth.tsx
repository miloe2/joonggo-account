import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_API_KEY;


const Auth = () => {
  const navigator = useNavigate();
  useEffect(() => {
    localStorage.setItem('api-key', API_KEY);

    const id = setTimeout(() => {
      navigator('/')
    }, 5000);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className='bg-red-50 w-full h-screen flex justify-center items-center'>
      <div>
        보안 처리중...
      </div>
    </div>
  )
}

export default Auth