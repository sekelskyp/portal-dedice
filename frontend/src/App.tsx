import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@frontend/modules/auth'
import { Routes } from '@frontend/Routes'
import { ScrollToTop } from '@frontend/shared/navigation/atoms'
import { EnhancedApolloProvider } from '@frontend/utils/apollo.tsx'

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
