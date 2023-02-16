import React, {useState} from "react";
import Button from "../components/ui/Button";
import {uploadImage} from "../api/uploader";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState();
    const {addProduct} =  useProducts();

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsUploading(true);
        uploadImage(file)
            .then(url => {
                addProduct.mutate({product, url},
                    { onSuccess: () => {
                            setSuccess('성공적으로 등록하였습니다!');
                            setTimeout(() => {
                                setSuccess(null);
                            }, 4000)
                        }}
                    )
            })
            .finally(() => {
                setIsUploading(false);
            })
    }
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === 'file') {
            setFile(files && files[0])
            return;
        }
        setProduct((product) => ({...product, [name] : value}))
    }
    return (
       <section className='w-full text-center'>
           <h2 className='text-3xl font-bold my-4'>새로운 제품 등록</h2>
           {success && <p className='my-2'> ✔️ {success}</p>}
           {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file'/>}
           <form
               onSubmit={handleSubmit}
               className='flex flex-col px-12'
           >
               <input type="file"
                      accept='image/*'
                      required
                      name='file'
                      onChange={handleChange}
               />
               <input
                   type="text"
                   name='title'
                   value={product.title  ?? ''}
                   placeholder='제품명을 입력하세요'
                   required
                   onChange={handleChange}
               />
               <input
                   type="number"
                   name='price'
                   value={product.price  ?? ''}
                   placeholder='가격을 입력하세요'
                   required
                   onChange={handleChange}
               />
               <input
                   type="text"
                   name='category'
                   value={product.category  ?? ''}
                   placeholder='카테고리를 입력하세요'
                   required
                   onChange={handleChange}
               />
               <input
                   type="text"
                   name='description'
                   value={product.description  ?? ''}
                   placeholder='제품 설명을 입력하세요'
                   required
                   onChange={handleChange}
               />
               <input
                   type="text"
                   name='options'
                   value={product.options  ?? ''}
                   placeholder='옵션들(콤마(,)로 구분'
                   required
                   onChange={handleChange}
               />
               <Button
                   disabled={isUploading}
                   text={isUploading ? '업로드 중...' : '제품 등록하기'}/>
           </form>
       </section>
    )
}