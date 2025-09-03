import { Provider } from '@components/ui/provider'
import { ScrollToTop } from '@components/ui/scroll-to-top'
import { EnhancedApolloProvider } from '@src/lib/apollo'
import { AuthProvider } from '@src/modules/auth'
import { Routes } from '@src/Routes'
import { BrowserRouter } from 'react-router-dom'

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
