import { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
}

const ErrorFallback = () => (
  <div className='flex flex-col justify-center items-center h-screen'>
    <h1 className='text-2xl text-center mt-4'>Something went wrong.</h1>
    <p className='text-center'>Please try again later.</p>
  </div>
);

const ErrorBoundary = ({ children }: Props) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;