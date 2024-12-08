import { ReactNode, useState, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div
        className='flex flex-col justify-center items-center h-screen'
      >
        <h1 className='text-2xl text-center mt-4'>Something went wrong.</h1>
        <p className='text-center'>Please try again later.</p>
      </div>
    )
  }

  return <>{children}</>;
};

export default ErrorBoundary;