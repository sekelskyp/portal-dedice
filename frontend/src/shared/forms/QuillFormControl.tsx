import ReactQuill from 'react-quill'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

import 'react-quill/dist/quill.snow.css'
import './QuillFormControl.css' // Add this import

export interface QuillControlProps extends BaseFieldControlProps {
  placeholder?: string
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'align',
  'color',
  'background',
  'link',
]

export const QuillFormControl = ({
  placeholder,
  ...props
}: QuillControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <ReactQuill
          value={field.value || ''}
          onChange={field.onChange}
          placeholder={placeholder}
          readOnly={disabled}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      )}
    </BaseFieldControl>
  )
}
