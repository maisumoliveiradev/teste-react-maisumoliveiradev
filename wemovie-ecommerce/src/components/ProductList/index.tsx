import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loading } from '../Loading'
import { Header } from '../Header'
import shoppingCart from '../../assets/shoppingCart.svg'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface ProductsResponse {
  products: Product[]
}

const AddToCartButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) => (isActive ? '#039B00' : '#009EDD')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.75rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#039B00' : '#0073A1')};
  }

  &:active {
    background-color: #00a82d;
  }

  span {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;

  padding: 0px 196px 40px 196px;

  @media (max-width: 1200px) {
    padding: 0px 96px 40px 96px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    padding: 0px 48px 40px 48px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    padding: 16px;
  }
`

const ProductCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  background-color: #fff;
  gap: 8px;
  flex-direction: column;
  align-items: center;
`

const ProductImage = styled.img`
  width: 147px;
  height: 188px;
`

const ProductTitle = styled.h2`
  font-size: 1.2rem;
`

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`

const Cart = styled.img`
  width: 13.6px;
  height: 13.6px;
`

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeButtons, setActiveButtons] = useState<{
    [key: number]: boolean
  }>(() => {
    const savedActiveButtons = JSON.parse(
      localStorage.getItem('activeButtons') || '{}'
    )
    return savedActiveButtons
  })
  const [cartItems, setCartItems] = useState<number>(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    return savedCartItems.length || 0
  })

  const handleClick = (product: Product) => {
    setActiveButtons((prevState) => {
      const isActive = !prevState[product.id]

      let updatedCartItems = JSON.parse(
        localStorage.getItem('cartItems') || '[]'
      ) as Product[]

      if (isActive) {
        const productExists = updatedCartItems.some(
          (item) => item.id === product.id
        )
        if (!productExists) {
          updatedCartItems.push(product)
        }
      } else {
        updatedCartItems = updatedCartItems.filter(
          (item) => item.id !== product.id
        )
      }

      const newCartItemsCount = isActive ? cartItems + 1 : cartItems - 1
      setCartItems(newCartItemsCount)

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))

      const updatedButtons = {
        ...prevState,
        [product.id]: isActive,
      }
      localStorage.setItem('activeButtons', JSON.stringify(updatedButtons))

      return updatedButtons
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://wefit-movies.vercel.app/api/movies'
        )
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos')
        }
        const data: ProductsResponse = await response.json()
        setProducts(data.products)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Erro desconhecido')
        }
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <>
        <Header cartItems={cartItems} />
        <Loading />
      </>
    )
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <>
      <Header cartItems={cartItems} />
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>

            <AddToCartButton
              isActive={!!activeButtons[product.id]}
              onClick={() => handleClick(product)}
            >
              <Cart src={shoppingCart} alt="Ícone de carrinho de compras" />
              <span>{!activeButtons[product.id] ? '0' : '1'} </span>
              {activeButtons[product.id]
                ? 'ADICIONADO AO CARRINHO'
                : 'ADICIONAR AO CARRINHO'}
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductsGrid>
    </>
  )
}

export default ProductsList
