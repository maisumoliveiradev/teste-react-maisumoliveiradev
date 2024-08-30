import React, { useState, useEffect } from 'react'
import { Header } from '../Header'
import CartItem from '../CartItem'
import styled from 'styled-components'
import Empty from '../../assets/Empty.svg'
import Sucess from '../../assets/Sucess.svg'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: number
  image: string
  title: string
  price: number
}

const TotalContainer = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  padding: 24px;
  justify-content: space-between;

  button {
    width: 173px;
    height: 34px;
    background-color: #009edd;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 24px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 16px;
  }
`

const PriceTotalContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  text-transform: uppercase;

  span {
    color: #999999;
    font-size: 0.875rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`

const EmptyContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const EmptyContainerTitle = styled.div`
  padding-top: 64px;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
`

const EmptyContainerImage = styled.div`
  width: 447px;
  display: flex;
  width: 447px;
  justify-content: center;
  border-bottom: 1px solid #000;

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

const EmptyContainerButton = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  width: 173px;
  height: 40px;
  background-color: #009edd;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 143px;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }
`

const SucessContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
  @media (max-width: 768px) {
    padding: 16px;
  }
`

const SucessContainerTitle = styled.div`
  padding-top: 64px;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
`

const SucessContainerImage = styled.div`
  width: 447px;
  display: flex;
  width: 447px;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

const SucessContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 173px;
  height: 40px;
  background-color: #009edd;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 143px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }
`

const ProductReviewContainer = styled.div`
  padding: 0px 196px 80px 196px;

  @media (max-width: 768px) {
    padding: 0px 16px 64px 16px;
  }
`

const ProductReviewDetails = styled.div`
  background-color: #fff;
  border-radius: 4px;
`

const CartHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1.5fr 0.5fr 2fr;
  padding: 16px;
  background-color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  @media (max-width: 900px) {
    display: none;
  }
`

const HeaderTitle = styled.div`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
`

const Divisor = styled.div`
  border-bottom: 1px solid #999;
  width: 97%;
  display: block;
  margin: 0 auto;
  box-sizing: border-box;
`

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({})
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      const parsedItems = JSON.parse(savedCartItems)
      setCartItems(parsedItems)

      const initialQuantities = parsedItems.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: any, item: Product) => {
          acc[item.id] = 1
          return acc
        },
        {}
      )
      setQuantities(initialQuantities)
    }
  }, [])

  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleRemove = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))

    const updatedQuantities = { ...quantities }
    delete updatedQuantities[id]
    setQuantities(updatedQuantities)

    const savedActiveButtons = JSON.parse(
      localStorage.getItem('activeButtons') || '{}'
    )
    delete savedActiveButtons[id]
    localStorage.setItem('activeButtons', JSON.stringify(savedActiveButtons))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }))
  }

  const handleFinalizeOrder = () => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('activeButtons')

    setCartItems([])

    setOrderSuccess(true)
  }

  const total = cartItems
    .reduce((sum, item) => {
      const quantity = quantities[item.id] || 1
      return sum + item.price * quantity
    }, 0)
    .toFixed(2)

  return (
    <>
      <Header cartItems={cartItems.length} />
      <ProductReviewContainer>
        {cartItems.length === 0 && orderSuccess === false ? (
          <EmptyContainer>
            <EmptyContainerTitle>
              Parece que não há nada por aqui :(
            </EmptyContainerTitle>
            <EmptyContainerImage>
              <img
                src={Empty}
                alt="Imagem de uma mulher segurando o símbolo de recarregar"
              />
            </EmptyContainerImage>
            <EmptyContainerButton onClick={handleHomeClick}>
              Recarregar página
            </EmptyContainerButton>
          </EmptyContainer>
        ) : !orderSuccess ? (
          <ProductReviewDetails>
            <CartHeaderContainer>
              <HeaderTitle>Produto</HeaderTitle>
              <HeaderTitle>Qtd</HeaderTitle>
              <HeaderTitle>Subtotal</HeaderTitle>
            </CartHeaderContainer>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />
            ))}
            <Divisor />
            <TotalContainer>
              <button onClick={handleFinalizeOrder}>Finalizar Pedido</button>
              <PriceTotalContainer>
                <span>Total</span>
                <h2> R$ {total}</h2>
              </PriceTotalContainer>
            </TotalContainer>
          </ProductReviewDetails>
        ) : (
          <SucessContainer>
            <SucessContainerTitle>
              Compra realizada com sucesso!
            </SucessContainerTitle>
            <SucessContainerImage>
              <img
                src={Sucess}
                alt="Imagem de uma mulher segurando o símbolo de recarregar"
              />
            </SucessContainerImage>
            <SucessContainerButton onClick={() => setOrderSuccess(false)}>
              Voltar
            </SucessContainerButton>
          </SucessContainer>
        )}
      </ProductReviewContainer>
    </>
  )
}

export default Cart
