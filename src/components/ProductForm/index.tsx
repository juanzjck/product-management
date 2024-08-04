import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces/Product';
import { createProduct, fetchProductList, updateProduct } from '../../services/productService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../Button';
import './style.css';

interface ProductFormProps {
  id?: string
}
const ProductForm: React.FC<ProductFormProps> = ({id}) => {

  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [fetchedProduct, setFetchedProduct] =  useState<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  });
  const [successfully, setSuccessfully] = useState(false);
  useEffect(() => {
    console.log('product',id )
    if (id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await fetchProductList();
          const product = fetchedProduct.filter(product => product.id === id)[0];
          const auxProduct = {
            ...product,
            date_release:product.date_release.substring(0, 10),
            date_revision:product.date_revision.substring(0, 10),
          }
          setFetchedProduct(auxProduct);
          setProduct(auxProduct);
        } catch (error) {
          setError('Failed to fetch product');
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(()=>{
    const dateRelease = product.date_release.split('-');;

    const year = Number(dateRelease[0]) + 1;
    const newDate = `${year}-${dateRelease[1]}-${dateRelease[2]}`
    setProduct((prevProduct) => ({
      ...prevProduct,
        date_revision: newDate
    }));
  },[product.date_release]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const validateForm = async () => {
    const requeridoMessage = "Este campo es requerido";
    const errors: any = {};

    if (!product.id ) {
      errors.id = requeridoMessage;
    } else if ( !id && product.id && (product.id.length < 3 || product.id.length > 10)) {
      errors.id = 'ID no válido!';
    }

    if (!product.name) {
      errors.name = requeridoMessage;
    } else if (product.name.length < 5 || product.name.length > 100) {
      errors.name = 'Nombre no válido!';
    }

    if (!product.description) {
      errors.description = requeridoMessage;
    } else if (product.description.length < 10 || product.description.length > 200) {
      errors.description = 'Descripción no válida!';
    }

    if (!product.logo) {
      errors.logo = requeridoMessage;
    }

    if (!product.date_release) {
      errors.date_release = requeridoMessage;
    } else {
      const releaseDate = new Date(product.date_release);
      const currentDate = new Date();
      if (releaseDate < currentDate) {
        errors.date_release = 'Fecha de liberación no válida!';
      }
    }

    if (!product.date_revision) {
      errors.date_revision = requeridoMessage;
    } else {
      const releaseDate = new Date(product.date_release);
      const revisionDate = new Date(product.date_revision);
      const expectedRevisionDate = new Date(releaseDate);
      expectedRevisionDate.setFullYear(releaseDate.getFullYear() + 1);

      if (revisionDate.getTime() !== expectedRevisionDate.getTime()) {
        errors.date_revision = 'Fecha de revisión no válida!';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = () => {
    if(id){
      setProduct(fetchedProduct);
    } else {
      setProduct({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
      });
    }

    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (id) {
        await updateProduct(product);
        setSuccessfully(true);
      } else {
        await createProduct(product);
        setSuccessfully(true);
      }
    } catch (err) {
      setError(id ? 'Fallo al actualizar el producto' : 'Fallo al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {successfully && (
      <div className='successfully'>
        {id? 'El producto se edito exitosamente' : 'El producto se creó exitosamente'}  
        <Link className='successfully-link' to="/">Regresar a la lista</Link>
      </div>
    )} 
    <form className="product-form">
      <div className='form-header'>
        <h2>{id ? 'Editar Producto' : 'Formulario de Registro'}</h2>
      </div>
      <div className='form-container'>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="id">ID del Producto</label>
          <input disabled={id!==undefined} className={errors.id?'error-input':undefined} type="text" id="id" name="id" value={product.id} onChange={handleChange} required />
          {errors.id && <div className="error">{errors.id}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input className={errors.name?'error-input':undefined} type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input className={errors.description?'error-input':undefined} id="description" name="description" value={product.description} onChange={handleChange} required />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="logo">URL del Logo</label>
          <input className={errors.logo?'error-input':undefined} type="text" id="logo" name="logo" value={product.logo} onChange={handleChange} required />
          {errors.logo && <div className="error">{errors.logo}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="date_release">Fecha de Liberación</label>
          <input className={errors.date_release?'error-input':undefined} type="date" id="date_release" name="date_release" value={product.date_release} onChange={handleChange} required />
          {errors.date_release && <div className="error">{errors.date_release}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="date_revision">Fecha de Revisión</label>
          <input  disabled className={errors.date_revision?'error-input':undefined} type="date" id="date_revision" name="date_revision" value={product.date_revision} onChange={handleChange} required />
          {errors.date_revision && <div className="error">{errors.date_revision}</div>}
        </div>
      </div>
      <div className="button-group flex-actions-cender">
          <Button color="secondary"  disabled={isSubmitting} onClick={handleReset} >Reiniciar</Button>
          <Button color="primary"  onClick={handleSubmit} type="submit" disabled={isSubmitting}>{id!==undefined ? 'Enviar' : 'Agregar'}</Button>
      </div>
    </form>
  </>
  );
};

export default ProductForm;
