import React, { useEffect, useState } from 'react';
import { createProduct, verifyProductId } from '../../services/productService';
import { Product } from '../../interfaces/Product';
import Button from '../Button';
import './style.css';

const ProductForm: React.FC = () => {
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
  const [successfully, setSuccessfully] = useState(false);

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
    const errors: any = {};

    if (!product.id) {
      errors.id = 'ID es requerido';
    } else if (product.id.length < 3 || product.id.length > 10) {
      errors.id = 'ID no válido!';
    } else {
      const idExists = await verifyProductId(product.id);
      if (idExists) {
        errors.id = 'ID ya existe';
      }
    }

    if (!product.name) {
      errors.name = 'Nombre es requerido';
    } else if (product.name.length < 5 || product.name.length > 100) {
      errors.name = 'Nombre no válido!';
    }

    if (!product.description) {
      errors.description = 'Descripción es requerida';
    } else if (product.description.length < 10 || product.description.length > 200) {
      errors.description = 'Descripción no válido!';
    }

    if (!product.logo) {
      errors.logo = 'Logo es requerido';
    }

    if (!product.date_release) {
      errors.date_release = 'Fecha de liberación es requerida';
    } else {
      const releaseDate = new Date(product.date_release);
      const currentDate = new Date();
      if (releaseDate < currentDate) {
        errors.date_release = 'Fecha de liberación no válido!';
      }
    }

    if (!product.date_revision) {
      errors.date_revision = 'Fecha de revisión es requerida';
    } else {
      const releaseDate = new Date(product.date_release);
      const revisionDate = new Date(product.date_revision);
      const expectedRevisionDate = new Date(releaseDate);
      expectedRevisionDate.setFullYear(releaseDate.getFullYear() + 1);

      if (revisionDate.getTime() !== expectedRevisionDate.getTime()) {
        errors.date_revision = 'Fecha de revisión no válido!';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
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
      await createProduct(product);
      setSuccessfully(true);
      setProduct({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
      });
    } catch (err) {
      setError('Fallo al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setProduct({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
    setErrors({});
  };

  return (
    <>
      {successfully && (
        <div className='successfully'>
            El producto se creó exitosamente
        </div>
      )} 
      <form className="product-form" onSubmit={handleSubmit}>
        <div className='form-header'>
          <h2>Formulario de Registro</h2>
        </div>
        <div className='form-container'>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label htmlFor="id">ID del Producto</label>
            <input className={errors.id?'error-input':undefined} type="text" id="id" name="id" value={product.id} onChange={handleChange} required />
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
            <Button color="secondary" onClick={handleReset} disabled={isSubmitting}>Reiniciar</Button>
            <Button color="primary" onClick={handleSubmit} disabled={isSubmitting}>Agregar</Button>
        </div>
      </form>
    </>
   
  );
};

export default ProductForm;
