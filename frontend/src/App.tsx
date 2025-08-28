import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@src/modules/auth'
import { Routes } from '@src/Routes'
import { ScrollToTop } from '@shared/navigation/atoms/ScrollToTop'
import { EnhancedApolloProvider } from '@src/utils/apollo.tsx'

import { Provider } from './shared/design-system/atoms/chakra/provider'

export function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Routes />
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}
