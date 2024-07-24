import { FunctionComponent, useState } from "react"

import { FaqItem } from "@/lib/components/types"

type FaqItemComponentProps = {
    item: FaqItem
}

export const FaqItemComponent: FunctionComponent<FaqItemComponentProps> = ({ item }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <div
            className="accordion accordion-active:bg-indigo-50 accordion-active:border-indigo-600 active mb-8 rounded-xl border border-solid border-gray-300 p-4 transition duration-500 lg:p-4"
            id="basic-heading-one-with-icon"
        >
            <button
                className="accordion-toggle accordion-active:font-medium accordion-active:text-indigo-600 group inline-flex w-full items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 transition duration-500 hover:text-indigo-600"
                aria-controls="basic-collapse-one-with-icon"
                onClick={() => setShowAnswer(!showAnswer)}
            >
                <h5>{item.question}</h5>
                {!showAnswer ? (
                    <svg
                        className="accordion-active:text-indigo-600 accordion-active:hidden block h-6 w-6 origin-center text-gray-900 transition duration-500 group-hover:text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12H18M12 18V6"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6 text-gray-900 transition duration-500 group-hover:text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12H18"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                )}
            </button>
            {showAnswer && (    
                <div
                    id="basic-collapse-one-with-icon"
                    className="accordion-content w-full overflow-hidden pr-4 mt-2"
                    aria-labelledby="basic-heading-one"
                >
                    <p className="text-base font-normal leading-6 text-gray-900">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    )
}
