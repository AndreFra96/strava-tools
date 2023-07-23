'use client'

import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAthleteActivities, getAthleteStats } from '@/functions';
import { Session } from '@/models/session';
import { AthleteActivity } from '@/models/athleteActivity';
import { ActivityStats } from '@/models/activityStats';

export default function ActivitiesTable({ session }: { session: Session }) {

  const [activePage, setActivePage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<AthleteActivity[]>([]);
  const [activityStats, setActivityStats] = useState<ActivityStats>();
  const [error, setError] = useState<string>('');


  // Al caricamento del componente scarico le statistiche dell'utente 
  // (serve per il numero di attività totali)
  useEffect(() => {

    //Se non ho access token o id atleta, non posso scaricare le statistiche
    if (session.access_token === undefined || session.athlete.id === undefined) return;

    //Resetto l'errore
    setError('');

    //Scarico le statistiche
    getAthleteStats(session.access_token, session.athlete.id)
      //Se la chiamata va a buon fine, aggiorno le statistiche
      .then((stats) => {
        setActivityStats(stats)
      })
      //Se la chiamata fallisce, aggiorno l'errore
      .catch((err) => {
        setError(err.message);
      })
  }, [session.access_token, session.athlete.id]);

  // Tutte le volte che cambia la pagina attiva, scarico le attività di quella pagina
  useEffect(() => {
    //Imposto lo stato di loading a true
    setIsLoading(true);
    //Resetto l'errore
    setError('');
    //Scarico le attività
    getAthleteActivities(session.access_token, { page: activePage, per_page: pageSize })
      //Se la chiamata va a buon fine, aggiorno le attività
      .then((activities) => {
        setActivities(activities)
      })
      //Se la chiamata fallisce
      .catch((err) => {
        setError(err.message);
      })
      //Infine, imposto lo stato di loading a false
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, pageSize, session.access_token])

  //Quando viene modificata la pagina o il numero di elementi per pagina, aggiorno lo stato
  function onPaginationUpdate(page: number, size: number) {
    if (page !== activePage)
      setActivePage(page);
    if (size !== pageSize)
      setPageSize(size);
  }


  const columns: ColumnsType<AthleteActivity> = [
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


  return <div>
    {error && <div style={{ color: 'red' }}>Errore: {error}</div>}
    <Table loading={isLoading} columns={columns} dataSource={activities} pagination={{ pageSize: pageSize, total: activityStats?.all_ride_totals?.count ?? 0, onChange: onPaginationUpdate }} />
  </div>
}
