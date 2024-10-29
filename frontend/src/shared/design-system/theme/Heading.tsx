// import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

// const headingSizes = {
//   '4xl': defineStyle({
//     fontSize: '5xl',
//     lineHeight: 1.1,
//   }),
//   '3xl': defineStyle({
//     fontSize: '4xl',
//     lineHeight: 1.3,
//   }),
//   '2xl': defineStyle({
//     fontSize: '3xl',
//     lineHeight: 1.5,
//   }),
//   xl: defineStyle({
//     fontSize: '2xl',
//     lineHeight: 1.7,
//   }),
//   lg: defineStyle({
//     fontSize: 'xl',
//     lineHeight: 1.8,
//   }),
//   md: defineStyle({
//     fontSize: 'lg',
//     lineHeight: 1.9,
//   }),
//   sm: defineStyle({
//     fontSize: 'md',
//     lineHeight: 2,
//   }),
//   xs: defineStyle({
//     fontSize: 'sm',
//     lineHeight: 2,
//   }),
// }

// const getAsSize = (as: string) => {
//   switch (as) {
//     case 'h1':
//       return headingSizes['4xl']
//     case 'h2':
//       return headingSizes['3xl']
//     case 'h3':
//       return headingSizes['2xl']
//     case 'h4':
//       return headingSizes['xl']
//     case 'h5':
//       return headingSizes['lg']
//     case 'h6':
//       return headingSizes['md']
//     default:
//       return headingSizes['3xl']
//   }
// }

// export const Heading = defineStyleConfig({
//   baseStyle: ({ as }) => ({
//     ...getAsSize(as),
//     color: 'primary.900',
//   }),
//   sizes: headingSizes,
//   defaultProps: {
//     size: '3xl',
//   },
// })
