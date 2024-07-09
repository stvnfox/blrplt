import { forwardRef, FunctionComponent, useMemo } from "react"
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

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>((props, ref) => {
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
        >
            <Editable style={{ border: "1px solid black" }} />
        </Slate>
    )
})
