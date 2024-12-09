import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination= ({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps ) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Button
        type='button'
        title='Previous'
        className='mr-2 w-24'
        onClick={handlePrevious}
        disabled={currentPage === 1}
      />
      <span className='mx-2'>{currentPage} of {totalPages}</span>
      <Button
        type='button'
        title='Next'
        className='ml-2 w-20'
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;