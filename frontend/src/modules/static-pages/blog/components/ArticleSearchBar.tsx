import { Input } from '@chakra-ui/react'
import { InputGroup } from '@components/ui/input-group'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

interface ArticleSearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export function ArticleSearchBar({
  value,
  onChange,
  onClear,
}: ArticleSearchBarProps) {
  return (
    <InputGroup
      maxW="sm"
      startElement={<FaSearch size="16px" />}
      startElementProps={{ pointerEvents: 'none' }}
      endElement={<MdOutlineCancel size="18px" />}
      endElementProps={{
        _hover: { cursor: 'pointer' },
        onClick: () => onClear(),
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Vyhledat článek..."
      />
    </InputGroup>
  )
}
