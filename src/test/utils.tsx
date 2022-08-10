import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'

export const renderWrapper = (ui?: JSX.Element) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>{ui}</NiceModal.Provider>
    </QueryClientProvider>
  )
}
