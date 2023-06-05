import { useState } from 'react';
import defaultProduct from '../assets/images/defaultProduct.png';
export type InputBoxProps = {
    backgroundColor: string;
    color: string;
    marginLeft?: string;
    fontSize: string;
    padding?: string;
    colorText: string;
    title: string;
    placeholder: string;
    width?: string;
    className?: string;
    type?: string; 
    id?: string;
    name?: string;
    value?: string | number;
    required?:boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: any) => void;
    
};
export const InputBox: React.FC<InputBoxProps> = ({className, marginLeft, required =true, backgroundColor, color,fontSize,padding, colorText, width='30rem',title, placeholder,type = "text", value, id,name, onChange, onKeyUp }) => {
    return (
        <div className="inputBox" style={{ backgroundColor: backgroundColor, color: color, fontSize: fontSize,padding:padding, marginLeft:marginLeft }}>
            <h1 style={{ color: colorText }}>{title}</h1>
            <input className={className} required={required} type={type} id={id} name={name}  value={value} onKeyUp={onKeyUp} onChange={onChange}  placeholder={placeholder} style={{ borderRadius: "10px", backgroundColor:"rgba(2, 92, 109, 0.07)" }} />
        </div>
    );
};

export type MyButtonProps = {
    backgroundColor: string;
    fontSize: string;
    text: string;
    width?: string;
    borderRadius?: string;
    margin?: string;
    padding?: string;
    disabled?:boolean;
    hidden?:boolean;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
  };
export const MyButton: React.FC<MyButtonProps> = ({
    backgroundColor,
    fontSize,
    text, 
    width,
    margin,
    disabled,
    hidden,
    borderRadius="15px",
    padding,
    onClick,
    type = "button",
  }) => {
    return (
      <button 
        disabled={disabled} 
        hidden={hidden}
        style={{ backgroundColor, fontSize, width, margin, borderRadius, padding }}
        onClick={onClick} 
        type={type}
      >
        {text}
        <style>
          {`
            button {
              color: #FFFFFF;
            }
            button:hover {
            color: #FFA800;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
            }
          `}
        </style>
      </button>
    );
};

export type ProductCardProps = {
  productName: string;
  price: BigInteger;
  image?: string;
};
export const ProductCard: React.FC<ProductCardProps> = ({productName,price,image= defaultProduct}) => {
  return (
    <div className="myCard">
          <div className="myCard2"><img src={image} alt="Imagen del producto"/></div>
          <div className="myCardBottom">
            <div className="myCardBottom2"></div>
            <span className="cardTitle">{productName}</span>
            <span className="cardPrice">${price}</span>
          </div>
    </div>
  );
};

export type InputImageProps = {
  backgroundColor: string;
  color: string;
  fontSize: string;
  padding?: string;
  colorText: string;
  title: string;
  placeholder: string;

  className?: string;
  type?: string; 
  id?: string;
  name?: string;
  value?: string | number;
  required?:boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const InputImage: React.FC<InputImageProps> = ({required =true, colorText, title }) => {
  return (
      <div style={{ marginLeft:'16px'}}>
        <h5 style={{ color: colorText }}>{title}</h5>
        <div className="btn btnInput" style={{width:"30rem", backgroundColor:'#FFA800', borderRadius: "10px"}}>
          Subir imagen
          <input type="file" accept="image/png" name="file" required={required} style={{position: "absolute", display: "none", opacity:"rgba(2, 92, 109, 0.07)" }}/>
        </div>
        <style>
          {`
            .btnInput {
              color: #ffffff;
            }
            .button:hover {
            color: #4C015D;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
            }
          `}
        </style>
      </div>
      
  );
};

export type CategoryFilterButtonProps = {
  title: string;
  idCategory: string;
  onCategoryChange: (selectedCategory: string) => void;
};
export const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = ({ title, idCategory, onCategoryChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
    onCategoryChange(idCategory);
  };
  return (
    <button key={idCategory} onClick={handleClick} className={`categoryFilterButton btn ${isSelected ? 'selected' : ''}`}>{title}</button>
  );
};

export type ProductButtonNavbarProps = {
  title: string;
  idProducto: Number;
  className?: string;
  href?: string;
};
export const ProductButtonNavbar: React.FC<ProductButtonNavbarProps> = ({ title,idProducto, href, className}) => {
  const handleClick = () => {
    window.location.href = '/products/'+idProducto+'';
  };
  return (
    <button onClick={handleClick} className={className} >{title}</button>
  );
};
