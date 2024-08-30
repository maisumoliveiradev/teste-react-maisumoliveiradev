import CircularProgress from '@mui/joy/CircularProgress'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

const CustomCircularProgress = styled(CircularProgress)`
  --CircularProgress-progressColor: white !important;
`

export function Loading() {
  return (
    <LoadingContainer>
      <CustomCircularProgress determinate={false} size="lg" variant="plain" />
    </LoadingContainer>
  )
}
