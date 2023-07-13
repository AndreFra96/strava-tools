'use client'
import React from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default function ActivitiesTable({ activities }: { activities: any[] }) {

  interface DataType {
    key: string;
    name: string;
    distance: number;
    sport: string[];
    time: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Sport',
      dataIndex: 'sport_type',
      key: 'sport_type',
      render: (sport, row, index) => {
        console.log(sport);
        let color: string;
        switch (sport) {
          case 'Run':
            color = 'green'
            break;
          case 'Ride':
            color = 'orange'
            break;
          default:
            color = 'black'
        }
        console.log(color);
        return <Tag color={color} key={'Tag-' + index}>
          {typeof sport === 'string' && sport.toLowerCase()}
        </Tag>

      }
    },
    {
      title: 'Time',
      key: 'moving_time',
      dataIndex: 'moving_time',
      render: (value) => {
        return `${Math.floor(value / 3600)}hours : ${Math.floor((value % 3600) / 60)}minutes`
      }
    },
  ];



  return <Table columns={columns} dataSource={activities} />;
}
