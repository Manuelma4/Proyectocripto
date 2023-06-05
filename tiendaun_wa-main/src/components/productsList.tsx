import React from "react";
import { ProductCard } from "./utils";
type ProductsListProps = {
    data: any;
    loading: boolean;
    error: any;
    searched: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({data, loading,error, searched}) => {
    if (loading) return <p>Loading...</p>;
    if(error) return <p>Error :(</p>;
    let catalogue=[];
    if (searched){
        catalogue = data.productByName.map((product: { idProducto: React.Key | null | undefined; nombre: string; precio: Uint8Array; }) => {
            const urlProduct = '/products/'+ (product.idProducto);
            return (
                <div key={product.idProducto} className='col-12 col-md-6 col-lg-3'>
                    <a href={urlProduct}><ProductCard productName = {product.nombre} price={product.precio}/></a>
                </div>
            );
        });
    }
    else{
        catalogue = data.map((product: { idProducto: number; nombre: string; precio: Uint8Array; }) => {
            const urlProduct = '/products/'+ (product.idProducto);
            return (
                <div key={product.idProducto} className='col-12 col-md-6 col-lg-3'>
                    <a href={urlProduct}>
                        <ProductCard productName = {product.nombre} price={product.precio}/>
                    </a>
                </div>
            );
        });
    }
    
    return (
        <div className='row'>
            {catalogue}
        </div>
    );
};

export default ProductsList;
