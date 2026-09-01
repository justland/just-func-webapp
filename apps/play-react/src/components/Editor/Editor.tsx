import { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2-react-17'
import './Editor'

const Editor = () => {
	const [value, setValue] = useState('')
	return <CodeMirror value={value} onBeforeChange={(_editor, _data, value) => setValue(value)} />
}

export default Editor
