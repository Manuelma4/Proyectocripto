import React from 'react';
//import { Card, CardImg, CardText, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import defaultProduct from '../assets/images/defaultProduct.png';
import { MyButton } from './utils';


//RenderProduct function
type ProductDetailProps = {
    productName: string;
    productPrice: number;
    productDescription: string;
    productQuantity: number;
    productImage: string;
  };
const ProductDetail: React.FC<ProductDetailProps> = ({productName,productPrice,productDescription,productQuantity, productImage})=>{
    let imagen;
    if (productImage === null){
        imagen = defaultProduct;
    }
    return (
        <div className="container productDetail">
            <div className="row">
                <div className="col-12">
                    <h3>{productName}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className=" offset-md-3 col-md-3 d-flex justify-content-center productDetailImage">
                    <img src={imagen} alt="Home"/>
                </div>  
                <div className="col-md-5 productDetailData">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <h5>Cantidad en stock: {productQuantity}</h5>
                    <div className='col-md-2'>
                            <h5>${productPrice}</h5>
                        </div>
                        <div className='col-md-6'>
                            <MyButton backgroundColor={'#4C015D'} width='10rem' borderRadius='10px' padding='0.5rem' fontSize={''} text={'Agregar al carrito'}/>
                        </div>
                </div>              
            </div>
        </div>
    );
}
    
       

export default ProductDetail;