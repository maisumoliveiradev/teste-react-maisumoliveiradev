import React, { useState } from 'react'
import styled from 'styled-components'
import Trash from '../../assets/Trash.svg'
import Minus from '../../assets/Minus.svg'
import Plus from '../../assets/Plus.svg'

interface Product {
  id: number
  image: string
  title: string
  price: number
}

interface CartItemProps {
  product: Product
  onRemove: (id: number) => void
  onQuantityChange: (id: number, newQuantity: number) => void
}

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 1fr 0.5fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #fff;

  @media (max-width: 900px) {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    grid-template-columns: 0.75fr 1fr;
  }
`

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
`

const ProductImage = styled.img`
  width: 91px;
  height: auto;
  object-fit: cover;
  margin-right: 16px;
`

const ProductInfo = styled.div`
  width: 111px;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    display: none;
  }
`

const ProductTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 8px;
`

const ProductPrice = styled.span`
  font-size: 1rem;
  font-weight: 700;
  font-size: 16px;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  input {
    width: 62px;
    height: 26px;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin: 0 8px;
  }

  img {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const Subtotal = styled.span`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 900px) {
    display: none;
  }
`

const RemoveButton = styled.button`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 900px) {
    display: none;
  }
`

const ProductInfoMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`

const ProductInfoMobileContainer = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const QuantityControlMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    gap: 11px;
    input {
      width: 62px;
      height: 26px;
      text-align: center;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      margin: 0 8px;
    }

    img {
      cursor: pointer;
    }
  }
`

const QuantityAndPrice = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
`
const SubtotalContainerMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`

const SubtotalTitleMobile = styled.span`
  display: none;
  @media (max-width: 900px) {
    display: block;
    font-weight: 700;
    color: #999999;
    font-size: 0.75rem;
    text-transform: uppercase;
  }
`
const SubtotalPriceMobile = styled.span`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }
`
const RemoveButtonMobile = styled.button`
  display: none;
  @media (max-width: 900px) {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`

const CartItem: React.FC<CartItemProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(1)

  const handleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange(product.id, newQuantity)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(product.id, newQuantity)
    }
  }

  const handleRemove = () => onRemove(product.id)

  const subtotal = (product.price * quantity).toFixed(2)

  return (
    <CartItemContainer>
      <ProductDetails>
        <ProductImage src={product.image} alt={product.title} />
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
        </ProductInfo>
      </ProductDetails>
      <ProductInfoMobileContainer>
        <ProductInfoMobile>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
          <RemoveButtonMobile onClick={handleRemove}>
            <img src={Trash} alt="Botão para remover item" />
          </RemoveButtonMobile>
        </ProductInfoMobile>
        <QuantityAndPrice>
          <QuantityControlMobile>
            <img
              src={Minus}
              alt="Botão para remover quantidade"
              onClick={handleDecrease}
            />
            <input type="text" value={quantity} readOnly />
            <img
              src={Plus}
              alt="Botão para aumentar quantidade"
              onClick={handleIncrease}
            />
          </QuantityControlMobile>
          <SubtotalContainerMobile>
            <SubtotalTitleMobile>Subtotal</SubtotalTitleMobile>
            <SubtotalPriceMobile>R$ {subtotal}</SubtotalPriceMobile>
          </SubtotalContainerMobile>
        </QuantityAndPrice>
      </ProductInfoMobileContainer>
      <QuantityControl>
        <img
          src={Minus}
          alt="Botão para remover quantidade"
          onClick={handleDecrease}
        />
        <input type="text" value={quantity} readOnly />
        <img
          src={Plus}
          alt="Botão para aumentar quantidade"
          onClick={handleIncrease}
        />
      </QuantityControl>
      <Subtotal>R$ {subtotal}</Subtotal>
      <RemoveButton onClick={handleRemove}>
        <img src={Trash} alt="Botão para remover item" />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
