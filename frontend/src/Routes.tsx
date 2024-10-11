import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { SignInPage } from '@frontend/modules/auth/pages/SignInPage'
import { SignUpPage } from '@frontend/modules/auth/pages/SignUpPage'
import { HomePage } from '@frontend/modules/home/pages/HomePage'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'

import { SignOutPage } from './modules/auth/pages/SignOut'
import { AboutPage } from './modules/static-pages/pages/AboutPage'
import { BlogPage } from './modules/static-pages/pages/BlogPage'
import { GuidePage } from './modules/static-pages/pages/GuidePage'
import { WizardPage } from './modules/static-pages/pages/WizardPage'
import { Layout } from './shared/layout'
import { route } from './route'

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route path={route.home()} element={<HomePage />} />
        <Route path={route.signIn()} element={<SignInPage />} />
        <Route path={route.signUp()} element={<SignUpPage />} />
        <Route path={route.about()} element={<AboutPage />} />
        <Route path={route.guide()} element={<GuidePage />} />
        <Route path={route.blog()} element={<BlogPage />} />
        <Route path={route.wizard()} element={<WizardPage />} />
        <Route path={route.signOut()} element={<SignOutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </RouterRoutes>
  )
}
