import { Avatar } from '@frontend/shared/design-system'
import { AvatarProps } from '@frontend/shared/design-system/atoms/chakra'

export const UserAvatar = ({
  name,
  surname,
  ...rest
}: {
  name: string
  surname: string
} & AvatarProps) => (
  <Avatar
    name={name + ' ' + surname}
    size={{ base: 'sm', sm: 'md' }}
    boxShadow="inner"
    border="1px solid"
    borderColor="border.emphasized"
    {...rest}
  />
)
