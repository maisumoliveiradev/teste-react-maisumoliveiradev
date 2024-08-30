import { useNavigate } from 'react-router-dom'
import Cart from '../../assets/Cart.svg'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: #2f2e41;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 88px;
`

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CartInfo = styled.div`
  flex-direction: column;
  display: flex;
  align-items: end;
`

const CartText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`

const CartItems = styled.span`
  color: #999;
  font-size: 0.875rem;
`

const CartIcon = styled.span`
  margin-left: 5px;
  height: 40px;
  width: 40px;
`

export function Header({ cartItems }: { cartItems: number }) {
  const getCartItemsText = () => {
    if (cartItems === 0) {
      return '0 itens'
    } else if (cartItems === 1) {
      return '1 item'
    } else {
      return `${cartItems} itens`
    }
  }

  const navigate = useNavigate()

  const handleCartClick = () => {
    navigate('/cart')
  }
  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <HeaderContainer>
      <Logo onClick={handleHomeClick}>WeMovies</Logo>
      <CartContainer onClick={handleCartClick}>
        <CartInfo>
          <CartText>Meu Carrinho</CartText>
          <CartItems>{getCartItemsText()}</CartItems>
        </CartInfo>
        <CartIcon>
          <img src={Cart} alt="Ícone de carrinho de compras" />
        </CartIcon>
      </CartContainer>
    </HeaderContainer>
  )
}
