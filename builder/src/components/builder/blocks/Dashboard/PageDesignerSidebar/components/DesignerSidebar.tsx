import { FunctionComponent } from 'react';

import { PageDesignerComponents } from '../../ComponentElements/Component';

import { SidebarButton } from './SidebarButton';

export const DesignerSidebar: FunctionComponent = () => {
    return (
        <>
            <h2 className="mb-3">builder - components</h2>
            <div className="flex flex-col gap-y-2">
                <SidebarButton component={PageDesignerComponents.header} />
                <SidebarButton component={PageDesignerComponents.pricing} />
            </div>
        </>
    )
}