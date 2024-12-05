import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { SignInPage } from '@frontend/modules/auth/pages/SignInPage'
import { SignUpPage } from '@frontend/modules/auth/pages/SignUpPage'
import { HomePage } from '@frontend/modules/home/pages/HomePage'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { route } from '@shared/route'

import { NewAssetPage } from './modules/app/assets/components/NewAssetPage'
import ChatHistoryPage from './modules/app/chat/components/ChatHistoryPage'
import NewChatPage from './modules/app/chat/components/NewChatPage'
import { NewDocumentPage } from './modules/app/pages/NewDocumentPage'
import { NewProceedingPage } from './modules/app/pages/NewProceedingPage'
import { NotaryEmailPage } from './modules/app/pages/NotaryEmailPage'
import InheritanceProcedureDetail from './modules/app/pages/ProceedingPage'
import { Proceedings } from './modules/app/pages/Proceedings'
import { ProfilePage } from './modules/app/pages/ProfilePage'
import { SettingsPage } from './modules/app/pages/SettingsPage'
import { ConfirmEmailPage } from './modules/auth/pages/ConfirmEmailPage'
import { EmailVerification } from './modules/auth/pages/EmailVerification'
import { PasswordResetPage } from './modules/auth/pages/PasswordResetPage'
import { ArticleDetail } from './modules/static-pages/blog/pages/ArticleDetail'
import { BlogPage } from './modules/static-pages/blog/pages/BlogPage'
import { NewArticlePage } from './modules/static-pages/blog/pages/NewArticlePage'
import { AboutPage } from './modules/static-pages/pages/AboutPage'
import { GuidePage } from './modules/static-pages/pages/GuidePage'
import { WizardPage } from './modules/wizard/pages/WizardStepPage'
import { Layout } from './shared/layout'
import { PortalLayout } from './shared/layout/PortalLayout'

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route path={route.home()} element={<HomePage />} />
        <Route path={route.signIn()} element={<SignInPage />} />
        <Route path={route.signUp()} element={<SignUpPage />} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route path={route.portal()} element={<Proceedings />} />
          <Route path={route.newProceeding()} element={<NewProceedingPage />} />
          <Route
            path={route.inheritanceProcedure()}
            element={<InheritanceProcedureDetail />}
          />
          <Route path={route.newDocument()} element={<NewDocumentPage />} />
          <Route path={route.newEmail()} element={<NotaryEmailPage />} />
          <Route path={route.newAsset()} element={<NewAssetPage />} />
          <Route path={route.chat()} element={<NewChatPage />} />
          <Route path={route.chatId()} element={<NewChatPage />} />
          <Route path={route.chatIdHistory()} element={<ChatHistoryPage />} />
          <Route path={route.profile()} element={<ProfilePage />} />
          <Route path={route.settings()} element={<SettingsPage />} />
        </Route>
        <Route path={route.about()} element={<AboutPage />} />
        <Route path={route.guide()} element={<GuidePage />} />
        <Route path={route.blog()} element={<BlogPage />} />
        <Route path={route.newArticle()} element={<NewArticlePage />} />
        <Route path={route.detailArticle()} element={<ArticleDetail />} />
        <Route path={route.editArticle()} element={<NewArticlePage />} />
        <Route path={route.wizard()} element={<WizardPage />} />
        <Route path={route.confirmEmail()} element={<ConfirmEmailPage />} />
        <Route path={route.resetPassword()} element={<PasswordResetPage />} />
        <Route
          path={route.emailVerification()}
          element={<EmailVerification />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </RouterRoutes>
  )
}
