import React from 'react';
import {Pagination} from "semantic-ui-react";

const PageNumberList = ({activePage, totalPages, handleSelectPage}) => {

    return (
        <div style={{margin: '20px', display: 'flex', justifyContent: 'center'}}>
                <Pagination
                    activePage={activePage}
                    totalPages={totalPages}
                    onPageChange={(e, {activePage})=>handleSelectPage(activePage)}
                />
        </div>

    )
}

export default PageNumberList;