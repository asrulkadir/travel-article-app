import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../redux/category/action";
import { ICategoryPayload } from "../../redux/category/types";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');

  const { register, handleSubmit, reset } = useForm<ICategoryPayload>();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleEdit = (category: ICategoryPayload) => {
    setModalType('edit');
    setIsModalOpen(true);
    reset(category);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setIsModalOpen(true);
    reset({ name: '', description: '' });
  };

  const onSubmit = async (data: ICategoryPayload) => {
    if (modalType === 'add') {
      const res = await dispatch(createCategory(data));
      if(res.meta.requestStatus === 'fulfilled') {
        setIsModalOpen(false);
      }
    } else {
      const res = await dispatch(updateCategory({
        documentId: data.documentId,
        name: data.name,
        description: data.description
      }));
      if(res.meta.requestStatus === 'fulfilled') {
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Category</h1>
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
          Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-r w-20">Number</th>
                <th className="py-2 px-4 border-b border-r">Name</th>
                <th className="py-2 px-4 border-b border-r">Description</th>
                <th className="py-2 px-4 border-b w-40">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.data.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-100 border-b">
                  <td className="py-2 px-4 border-r text-center w-20">{index + 1}</td>
                  <td className="py-2 px-4 border-r">{category.name}</td>
                  <td className="py-2 px-4 border-r">{category.description}</td>
                  <td className="py-2 px-4 text-center w-40">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit({
                          documentId: category.documentId,
                          name: category.name,
                          description: category.description || ''
                        })}
                        className="bg-blue-500 text-white py-1 px-2 rounded"
                      >
                      Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.documentId)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                      Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{modalType === 'add' ? 'Add Category' : 'Edit Category'}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    {...register('description')}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                  Cancel
                  </button>
                  <Button
                    title={modalType === 'add' ? 'Add' : 'Update'}
                    loading={loading}
                    className="w-24"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;