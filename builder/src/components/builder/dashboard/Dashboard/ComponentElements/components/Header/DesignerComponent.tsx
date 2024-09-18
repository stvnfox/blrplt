import { FunctionComponent } from 'react';

import { CustomHeaderInstance } from './Component';
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component";
import { Label } from '@/components/ui/label';

type HeaderDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<HeaderDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomHeaderInstance
    const { label, helperText, title, subtitle, description } = data.extraAttributes

    return (
        <div className='bg-white border-2 border-neutral-200 rounded-md p-4'>
            <Label className='font-semibold mb-2'>{label}</Label>
            {helperText && <p className='text-xs text-neutral-500'>{helperText}</p>}

            <div className='flex flex-col gap-2 w-full mt-4 p-4 bg-neutral-200 rounded-md'>
                <span className="w-fit rounded-full bg-white px-3 py-1.5 text-background md:text-sm">
                    {subtitle}
                </span>
                <p className="text-balance text-3xl text-primary md:text-4xl">{title}</p>
                <p className="text text-balance text-baseText">{description}</p>
            </div>
        </div>
    )
}