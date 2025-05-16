import clsx from "clsx";

type Props = {
    text: string,
    className?: string,
    wordDisplayStyle?: 'inline-block' | 'block'
}

export function TextSplitter ({
    text,
    className,
    wordDisplayStyle = 'inline-block'
}: Props) {
    if(!text) return null

    const words = text.split('') // splits each character apart one by one

    return words.map((word: string, wordIndex: number) => {
        const splitText = word.split('') // splits these characters apart one by one

        return(
            <span
                className={clsx('split-word', className)}
                style={{display: wordDisplayStyle, whiteSpace: 'pre'}}
                key={`${wordIndex}-${word}`}
            >
                {splitText.map((char, charIndex) => {
                    if(char === ' ') return ` ` // sends back a space if the character is a space
                    return(
                        <span
                            key={charIndex}
                            className={`split-char inline-block split-char--${wordIndex}--${charIndex}`}
                        >
                            {char}
                        </span>
                    )
                })}

                {wordIndex < words.length - 1 ? (
                    <span className="split-char">{` `}</span>
                ) : (
                    ""
                )}

            </span>
        )
    })
}