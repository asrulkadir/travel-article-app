import Input from './Input'
import Button from './Button'

interface ISearchProps {
  onSearch: (val: string) => void;
  search: string;
  handleClear: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  className?: string;
}

const Search = ({onSearch, search, handleClear, handleSubmit, className = ''} : ISearchProps) => {
  return (
    <div 
      className={`flex justify-center gap-2 items-center ${className}`}
    >
      <form onSubmit={handleSubmit} className='flex justify-center gap-2 items-center'>
        <Input 
          type="text"
          placeholder="Search..."
          onChange={(val) => onSearch(val)}
          id='search'
          className='w-full lg:w-80'
          value={search}
          clearable
          onClear={handleClear}
        />
        <Button
          type='submit'
          title='Search'
          className='w-20'
        />
      </form>
    </div>
  )
}

export default Search