'use client'

import ConnectWithStrava from "@/components/ConnectWithStrava";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Home() {

  return (
    <Layout>
      <Content>
        <h1>Strava Tools</h1>
        <ConnectWithStrava />
      </Content>
    </Layout>
  )
}
