import { Avatar } from '@shared/design-system'
import { AvatarProps } from '@shared/design-system/atoms/chakra'

export const UserAvatar = ({
  name,
  surname,
  size,
}: {
  name: string
  surname: string
} & AvatarProps) => (
  <Avatar
    name={name + ' ' + surname}
    size={size ?? { base: 'sm', sm: 'md' }}
    boxShadow={{ _light: 'inner' }}
    border="1px solid"
    borderColor="border.emphasized"
  />
)
