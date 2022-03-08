import { Listing } from '.prisma/client'
import { Box, Card, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCreateOrder } from 'frontend/data'

interface Props {
  listing: Listing
}

export default function ListingDetail({ listing }: Props) {
  const { createOrder } = useCreateOrder()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const createdAt = new Date(listing.createdAt)
  const updatedAt = new Date(listing.updatedAt)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await createOrder(listing.id)
      router.push('/marketplace')
      enqueueSnackbar('New order successfully posted!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('New order failed to post. Try again.', { variant: 'error' })
    }
  }

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">Title: {listing.title}</Typography>
        <Typography variant="body1"> Created at: {createdAt.toDateString()}</Typography>
        <Typography variant="body1"> Last updated at: {updatedAt.toDateString()}</Typography>
        <Typography variant="body1">Description: {listing.description}</Typography>
      </Box>
      <Button sx={{ m: 2 }} variant="contained" onClick={submitData}>
      Order
      </Button>
    </Card>
  )
}
