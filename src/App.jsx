import { Layout } from 'antd';
import AppHeader from './conponents/layout/AppHeader';
import AppSider from './conponents/layout/AppSider';
import AppContent from './conponents/layout/AppContent';





export default function App() {
  return ( 
  <Layout>
    <AppHeader/>
    <Layout>
      <AppSider/>
      <AppContent/>
    </Layout>
  </Layout>
  )
}