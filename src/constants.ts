export enum ViewPanes {
  CreateUser = 'create-user',
  ConfirmAndDeploy = 'confirm-and-deploy',
}

export enum PartnerLogos {
  Juniper = 'juniper-networks',
  Kingfisher = 'kingfisher',
  Redfin = 'redfin',
  Mavenir = 'mavenir',
  Snapfish = 'snapfish',
  Cloudera = 'cloudera',
}
export const partnerLogoURLs = {
  [PartnerLogos.Juniper]:
    'https://platform9.com/wp-content/uploads/2021/02/logo_juniper-networks_white.svg',
  [PartnerLogos.Kingfisher]:
    'https://platform9.com/wp-content/uploads/2021/01/logo_kingfisher_white.svg',
  [PartnerLogos.Redfin]: 'https://platform9.com/wp-content/uploads/2021/02/logo_redfin_white.svg',
  [PartnerLogos.Mavenir]: 'https://platform9.com/wp-content/uploads/2021/05/logo_mavenir_white.svg',
  [PartnerLogos.Snapfish]:
    'https://platform9.com/wp-content/uploads/2021/02/logo_snapfish_white.svg',
  [PartnerLogos.Cloudera]:
    'https://platform9.com/wp-content/uploads/2021/02/logo_cloudera_white.png',
}

export const signupDemoURL =
  'https://platform9.com/resource/platform9-managed-kubernetes-free-demo/'
export const sandboxFqdn = 'https://sandbox-pmk.platform9.net'
export const apiUrl = 'https://embark-prod.platform9.horse'

export const segmentKey = '3efmKtp2YW5l9XeaTDo03K5z0pygtPFJ'
