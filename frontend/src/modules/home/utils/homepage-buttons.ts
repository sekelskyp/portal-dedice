import { route } from '@shared/route'

export const CTAButtons = [
  {
    id: 1,
    title: 'Nachytřovadlo',
    text: 'Chcete se dozvědět více o pozůstalostním řízení a zjistit, jaké jsou možnosti rozdělení pozůstalosti?',
    buttonText: 'Jdeme na to',
    to: route.wizard(),
  },
  {
    id: 2,
    title: 'Předběžné šetření',
    text: 'Chcete vyřešit předběžné šetření online?',
    buttonText: 'Předběžné šetření online',
    to: route.signIn(),
  },
  {
    id: 3,
    title: 'Vypořádání pozůstalosti',
    text: 'Vyzkoušejte si vypořádání pozůstalosti nanečisto. Náš nástroj umožňuje vypořádat pozůstalost bez nutnosti kontaktovat notáře.',
    buttonText: 'Vypořádání pozůstalosti nanečisto',
    to: route.inheritance(),
  },
]
