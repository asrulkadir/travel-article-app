import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IArticle, IArticlePayload } from '../redux/articles/types';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/category/action';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IArticlePayload) => Promise<void>;
  initialData?: IArticle;
}

const ModalArticle: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const { loading, error } = useSelector((state: RootState) => state.articles);
  const { register, handleSubmit, reset, setValue } = useForm<IArticlePayload>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description,
      category: initialData?.category?.id,
      image: [],
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCategories());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('description', initialData.description);
      setValue('category', initialData?.category?.id ?? '');
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<IArticlePayload> = async (data) => {
    if (selectedFile) {
      data.image = [selectedFile];
    }
    await onSave(data);
    if(!initialData) {
      reset();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('image', [file]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Update Article' : 'Add Article'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mt-4" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block mt-4" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            {...register('description', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block mt-4" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            {...register('category', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {categories.data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="block mt-4" htmlFor="image">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept='image/*'
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {
            error && !loading && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )
          }
          <div className="flex justify-end mt-4 gap-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <Button
              type="submit"
              loading={loading}
              title="Save"
              className='w-24'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalArticle;