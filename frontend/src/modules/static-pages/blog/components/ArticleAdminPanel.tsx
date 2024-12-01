import { IconButton, Stack } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { route } from '@shared/route'

//TODO add admin condition

interface ArticleAdminPanelProps {
  onDelete: () => void
}

export const ArticleAdminPanel: React.FC<ArticleAdminPanelProps> = ({
  onDelete,
}) => {
  const navigate = useNavigate()

  return (
    <Stack direction="row" justifyContent="space-between" mb={10}>
      <IconButton
        onClick={() => navigate(route.blog())}
        rounded="full"
        size="lg"
        bg="gray.500"
        _hover={{ bg: 'gray.700' }}
      >
        <LuArrowLeft />
      </IconButton>
      <Stack direction="row">
        <IconButton onClick={() => console.log('TODO editace')} size="lg">
          <MdEdit />
        </IconButton>
        <IconButton
          onClick={onDelete}
          size="lg"
          bg="red.500"
          _hover={{ bg: 'red.700' }}
        >
          <MdDelete />
        </IconButton>
      </Stack>
    </Stack>
  )
}
