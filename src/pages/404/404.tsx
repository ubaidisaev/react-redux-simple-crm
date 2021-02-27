import * as  React from 'react';

import Layout from '@/components/layout/Layout';
import Content404 from '@/components/views/Content404'

const Error404:React.FC = () => {
    return(
        <Layout>
            <Content404 />
        </Layout>
    )
}

export default Error404;