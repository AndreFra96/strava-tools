'use client'

import { Layout } from 'antd'
import './globals.css'
import { Footer, Header } from 'antd/es/layout/layout'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <div style={{ color: 'white' }}>header</div>
          </Header>
          {children}
          <Footer
            style={{ zIndex: 1 }}>
            footer
          </Footer>
        </Layout>
      </body>
    </html>
  )
}
