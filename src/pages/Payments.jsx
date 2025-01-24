import React, { useEffect, useState } from 'react';
import { Table, Image } from 'antd';
import moment from 'moment';
import { getAllPayments } from '../api/auth';

function Payments() {

    const [data,setData] = useState([])
    const [limit,setLimit]=useState(10)
    const [page,setPage]=useState(1)
    const getAllRecords = async (limit,page) => {
      try {
         const { data } = await getAllPayments(limit,page);
         setData(data.docs)
      } catch (error) {
        notification.error({ message: error.message || "something went wrong" });
      }
    }
  

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (text,{payment_file}) => <Image width={50} src={payment_file} />, 
    },
    {
      title: 'Amount',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
      render : (_,{payment_amount})=><p>${payment_amount}</p>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render:(_,{createdAt})=><p>{moment(createdAt).format('DD/MM/YYYY')}</p>
        },
  ];

    useEffect(()=>{
      getAllRecords(limit,page)
    },[limit,page])
  

  return (
    <div>
        <h2>Payments</h2>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Payments;
