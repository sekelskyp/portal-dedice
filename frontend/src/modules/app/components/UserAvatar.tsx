import { Avatar, AvatarProps } from '@components/ui'

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
