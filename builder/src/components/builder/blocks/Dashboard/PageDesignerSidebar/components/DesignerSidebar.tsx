import { FunctionComponent } from 'react';

import { PageDesignerElements } from '../../ComponentElements/Component';

import { SidebarButton } from './SidebarButton';

export const DesignerSidebar: FunctionComponent = () => {
    return (
        <>
            <h2 className="mb-3">builder - components</h2>
            <SidebarButton element={PageDesignerElements.header} />
        </>
    )
}