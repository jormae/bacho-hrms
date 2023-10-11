// const themeConfig = {
//   // ** Layout Configs
//   templateName: 'Darus Welfare' /* App Name */,
//   mode: 'light' /* light | dark */,
//   contentWidth: 'boxed' /* full | boxed */,
//   // ** Routing Configs
//   routingLoader: true /* true | false */,
//   // ** Navigation (Menu) Configs
//   menuTextTruncate: true /* true | false */,
//   navigationSize: 260 /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,
//   // ** Other Configs
//   responsiveFontSizes: true /* true | false */,
//   disableRipple: false /* true | false */
// }

const themeConfig = {
  templateName: 'ระบบสวัสดิการครูดารุสสาลาม',
  layout: 'horizontal',
  mode: 'light',
  direction: 'ltr',
  skin: 'bordered',
  contentWidth: 'full',
  footer: 'static',
  routingLoader: true,
  navHidden: true,
  menuTextTruncate: true,
  navSubItemIcon: 'mdi:circle-outline',
  verticalNavToggleType: 'accordion',
  navCollapsed: true,
  navigationSize: 260,
  collapsedNavigationSize: 68,
  afterVerticalNavMenuContentPosition: 'fixed',
  beforeVerticalNavMenuContentPosition: 'fixed',
  horizontalMenuToggle: 'hover',
  horizontalMenuAnimation: true,
  appBar: 'fixed',
  appBarBlur: true,
  responsiveFontSizes: true,
  disableRipple: false,
  disableCustomizer: false,
  toastPosition: 'top-center'
}

export default themeConfig
