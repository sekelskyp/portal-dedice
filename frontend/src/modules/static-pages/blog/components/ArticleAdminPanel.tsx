import { IconButton, Stack } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@shared/route'

interface ArticleAdminPanelProps {
  onDelete: () => void
  articleId: number
}

export const ArticleAdminPanel: React.FC<ArticleAdminPanelProps> = ({
  onDelete,
  articleId,
}) => {
  const navigate = useNavigate()
  const { user } = useAuth()

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
      {user?.type === 'Admin' && (
        <Stack direction="row">
          <IconButton
            onClick={() => navigate(route.editArticle(articleId.toString()))}
            size="lg"
          >
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
      )}
    </Stack>
  )
}
