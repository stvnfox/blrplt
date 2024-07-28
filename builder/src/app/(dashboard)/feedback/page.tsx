import { FeedbackComponent } from "@/components/builder/blocks/Feedback/Component";

export default function Feedback() {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between pt-4 px-4 md:pt-[38px] md:px-8">
                <h1>blrplt builder - we love to hear what you think or need</h1>
            </div>
            <FeedbackComponent />
        </section>
    )
}