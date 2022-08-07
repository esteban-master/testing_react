import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import NiceModal from '@ebay/nice-modal-react'
import type { FC } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const Wrapper: FC<{ children: JSX.Element }> = ({ children }) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

if (process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    .then(() => {
      root.render(
        <Wrapper>
          <App />
        </Wrapper>
      )
    })
} else {
  root.render(
    <Wrapper>
      <App />
    </Wrapper>
  )
}
