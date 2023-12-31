import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      navigate('/home');
    } catch (error) {
      console.log(error);
      toast.error('Error With Google Auth');
    }
  };

  return (
    <>
      <div
        onClick={handleGoogleAuth}
        className='cursor-pointer border-2 flex justify-around p-2 items-center'
      >
        <img
          className='bg-white'
          src='../imgs/google-icon.png'
          alt='google-icon'
          width={40}
          height={40}
        />
        <div className='font-semibold'>Sign In with Google</div>
      </div>
    </>
  );
};

export default GoogleAuth;
