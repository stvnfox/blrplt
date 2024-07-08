import { FunctionComponent, useMemo, useState } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"

type RichTextEditorProps = {
    ariaDescribedby?: string
    ariaInvalid?: boolean
    id?: string
    name: string
    value: { type: string; children: any }[]
    onBlur: () => void
    onChange: (value: any) => void
}

export const RichTextEditor: FunctionComponent<RichTextEditorProps> = (props) => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const initialValue = [
        {
            type: "paragraph",
            children: [{ text: "A line of text in a paragraph." }],
        },
    ]

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
            {...props}
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (!isAstChange) {
                    console.log(value)
                }
            }}
        >
            <Editable style={{ border: "1px solid black" }} />
        </Slate>
    )
}
