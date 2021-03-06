import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'

import metamaskIcon from '../wallet-icons/icon-metamask.png'
import metamaskIcon2x from '../wallet-icons/icon-metamask@2x.png'

function metamask(
  options: {
    preferred?: boolean
    label?: string
    iconSrc?: string
    svg?: string
  } = {}
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'MetaMask',
    iconSrc: iconSrc || metamaskIcon,
    iconSrcSet: iconSrc || metamaskIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const {
        getProviderName,
        createModernProviderInterface,
        createLegacyProviderInterface
      } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'MetaMask'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    link: 'https://metamask.io/',
    installMessage: extensionInstallMessage,
    desktop: true,
    preferred
  }
}

export default metamask
