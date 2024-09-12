import { useRoutes } from 'react-router-dom'

import { AirdropPage } from '@modules/Airdrop'
import { AlliesPage } from '@modules/Allies'
import { FleetPage } from '@modules/Fleet'
import { QuestsPage } from '@modules/Quests'
import { TreasurePage } from '@modules/Treasure'

import { MainLayout } from '@layouts/MainLayout'
import { PATH } from './path'

export default function useRouterElements() {
  const routes = useRoutes([
    {
      path: PATH.HOME,
      element: (
        <MainLayout isShowHeader>
          <FleetPage />
        </MainLayout>
      )
    },
    {
      path: PATH.TREASURE,
      element: (
        <MainLayout isShowHeader>
          <TreasurePage />
        </MainLayout>
      )
    },
    {
      path: PATH.ALLIES,
      element: (
        <MainLayout>
          <AlliesPage />
        </MainLayout>
      )
    },
    {
      path: PATH.QUESTS,
      element: (
        <MainLayout>
          <QuestsPage />
        </MainLayout>
      )
    },
    {
      path: PATH.AIRDROP,
      element: (
        <MainLayout>
          <AirdropPage />
        </MainLayout>
      )
    }
  ])
  return routes
}
