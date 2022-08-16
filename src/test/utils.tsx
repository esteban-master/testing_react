import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import React from 'react'

export const renderWrapper = (ui?: JSX.Element) => {
  const queryClient = new QueryClient()
  const view = render(
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>{ui}</NiceModal.Provider>
    </QueryClientProvider>
  )
  return {
    screen,
    view,
  }
}
