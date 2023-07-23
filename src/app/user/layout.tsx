'use client'

import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname();

    const sidebarPages = [
        {
            name: 'Home',
            key: 'Home',
            path: '/user'
        },
        {
            name: 'Attività',
            key: 'Attività',
            path: '/user/attivita'
        }
    ]

    function getActivePage() {
        return sidebarPages.find((page) => {
            return pathname == page.path;
        });
    }


    return (
        <Layout >
            <Sider
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 65,
                    bottom: 0,
                }}  >
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[getActivePage()?.key ?? 'Home']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {sidebarPages.map((page, index) => {
                        return <Menu.Item key={page.key}>
                            <Link href={page.path}>{page.name}</Link>
                        </Menu.Item>
                    })}
                </Menu>
            </Sider>
            <Layout style={{ padding: '0px 24px 24px', marginLeft: 200 }}>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}


